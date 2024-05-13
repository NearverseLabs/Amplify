import Button from "@/components/buttons/Button";
import { ChevronLeft, ChevronDown, X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import Input from "./UI/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { canisterId } from "@/declarations/amplify_sc_rust_backend";
import { toast } from "react-toastify";
import moment from "moment";
import { useConnect } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import {
  CreateCampaignArgs,
  CreateCampaignRequirements,
  Settings,
} from "@/declarations/amplify_sc_rust_backend/amplify_sc_rust_backend.did";
import {
  transferICP,
  transferIcrc1Tokens,
  useBackend,
  useCustomCanister,
  useICP,
  useIcpConnection,
  useToken,
} from "@/hooks/useCanisters.ts";
import { SUPPORTED_TOKENS } from "@/providers/ConnectICProvider.tsx";
import { idlFactory } from "@/declarations/icrc1_ledger_canister";
import { _SERVICE } from "@/declarations/icrc1_ledger_canister/icrc1_ledger_canister.did";
import { AccountIdentifier, LedgerCanister } from "@dfinity/ledger-icp";
import { createAgent as createIcpAgent } from "@dfinity/utils";
import { useWhiteListedContext } from "@/providers/WhiteListedTokensProvider.tsx";
import { RewardToken } from "@/hooks/useRewardToken.ts";
import { convertXToTwitter } from "@/lib/utils";
import { CreateCampaignInput } from "@/hooks/useCampaignsReducer.ts";
import axios from "axios";

const initialValues = {
  project_name: "",
  tweet_link: "",
  reward: "",
  winners: "",
  start_time: "",
  end_time: "",
};

export type ICreateFormData = typeof initialValues;

interface IRequirement {
  type: string;
  title: string;
}

const requirementList: IRequirement[] = [
  // { type: "follow", title: "Follow" },
  { type: "like", title: "Like" },
  { type: "retweet", title: "Retweet" },
  { type: "quote_retweet", title: "Quote Retweet" },
  { type: "tweet_reply", title: "Comment" },
];

const CreateCampaign = () => {
  const twitterRegexPattern =
    /^(https:\/\/(?:www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/[0-9]+)(\?s=\d+)?$/;

  const [tokenSelected, setSelectedToken] = useState<RewardToken>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requirements, setRequirements] = useState<IRequirement[]>([]);
  const { rewardTokens: tokens, isLoading: isTokensLoading } =
    useWhiteListedContext();
  const [settings, setSettings] = useState<Settings>();
  const [fetchTokenListLoading, setFetchTokenListLoading] =
    useState<boolean>(false);
  console.log("resolved tokens", tokens, tokenSelected);
  const selectedToken = useMemo(() => {
    if (tokens && tokenSelected) {
      return tokens[tokenSelected.token.toString()];
    }
  }, [tokens, tokenSelected]);

  const [platformfee, setPlatformfee] = useState<number[]>();

  const navigate = useNavigate();
  const { isConnected, principal, activeProvider } = useIcpConnection();
  const [backend] = useBackend();
  const [transferICPFun] = transferICP();
  const [transferIcrc1Fun] = transferIcrc1Tokens(
    selectedToken?.token?.toString(),
  );
  const formValidation = useMemo(() => {
    let validationSchema = Yup.object().shape({
      project_name: Yup.string().required("Name required*"),
      tweet_link: Yup.string()
        .required("Link required*")
        .matches(twitterRegexPattern, "Invalid Twitter post link"),
      reward: Yup.number()
        .moreThan(0, "Value must be greater than 0")
        .required("Reward required*")
        .min(
          (selectedToken && Number(selectedToken?.min_reward)) ?? 0,
          `Reward amount should be more than ${
            Number(selectedToken?.min_reward) ?? 0
          }`,
        ),
      start_time: Yup.date()
        .label("Start Time")
        .test(
          "start_time",
          "Start time should be in the future",
          function (value) {
            return moment(value).isAfter(moment());
          },
        ),
      end_time: Yup.date()
        .label("End Time")
        .test(
          "end_time",
          "End time should be after start time",
          function (value, { parent }) {
            const start_time = parent.start_time;
            return moment(value).isSameOrAfter(start_time);
          },
        ),
    });

    if (settings && settings.min_winners !== undefined) {
      validationSchema = validationSchema.shape({
        winners: Yup.number()
          .moreThan(0, "Value must be greater than 0")
          .required("No. of winners required")
          .min(
            Number(settings.min_winners),
            `Winners should be more than ${settings.min_winners}`,
          ),
      });
    }

    return validationSchema;
  }, [settings, selectedToken]);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formValidation,
    onSubmit: (values: ICreateFormData) => createCampaignHandler(values),
  });

  const { values, errors, handleChange } = formik;

  const [tokenCanister] = useToken(selectedToken?.token?.toString());

  useEffect(() => {
    const fetchSettings = () => {
      backend
        .get_settings()
        .then((setting) => setSettings(setting))
        .catch((e) => {
          console.error("error in setting fetch", e);
        });
    };
    fetchSettings();
  }, [backend]);

  const removeElement = (item: string) => {
    const filtered = requirements.filter((r: IRequirement) => r.type !== item);
    setRequirements(filtered);
  };

  interface MyObject {
    [key: string]: boolean;
  }

  const requirementObject = React.useMemo(() => {
    const obj: MyObject = {
      follow: false,
    };
    requirementList.forEach((require: IRequirement) => {
      if (requirements.includes(require)) {
        obj[require.type] = true;
      } else {
        obj[require.type] = false;
      }
    });
    return obj as unknown as CreateCampaignRequirements;
  }, [requirements]);

  const [icp] = useICP();
  const totalReward = React.useMemo(() => {
    if (values.winners && values.reward) {
      const a = Number(values.winners) * Number(values.reward);
      return Math.round(a * 1000) / 1000;
    }
  }, [values.winners, values.reward]);

  const PlatformFee = useCallback(async () => {
    if (selectedToken && values.reward && values.winners && settings) {
      const fee = selectedToken.fee;
      const decimal = selectedToken.decimal;

      const icpFee = 10000n;
      const icpDecimal = 8;

      const tokenFee = BigInt(
        Number(values.reward) * 10 ** decimal * Number(values.winners),
      );

      return [
        (Number(tokenFee) +
          (Number(fee) + Number(BigInt(Number(values.winners)) * fee))) /
          10 ** decimal,
        Number(settings.platform_fees + icpFee) / 10 ** icpDecimal,
      ];
    }
  }, [selectedToken, settings, values.reward, values.winners]);
  const createCampaignHandler = async (values: ICreateFormData) => {
    if (isConnected && principal) {
      if (requirements.length > 0) {
        if (selectedToken && tokenCanister && platformfee && platformfee[1]) {
          const userConfirmed = window.confirm(
            "Please double check the post id, make sure the tweet preview is shown before proceeding!\n\n" +
              `We will also transfer ${
                platformfee[0]
              } ${selectedToken.symbol.toUpperCase()} and Platform Fee ${platformfee[1].toFixed(
                4,
              )} ICP`,
          );
          if (userConfirmed) {
            const deposit_address = await backend.getDepositAddress();
            // const deposit_address_pri = Principal.fromText(deposit_address);
            console.log("deposit_address", principal.toText());
            const tokenFee = selectedToken.fee;
            const allowanceAmount =
              BigInt(
                Number(values.reward) *
                  10 ** selectedToken.decimal *
                  Number(values.winners),
              ) +
              tokenFee +
              BigInt(Number(tokenFee) * Number(values.winners));
            const data: CreateCampaignInput = {
              reward: BigInt(
                Number(values.reward) * 10 ** selectedToken.decimal,
              ).toString(),
              tweet_id: values.tweet_link,
              startsAt: BigInt(
                moment(values.start_time).unix() * 10 ** 9,
              ).toString(),
              reward_token: selectedToken.token.toText(),
              endsAt: BigInt(
                moment(values.end_time).unix() * 10 ** 9,
              ).toString(),
              project_name: values.project_name,
              winners: BigInt(values.winners).toString(),
              requirements: requirementObject,
            };
            setIsLoading(true);
            const create = async (additional = 0n) => {
              const isTransferICP = await transferICPFun({
                amount: (settings?.platform_fees || 0n) + additional,
              });
              if (isTransferICP) {
                const create = await axios.post("/api/campaigns", data, {
                  headers: {
                    "content-type": "application/json",
                    accept: "application/json",
                  },
                });
                const register = await backend.deposit_campaign(
                  BigInt(create.data.campaign_id),
                );
                if ("Ok" in register && register.Ok) {
                  console.error("CREATE CAMPAIGN: SUCCESS", register.Ok);
                  toast.success("Campaign Created");
                  navigate("/");
                }
                if ("Err" in register && register.Err) {
                  console.error("CREATE CAMPAIGN: ERROR", register.Err);
                  toast.error(register.Err);
                }
              } else {
                toast.error("ICP Transfer failed");
              }
            };
            try {
              switch (selectedToken.token_type) {
                case "icrc2": {
                  const resolvedAllowance = await tokenCanister.icrc2_allowance(
                    {
                      account: {
                        owner: principal,
                        subaccount: [],
                      },
                      spender: {
                        owner: Principal.fromText(canisterId),
                        subaccount: [],
                      },
                    },
                  );
                  console.log("CREATE CAMPAIGN: ALLOWANCE", resolvedAllowance);
                  if (resolvedAllowance.allowance >= allowanceAmount) {
                    await create();
                  } else {
                    const approve = await tokenCanister.icrc2_approve({
                      amount:
                        allowanceAmount +
                        BigInt(Number(tokenFee) * Number(values.winners)),
                      created_at_time: [],
                      expected_allowance: [],
                      expires_at: [],
                      fee: [],
                      from_subaccount: [],
                      memo: [],
                      spender: {
                        owner: Principal.fromText(canisterId),
                        subaccount: [],
                      },
                    });
                    console.log("CREATE CAMPAIGN: APPROVED", approve);
                    if ("Ok" in approve && approve.Ok) {
                      await create();
                    }
                    if ("Err" in approve && approve.Err) {
                      console.log("Error in approve", approve.Err);
                    }
                    if (
                      "Err" in approve &&
                      approve.Err &&
                      "GenericError" in approve.Err
                    ) {
                      toast.error(approve.Err.GenericError.message);
                    }
                  }
                  break;
                }
                case "icrc1": {
                  await transferIcrc1Fun({
                    amount: allowanceAmount,
                    caller: principal,
                  });
                  await create();
                  break;
                }
                case "icp": {
                  await create(allowanceAmount);
                  break;
                }
                default: {
                  toast.error("Token type is not supported");
                  break;
                }
              }
            } catch (e) {
              console.log("Error", e);
              toast.error("Something went wrong");
              setIsLoading(false);
            } finally {
              setIsLoading(false);
            }
          } else {
            toast.error("User denied");
          }
        } else {
          toast.error(
            "Could not find token or could not load platform fee, please try reconnecting wallet",
          );
        }
      } else {
        toast.error("Please select Requirements");
      }
    } else {
      toast.error("Connect Wallet First");
    }
  };

  useEffect(() => {
    PlatformFee()
      .then((plf) => {
        if (plf) setPlatformfee(plf);
      })
      .catch((e) => {
        console.log("Error in platformfee", e);
      });
  }, [selectedToken, settings, values.reward, values.winners]);

  console.log("platformfee", platformfee);

  // min-[2560px]:

  return (
    <AuthLayout>
      <div className="bg-[#fafafa] p-2">
        <div
          onClick={() => navigate(-1)}
          className="mb-4 flex cursor-pointer items-center gap-1 text-base font-bold text-[#b3b3b3]"
        >
          <span className="block min-[2560px]:hidden">
            <ChevronLeft />
          </span>
          <span className="hidden min-[2560px]:block">
            <ChevronLeft size={50} />
          </span>
          <div className="min-[2560px]:text-4xl">Go Back</div>
        </div>
        <div className="flex flex-wrap items-center justify-between border-b border-[#808080] pb-6">
          <div className="w-full md:w-10/12">
            <h3 className="mb-2 text-2xl font-semibold min-[2560px]:mb-6 min-[2560px]:text-5xl">
              Create New Campaign
            </h3>
            <p className="text-sm font-normal text-[#595959] min-[2560px]:text-2xl">
              Fill the form to start a new campaign
            </p>
          </div>
        </div>
        <div className="py-8">
          <div className="mb-6 items-center gap-4 md:flex min-[2560px]:mb-10">
            <div className="w-full md:w-1/5">
              <h3 className="mb-2 text-base font-semibold min-[2560px]:text-4xl">
                Project/Username*
              </h3>
              <p className="text-sm font-normal text-[#595959] min-[2560px]:text-2xl">
                Your Twitter Username
              </p>
            </div>
            <Input
              name="project_name"
              value={values.project_name}
              onChange={handleChange}
              placeholder="Tribes of ICP"
              containerClass="w-full md:w-2/5"
              error={errors.project_name}
            />
          </div>
          <div className="mb-6 items-center gap-4 md:flex min-[2560px]:mb-10">
            <div className="w-full md:w-1/5">
              <h3 className="mb-2 text-base font-semibold min-[2560px]:text-4xl">
                Tweet Link*
              </h3>
              <p className="text-sm font-normal text-[#595959] min-[2560px]:text-2xl">
                Paste the whole link
              </p>
            </div>
            <Input
              name="tweet_link"
              value={values.tweet_link}
              onChange={handleChange}
              placeholder="https://twitter.com/solhellboi/status/1668881618050711552?s=20"
              containerClass="w-full md:w-2/5"
              error={errors.tweet_link}
            />
          </div>
          <div className="mb-6 items-center gap-4 md:flex min-[2560px]:mb-10">
            <div className="w-full md:w-1/5">
              <h3 className="mb-2 text-base font-semibold min-[2560px]:text-4xl">
                Requirements *
              </h3>
              <p className="text-sm font-normal text-[#595959] min-[2560px]:text-2xl">
                Participation requirements for this campaign
              </p>
            </div>
            <div className="w-full md:w-2/5">
              <div className="relative">
                <div
                  onClick={() => setShow(!show)}
                  className="flex w-full items-center justify-between rounded border border-[#b3b3b3] px-3 py-2 min-[2560px]:rounded-xl min-[2560px]:py-6"
                >
                  <div className="flex flex-wrap gap-2 min-[2560px]:text-4xl">
                    {requirements.length === 0 && "Select Requirements"}
                    {requirements &&
                      requirements.map((r: IRequirement, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-1 rounded bg-[#f3f3f3] px-2 py-1 text-sm min-[2560px]:rounded-xl min-[2560px]:p-3 min-[2560px]:text-4xl"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeElement(r.type);
                            }}
                          >
                            {r.title}
                            <div>
                              <span className="block min-[2560px]:hidden">
                                <X className="cursor-pointer" size={16} />
                              </span>
                              <span className="hidden min-[2560px]:block">
                                <X className="cursor-pointer" size={35} />
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div>
                    <span className="block min-[2560px]:hidden">
                      <ChevronDown className="cursor-pointer" size={18} />
                    </span>
                    <span className="hidden min-[2560px]:block">
                      <ChevronDown className="cursor-pointer" size={50} />
                    </span>
                  </div>
                </div>
                {requirements.includes(requirementList[0]) && (
                  <div className=" mt-1 text-xs">
                    Note : Follows can not be validated with Twitter API V2
                    Basic. We are looking for a workaround.
                  </div>
                )}
                <div
                  className={`${
                    show ? "block" : "hidden"
                  } absolute top-12 z-10 w-full rounded bg-white shadow-[0_0_10px_rgba(0,0,0,0.25)] min-[2560px]:top-28`}
                >
                  {requirementList.map(
                    (t: { type: string; title: string }, index: number) => {
                      return (
                        <button
                          key={index}
                          className={`block w-full px-4 py-2 text-left capitalize hover:bg-[#f3f3f3] min-[2560px]:p-6 min-[2560px]:text-4xl`}
                          onClick={() => {
                            setRequirements([...requirements, t]);
                            setShow(false);
                          }}
                          disabled={requirements.includes(t)}
                        >
                          {t.title}
                        </button>
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6 items-center gap-4 md:flex min-[2560px]:mb-10">
            <div className="w-full md:w-1/5">
              <h3 className="mb-2 text-base font-semibold min-[2560px]:text-4xl">
                Reward*
              </h3>
              <p className="text-sm font-normal text-[#595959] min-[2560px]:text-2xl">
                Amount and Token Type
              </p>
            </div>
            <div className="flex w-full gap-4 max-[300px]:flex-wrap md:w-2/5">
              <div className="w-1/2 max-[300px]:w-full">
                <p className="mb-2 min-[2560px]:text-4xl">Amount</p>
                <Input
                  name="reward"
                  value={values.reward}
                  onChange={handleChange}
                  type="number"
                  placeholder="Ex. 10"
                  containerClass="w-full"
                  error={errors.reward}
                />
              </div>
              <div className="w-1/2 max-[300px]:w-full">
                <p className="mb-2 min-[2560px]:text-4xl">Token</p>
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    disabled={isTokensLoading}
                    className="flex w-full items-center justify-between rounded border border-[#b3b3b3] px-3 py-2 min-[2560px]:rounded-xl min-[2560px]:py-4 min-[2560px]:text-4xl"
                  >
                    <span>
                      {isTokensLoading
                        ? "Loading Tokens"
                        : selectedToken?.symbol ?? "Select Token"}
                    </span>
                    <span className="block min-[2560px]:hidden">
                      <ChevronDown size={18} />
                    </span>
                    <span className="hidden min-[2560px]:block">
                      <ChevronDown size={50} />
                    </span>
                  </button>
                  <div
                    className={`${
                      isOpen ? "block" : "hidden"
                    } absolute top-12 z-50 w-full rounded bg-white shadow-[0_0_10px_rgba(0,0,0,0.25)] min-[2560px]:top-24`}
                  >
                    {Object.values(tokens || []).map((t, index) => {
                      return (
                        <div
                          key={index}
                          className="cursor-pointer px-4 py-2 capitalize hover:bg-[#f3f3f3] min-[2560px]:p-6 min-[2560px]:text-4xl"
                          onClick={() => {
                            setSelectedToken(t);
                            setIsOpen(false);
                          }}
                        >
                          {t.symbol}
                        </div>
                      );
                    })}
                  </div>
                </div>
                {selectedToken && (
                  <div className="text-right">{`Balance: ${
                    Number(selectedToken.balance || 0) /
                    10 ** selectedToken.decimal
                  } ${selectedToken.symbol} `}</div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-6 items-center gap-4 md:flex min-[2560px]:mb-10">
            <div className="w-full md:w-1/5">
              <h3 className="mb-2 text-base font-semibold min-[2560px]:text-4xl">
                Winners*
              </h3>
              <p className="text-sm font-normal text-[#595959] min-[2560px]:text-2xl">
                No of Winners
              </p>
            </div>
            <Input
              name="winners"
              value={values.winners}
              type="number"
              onChange={handleChange}
              placeholder="Ex. 5"
              containerClass="w-full md:w-2/5"
              error={errors.winners}
            />
          </div>
          <div className="mb-6 items-center gap-4 md:flex min-[2560px]:mb-10">
            <div className="w-full md:w-1/5">
              <h3 className="mb-2 text-base font-semibold min-[2560px]:text-4xl">
                Total Rewards
              </h3>
              <p className="text-sm font-normal text-[#595959] min-[2560px]:text-2xl">
                Total = Reward x No of Winners
              </p>
            </div>
            <Input
              value={totalReward ?? 0}
              containerClass="w-full md:w-2/5"
              disabled
            />
          </div>
          <div className="mb-4 items-center gap-4 md:flex min-[2560px]:mb-10">
            <div className="w-full md:w-1/5">
              <h3 className="mb-2 text-base font-semibold min-[2560px]:text-4xl">
                Duration*
              </h3>
              <p className="text-sm font-normal text-[#595959] min-[2560px]:text-2xl">
                Campaign duration in HH:MM
              </p>
            </div>
            <div className="w-full md:w-2/5">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="w-full">
                  <div className="mb-2">Start Time</div>
                  <Input
                    name="start_time"
                    type="datetime-local"
                    value={values.start_time}
                    error={errors.start_time}
                    onChange={handleChange}
                    containerClass="w-full"
                  />
                </div>
                <div className="w-full">
                  <div className="mb-2">End Time</div>
                  <Input
                    name="end_time"
                    type="datetime-local"
                    value={values.end_time}
                    error={errors.end_time}
                    onChange={handleChange}
                    containerClass="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          {platformfee && selectedToken && values.winners && values.reward && (
            <div className="mt-10">
              <div className="mb-1">
                ICP Fee:{" "}
                <span className=" font-semibold">
                  {selectedToken.token_type === "icp"
                    ? (platformfee[1] + platformfee[0]).toFixed(4)
                    : platformfee[1].toFixed(4)}{" "}
                  ICP{" "}
                </span>
              </div>
              {selectedToken.token_type !== "icp" && (
                <div>
                  Token Fee:{" "}
                  <span className=" font-semibold">
                    {platformfee[0].toFixed(4)} {selectedToken.symbol}
                  </span>
                </div>
              )}
            </div>
          )}
          <div className="mb-3 mt-6 font-semibold">{values.project_name}</div>
          {values.tweet_link && twitterRegexPattern.test(values.tweet_link) && (
            <div className="w-full md:w-[550px]">
              <iframe
                height="400"
                width="100%"
                src={`https://twitframe.com/show?url=${convertXToTwitter(
                  values.tweet_link,
                )}`}
              ></iframe>
            </div>
          )}
          <div>
            <Button
              type="submit"
              variant="dark"
              className="mt-6 gap-2 rounded bg-black px-3 py-2 text-sm text-white min-[2560px]:rounded-xl min-[2560px]:p-8 min-[2560px]:text-4xl"
              onClick={() => formik.handleSubmit()}
              isLoading={isLoading}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default CreateCampaign;
