import { Loader2, Plus, Search, X } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Button from "@/components/buttons/Button";
import Dropdown from "@/components/Dropdown";
import CampaignDetails from "@/components/CampaignDetails";
import WinnerList from "@/components/WinnerList";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Settings } from "@/declarations/amplify_sc_rust_backend/amplify_sc_rust_backend.did";
import Pagination from "@/components/Pagination";
import { toast } from "react-toastify";
import { Principal } from "@dfinity/principal";
import moment from "moment";
import { CountdownTimer } from "@/components/Countdown";
import { createActor } from "@/declarations/icrc1_ledger_canister";
import TwitterLogo from "./TwitterLogo";
import {
  transferICP,
  transferIcrc1Tokens,
  useBackend,
  useICP,
  useIcpConnection,
  useToken,
} from "@/hooks/useCanisters.ts";
import {
  CreateCampaignInput,
  PaginatedCampaign,
  PaginatedCampaigns,
  useCampaignsReducer,
} from "@/hooks/useCampaignsReducer.ts";
import { useWhiteListedContext } from "@/providers/WhiteListedTokensProvider.tsx";
import { MdRefresh } from "react-icons/md";
import { roundToDecimal } from "@/lib/utils";
import useSWR from "swr";
import { canisterId } from "@/declarations/amplify_sc_rust_backend";

const campaignsOption: string[] = [
  "Pending",
  "Upcoming",
  "In-Progress",
  "Ended",
  "Claimed",
  "Unclaimed",
];

interface IToken {
  name: string;
  symbol: string;
  decimal: number;
}

const Home = () => {
  const [selectedOption, setSelectedOption] = useState<string>(
    campaignsOption[2],
  );
  const [openCampaign, setOpenCampaign] = useState<boolean>(false);
  const [openWinnerList, setOpenWinnerList] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBackgroundLoading, setIsBackgroundLoading] =
    useState<boolean>(false);
  const { rewardTokens } = useWhiteListedContext();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalItems, setTotalItems] = useState(100);
  const [openedWinnerListCampaign, setOpenedWinnerListCampaign] =
    useState<PaginatedCampaign>();
  const [selectedCampaign, setSelectedCampaign] =
    React.useState<PaginatedCampaign>();

  const [searchString, setSearchString] = useState("");

  const [settings, setSettings] = useState<Settings>();
  const navigate = useNavigate();
  const { isConnected, principal, activeProvider } = useIcpConnection();
  const [backend] = useBackend();
  const [transferICPFun] = transferICP();

  const queryParams = useMemo(() => {
    const obj: any = {};
    obj.user_id = principal?.toString() || "";
    if (searchString) {
      obj.name = searchString;
    }
    if (selectedOption === "Upcoming" || selectedOption === "Pending")
      obj.upcoming = true;
    if (selectedOption === "Ended") obj.ended = true;
    if (selectedOption === "In-Progress") obj.ongoing = true;
    if (selectedOption === "Claimed") obj.claimed = true;
    if (selectedOption === "Unclaimed") obj.unclaimed = true;
    // obj.ready = selectedOption !== "Pending";
    if (selectedOption === "Pending") obj.my = true;
    obj.page = pageNumber;
    return new URLSearchParams(obj).toString();
  }, [searchString, selectedOption, pageNumber]);
  console.log("queryParams", queryParams);
  const {
    data: data,
    isLoading,
    mutate,
  } = useSWR<PaginatedCampaigns>(
    `${import.meta.env.VITE_BACKEND_URL}/campaigns?${queryParams}`,
  );
  const campaigns = useMemo(() => data?.data || [], [data?.data]);
  console.log("data", campaigns);
  useEffect(() => {
    if (totalItems / pageNumber === 10) {
      setTotalItems(totalItems + 100);
    }
  }, [pageNumber]);

  useEffect(() => {
    const fetchSettings = () => {
      backend
        .get_settings()
        .then((setting) => setSettings(setting))
        .catch((e) => {
          console.log("error in setting fetch", e);
        });
    };
    fetchSettings();
  }, []);

  const Row = (props: { campaign: PaginatedCampaign }) => {
    const { campaign } = props;
    const [claimLoading, setClaimLoading] = useState(false);

    const rewardToken = useMemo(() => {
      return rewardTokens
        ? rewardTokens[campaign.reward_token.toString()]
        : undefined;
    }, [rewardTokens, campaign.reward_token]);
    console.log("rewardToken", rewardToken, rewardTokens);
    const reward = useMemo(() => {
      return Number(campaign.reward);
    }, [campaign.reward]);

    const Status = useMemo(() => {
      if (moment(campaign.starts_at).isAfter(moment())) {
        return "upcoming";
      } else if (
        moment(campaign.starts_at).isBefore(moment()) &&
        moment(campaign.ends_at).isAfter(moment())
      ) {
        return "live";
      } else {
        return "ended";
      }
    }, [campaign.starts_at, campaign.ends_at, campaign.id]);

    const Time = useMemo(() => {
      if (Status == "upcoming") {
        return moment(campaign.starts_at).unix() * 1000;
      } else if (Status == "live") {
        return moment(campaign.ends_at).unix() * 1000;
      } else {
        return 0;
      }
    }, [Status, campaign.starts_at, campaign.ends_at, campaign.id]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [transferIcrc1Fun] = transferIcrc1Tokens(
      rewardToken?.token?.toString(),
    );

    const [tokenCanister] = useToken(rewardToken?.token?.toString());

    const PlatformFee = useCallback(async () => {
      if (rewardToken && campaign.reward && campaign.winners && settings) {
        const fee = rewardToken.fee;
        const decimal = rewardToken.decimal;

        const icpFee = 10000n;
        const icpDecimal = 8;

        const tokenFee = BigInt(
          Number(campaign.reward) * Number(campaign.winners),
        );

        return [
          (Number(tokenFee) +
            (Number(fee) + Number(BigInt(Number(campaign.winners)) * fee))) /
            10 ** decimal,
          Number(settings.platform_fees + icpFee) / 10 ** icpDecimal,
        ];
      }
    }, [rewardToken, settings, campaign.reward, campaign.winners]);
    const createCampaignHandler = async () => {
      const platformfee = await PlatformFee();
      if (isConnected && principal) {
        if (rewardToken && tokenCanister && platformfee && platformfee[1]) {
          const userConfirmed = window.confirm(
            // "Please double check the post id, make sure the tweet preview is shown before proceeding!\n\n" +
            `We will also transfer ${
              platformfee[0]
            } ${rewardToken.symbol.toUpperCase()} and Platform Fee ${platformfee[1].toFixed(
              4,
            )} ICP`,
          );
          if (userConfirmed) {
            const deposit_address = await backend.getDepositAddress();
            // const deposit_address_pri = Principal.fromText(deposit_address);
            console.log("deposit_address", principal.toText());
            const tokenFee = rewardToken.fee;
            const allowanceAmount =
              BigInt(Number(campaign.reward) * Number(campaign.winners)) +
              tokenFee +
              BigInt(Number(tokenFee) * Number(campaign.winners));
            setIsLoading(true);
            const create = async (additional = 0n) => {
              const isTransferICP = await transferICPFun({
                amount: (settings?.platform_fees || 0n) + additional,
              });
              if (isTransferICP) {
                const register = await backend.deposit_campaign(
                  BigInt(campaign.campaign_id),
                );
                if ("Ok" in register && register.Ok) {
                  toast.success("Deposit Successful");
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
              switch (rewardToken.token_type) {
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
                        BigInt(Number(tokenFee) * Number(campaign.winners)),
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
          toast.error("Select A Token");
        }
      } else {
        toast.error("Connect Wallet First");
      }
    };

    console.log("Time", Time, Status);
    const claimHandler = async () => {
      try {
        setClaimLoading(true);
        const data = await backend.claimReward(BigInt(campaign.campaign_id));
        if ("Ok" in data && data.Ok) {
          toast.success("Claim request submitted!");
          // await mutate();
        }
        if ("Err" in data && data.Err) {
          console.log(data.Err);
          toast.error(data.Err);
        }
      } catch (e) {
        console.log("error in Claim", e);
        toast.error("Something went wrong while claiming");
      }
      setClaimLoading(false);
    };

    return (
      <tr className="border-b border-gray2 text-xs">
        <td className="p-4">
          <div className="relative flex items-center gap-4">
            {/*<div className="relative h-12 w-12 min-[2560px]:h-24 min-[2560px]:w-24">*/}
            {/*  <img src={profile} alt="Profile-img" className="rounded-full" />*/}
            {/*</div>*/}
            <p className="min-[2560px]:text-2xl">{campaign.id}</p>
          </div>
        </td>
        <td className="p-4">
          <div className="relative flex items-center gap-4">
            {/*<div className="relative h-12 w-12 min-[2560px]:h-24 min-[2560px]:w-24">*/}
            {/*  <img src={profile} alt="Profile-img" className="rounded-full" />*/}
            {/*</div>*/}
            <p className="min-[2560px]:text-2xl">{campaign.project_name}</p>
          </div>
        </td>
        {/*{["In-Progress"].includes(selectedOption as string) && (*/}
        {/*  <td className="p-4 min-[2560px]:text-2xl">*/}
        {/*    Have you seen our monthly stats? With over 45 clien...*/}
        {/*  </td>*/}
        {/*)}*/}
        {["In-Progress", "Upcoming", "Pending"].includes(
          selectedOption as string,
        ) && (
          <td className="p-4 font-bold min-[2560px]:text-2xl">
            <CountdownTimer
              date={String(Time)}
              isTimeUnix
              callback={() => {
                console.log("timer callback called");
                mutate();
              }}
            />
          </td>
        )}
        {rewardToken && (
          <td className="p-4 font-bold min-[2560px]:text-2xl">
            {reward / 10 ** rewardToken.decimal} {rewardToken.symbol}
          </td>
        )}

        {["In-Progress", "Ended"].includes(selectedOption as string) &&
          rewardToken && (
            <>
              <td className="p-4 font-bold min-[2560px]:text-2xl">
                {roundToDecimal(
                  (reward / 10 ** rewardToken.decimal) *
                    Number(campaign.winners),
                )}{" "}
                {rewardToken.symbol}
              </td>
            </>
          )}
        {["In-Progress"].includes(selectedOption as string) && (
          <>
            <td className="p-4 font-bold min-[2560px]:text-3xl">
              {props.campaign.total_participants.toString()}
            </td>
            <td className="p-4">
              <div className="w-fit cursor-pointer rounded-md bg-black1 px-4 py-2 text-xs text-white min-[2560px]:text-2xl">
                <p>Live</p>
              </div>
            </td>
          </>
        )}
        {["Pending"].includes(selectedOption as string) && (
          <td className="p-4">
            <button
              onClick={createCampaignHandler}
              disabled={isLoading}
              className="w-fit cursor-pointer rounded-md bg-black1 px-4 py-2 text-xs text-white min-[2560px]:text-2xl"
            >
              <p>{isLoading ? "Submitting..." : "Deposit"}</p>
            </button>
          </td>
        )}
        {["Ended"].includes(selectedOption as string) && (
          <td className="p-4 font-bold min-[2560px]:text-3xl">Raffle</td>
        )}
        {/* number of total participants */}
        {["Ended"].includes(selectedOption as string) && (
          <td className="p-4 font-bold min-[2560px]:text-3xl">
            {props.campaign.total_participants.toString()}
          </td>
        )}
        {["Ended"].includes(selectedOption as string) && (
          <td className="p-4">
            <div
              className="w-fit cursor-pointer rounded-md bg-black1 px-4 py-2 text-xs text-white min-[2560px]:text-3xl"
              onClick={() => {
                setOpenWinnerList(true);
                setOpenedWinnerListCampaign(props.campaign);
              }}
            >
              <p>View Winners</p>
            </div>
          </td>
        )}
        {["Ended"].includes(selectedOption as string) && (
          <td className="p-4">
            <div
              onClick={() => {
                setSelectedCampaign(props.campaign);
                setOpenCampaign(true);
              }}
              className="flex cursor-pointer items-center justify-center"
            >
              {props.campaign.finalised ? (
                props.campaign.participated ? (
                  props.campaign.winner ? (
                    <TwitterLogo color="#01C29A" size="25" />
                  ) : (
                    <TwitterLogo color="#FF4D5E" size="25" />
                  )
                ) : (
                  <TwitterLogo color="#808080" size="25" />
                )
              ) : (
                <TwitterLogo color="#c4c4c4" size="25" />
              )}
            </div>
          </td>
        )}
        {["In-Progress"].includes(selectedOption as string) && (
          <td className="p-4">
            <div
              onClick={() => {
                setSelectedCampaign(props.campaign);
                setOpenCampaign(true);
              }}
              className="flex cursor-pointer items-center justify-center"
            >
              {!props.campaign.participated ? (
                <TwitterLogo color="gray" size="25" />
              ) : (
                <TwitterLogo color="black" size="25" />
              )}
            </div>
          </td>
        )}

        {["Claimed"].includes(selectedOption as string) && (
          <>
            <td className="p-4 text-center">
              <div className="flex justify-center">
                {/* <NextImage
                  src={history}
                  alt='history-img'
                  className=''
                  width={24}
                  height={24}
                /> */}
              </div>
            </td>
          </>
        )}
        {["Unclaimed"].includes(selectedOption as string) && (
          <td className="p-4">
            <Button
              isLoading={claimLoading}
              onClick={claimHandler}
              className="w-fit cursor-pointer rounded-md bg-black1 px-4 py-2 text-xs text-white hover:bg-gray-600 min-[2560px]:text-3xl"
            >
              <p>Claim</p>
            </Button>
          </td>
        )}
      </tr>
    );
  };

  useEffect(() => {
    setPageNumber(1);
  }, [selectedOption]);

  const NearestTime = useMemo(() => {
    const currentTime = new Date();
    const nearestTime = campaigns.reduce(
      (closest: Date | null, row: PaginatedCampaign) => {
        const startTime = new Date(
          Number(selectedOption == "Upcoming" ? row.starts_at : row.ends_at) /
            10 ** 6,
        );
        if (
          !closest ||
          Math.abs(startTime.getTime() - currentTime.getTime()) <
            Math.abs(closest.getTime() - currentTime.getTime())
        ) {
          return startTime;
        }
        return closest;
      },
      null,
    );
    return moment(nearestTime).unix();
  }, [campaigns, selectedOption]);

  // useEffect(() => {
  //   if (!(NearestTime && moment.unix(NearestTime).isAfter(moment()))) return;
  //   const currentUnixTimestamp = Math.floor(Date.now() / 1000);
  //   const timeDifference = NearestTime - currentUnixTimestamp;
  //   if (timeDifference > 0) {
  //     const timeoutId = setTimeout(() => {
  //       fetchCampaignWithoutLoading();
  //     }, timeDifference * 1000);
  //     return () => clearTimeout(timeoutId);
  //   } else {
  //     console.log("Specified timestamp has already passed.");
  //   }
  // }, [NearestTime]);

  console.log("Campaigns", selectedOption, campaigns);

  return (
    <AuthLayout>
      <div className="relative">
        {openCampaign && selectedCampaign && (
          <CampaignDetails
            onEnter={() => {
              // updateCampaign(selectedCampaign.id, {
              //   ...selectedCampaign,
              //   participated: true,
              // });
              mutate();
              setOpenCampaign(false);
              setSelectedCampaign(undefined);
              toast.success("Participation submitted!");
            }}
            campaign={selectedCampaign}
            setOpenCampaign={setOpenCampaign}
          />
        )}
        {openWinnerList && openedWinnerListCampaign && (
          <WinnerList
            campaign={openedWinnerListCampaign}
            setOpenWinnerList={setOpenWinnerList}
          />
        )}
        <div className="min-h-screen bg-gray1 md:p-4">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            {selectedOption === "In-Progress" && (
              <div className="flex w-full max-w-sm items-center rounded-lg border border-neutral-50 pl-3 min-[2560px]:max-w-xl min-[2560px]:rounded-xl min-[2560px]:py-3 min-[2560px]:pl-4">
                <input
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                  type="text"
                  placeholder="Search.."
                  className="w-full rounded-lg border-transparent bg-transparent text-xs focus:border-transparent focus:ring-0 min-[2560px]:text-4xl"
                />
                <div className="rounded-r-lg border border-transparent bg-gray-200 p-2">
                  <Search className=" flex-shrink-0 text-neutral-50 min-[2560px]:h-12 min-[2560px]:w-12" />
                </div>
              </div>
            )}
            {selectedOption === "Ended" && (
              <div>
                <p className="mt-10 text-2xl font-semibold min-[2560px]:text-5xl">
                  Expired
                </p>
                <p className="mt-4 text-xs text-dark-35 min-[2560px]:text-2xl">
                  These Engage-To-Earn campaigns have ended
                </p>
              </div>
            )}
            {selectedOption === "Claimed" && (
              <div>
                <p className="mt-10 text-2xl font-semibold min-[2560px]:text-5xl">
                  Claimed
                </p>
                <p className="mt-4 text-xs text-dark-35 min-[2560px]:text-2xl">
                  You have claimed these rewards!
                </p>
              </div>
            )}
            {selectedOption === "Unclaimed" && (
              <div>
                <p className="mt-10 text-2xl font-semibold min-[2560px]:text-5xl">
                  Unclaimed
                </p>
                <p className="mt-4 text-xs text-dark-35 min-[2560px]:text-2xl">
                  These are rewards yet to be claimed by you
                </p>
              </div>
            )}
            {selectedOption === "Upcoming" && (
              <div>
                <p className="mt-10 text-2xl font-semibold min-[2560px]:text-5xl">
                  Upcoming Campaigns
                </p>
                <p className="mt-4 text-xs text-dark-35 min-[2560px]:text-2xl">
                  The list of campaigns that are upcoming
                </p>
              </div>
            )}
            {selectedOption === "Pending" && (
              <div>
                <p className="mt-10 text-2xl font-semibold min-[2560px]:text-5xl">
                  Pending Campaigns
                </p>
                <p className="mt-4 text-xs text-dark-35 min-[2560px]:text-2xl">
                  The list of campaigns that are not verified yet
                </p>
              </div>
            )}
            <div className="flex flex-col gap-2 gap-y-4 min-[500px]:flex-row min-[500px]:items-center min-[2560px]:gap-6">
              <button
                disabled={isLoading}
                className={"cursor-pointer"}
                onClick={(e) => {
                  e.preventDefault();
                  mutate();
                }}
              >
                <MdRefresh size={20} />
              </button>
              <Dropdown
                className="min-w-[200px]"
                dropdownList={campaignsOption}
                selectedOption={selectedOption}
                setSelectedOption={(e) => {
                  setSearchString("");
                  setSelectedOption(e);
                }}
                disable={isLoading}
              />
              <Link to={"/create-campaign"}>
                <Button
                  size="sm"
                  variant="dark"
                  leftIcon={Plus}
                  classNames={{
                    leftIcon: "min-[2560px]:w-12 min-[2560px]:h-12",
                  }}
                  className="rounded-lg px-5 py-3 font-bold min-[2560px]:rounded-xl min-[2560px]:px-10 min-[2560px]:py-6 min-[2560px]:text-4xl"
                >
                  <span className="truncate">Create New Campaigns</span>
                </Button>
              </Link>
            </div>
          </div>
          {selectedOption === "In-Progress" && (
            <>
              <p className="mt-10 text-2xl font-semibold min-[2560px]:text-5xl">
                Live Campaigns
              </p>
              <p className="mt-4 text-xs text-dark-35 min-[2560px]:text-2xl">
                The list of Tweets that are offering rewards
              </p>
            </>
          )}

          <div
            className={`mt-4 flex flex-col gap-x-6 gap-y-3 sm:mt-7 lg:flex-row`}
          >
            {["Ended"].includes(selectedOption as string) && (
              <>
                <div className="order-2 flex items-center gap-4 lg:order-none">
                  <TwitterLogo color="#01C29A" size="20" />
                  <p className="text-xs text-black1 min-[2560px]:text-2xl">
                    You won this campaign
                  </p>
                </div>
                <div className="order-3 flex items-center gap-4 lg:order-none">
                  <TwitterLogo color="#FF4D5E" size="20" />
                  <p className="text-xs text-black1 min-[2560px]:text-2xl">
                    You lost this campaign
                  </p>
                </div>
                <div className="order-4 flex items-center gap-4 lg:order-none">
                  <TwitterLogo color="#808080" size="20" />
                  <p className="text-xs text-black1 min-[2560px]:text-2xl">
                    You haven’t participated yet
                  </p>
                </div>
                <div className="order-4 flex items-center gap-4 lg:order-none">
                  <TwitterLogo color="#c4c4c4" size="20" />
                  <p className="text-xs text-black1 min-[2560px]:text-2xl">
                    Pending Winner Selection
                  </p>
                </div>
              </>
            )}
            {["In-Progress"].includes(selectedOption as string) && (
              <>
                <div className="order-2 flex items-center gap-4 lg:order-none">
                  <TwitterLogo color="black" size="20" />
                  <p className="text-xs text-black1 min-[2560px]:text-2xl">
                    You have already entered
                  </p>
                </div>
                <div className="order-3 flex items-center gap-4 lg:order-none">
                  <TwitterLogo color="gray" size="20" />
                  <p className="text-xs text-black1 min-[2560px]:text-2xl">
                    You haven’t participated yet
                  </p>
                </div>
              </>
            )}
          </div>

          <div
            className={`mt-8 overflow-x-auto rounded-lg border border-gray2 ${
              ["Claimed", "Unclaimed"].includes(selectedOption as string)
                ? "w-full lg:w-3/5 xl:w-2/5"
                : "w-full"
            }`}
          >
            {!isLoading ? (
              <table className={`w-full table-auto bg-white1`}>
                <thead className="whitespace-nowrap border-b border-gray2 text-left text-sm text-gray3">
                  <tr>
                    <th className="p-4 py-6 min-[2560px]:text-3xl">ID</th>
                    <th className="p-4 py-6 min-[2560px]:text-3xl">
                      Project/Users
                    </th>
                    {/*{["In-Progress"].includes(selectedOption as string) && (*/}
                    {/*  <>*/}
                    {/*    <th className="min-w-[10rem] p-4 py-6 min-[2560px]:text-3xl">*/}
                    {/*      Tweet*/}
                    {/*    </th>*/}
                    {/*  </>*/}
                    {/*)}*/}
                    {["In-Progress"].includes(selectedOption as string) && (
                      <>
                        <th className="p-4 py-6 min-[2560px]:text-3xl">
                          Ends In
                        </th>
                      </>
                    )}
                    {["Upcoming", "Pending"].includes(
                      selectedOption as string,
                    ) && (
                      <>
                        <th className="p-4 py-6 min-[2560px]:text-3xl">
                          Starts In
                        </th>
                      </>
                    )}
                    <th className="p-4 py-6 min-[2560px]:text-3xl">Reward</th>
                    {["In-Progress", "Ended"].includes(
                      selectedOption as string,
                    ) && (
                      <>
                        <th className="p-4 py-6 min-[2560px]:text-3xl">
                          Total Rewards
                        </th>
                      </>
                    )}
                    {["Ended"].includes(selectedOption as string) && (
                      <>
                        <th className="p-4 py-6 min-[2560px]:text-3xl">
                          Claim Type
                        </th>
                      </>
                    )}
                    {selectedOption === "In-Progress" && (
                      <>
                        <th className="p-4 py-6 min-[2560px]:text-3xl">
                          Participants
                        </th>
                        <th className="p-4 py-6 min-[2560px]:text-3xl">
                          Status
                        </th>
                        <th className="p-4 py-6 text-center min-[2560px]:text-3xl">
                          Engage Link
                        </th>
                      </>
                    )}
                    {selectedOption === "Ended" && (
                      <>
                        <th className="p-4 py-6 min-[2560px]:text-3xl">
                          Participants
                        </th>
                        <th className="p-4 py-6 min-[2560px]:text-3xl">
                          Winners
                        </th>
                        <th className="p-4 py-6 text-center min-[2560px]:text-3xl">
                          Your Result
                        </th>
                      </>
                    )}
                    {selectedOption === "Claimed" && (
                      <>
                        <th className="p-4 py-6 text-center min-[2560px]:text-3xl">
                          Transactions
                        </th>
                      </>
                    )}
                    {selectedOption === "Unclaimed" && (
                      <>
                        <th className="p-4 py-6 text-left min-[2560px]:text-3xl">
                          Actions
                        </th>
                      </>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {campaigns.map((campaign, index) => (
                    <Row
                      campaign={{
                        ...campaign,
                      }}
                      key={index}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex h-[calc(100vh_-_100px)] w-full items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin" />
              </div>
            )}
          </div>

          <div
            className={`mt-4 flex flex-col justify-between lg:flex-row ${
              ["Claimed", "Unclaimed"].includes(selectedOption as string)
                ? "lg:mt-4"
                : "lg:mt-0"
            } gap-6 min-[2560px]:mt-6`}
          >
            {/* Pagination */}
            <Pagination
              containerClassName="ml-auto"
              currentPage={data?.meta?.current_page || 1}
              pageSize={data?.meta?.per_page || 10}
              totalItems={data?.meta?.total || 0}
              onPageChange={setPageNumber}
              hideLegand={true}
            />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Home;
