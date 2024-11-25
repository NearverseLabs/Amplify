import Input from "@/components/Input";
import Button from "@/components/buttons/Button";
import { useEffect, useState } from "react";
import { Principal } from "@dfinity/principal";
import { toast } from "react-toastify";
import { ChevronDown, Loader2 } from "lucide-react";
import { WhiteListedToken } from "@/declarations/amplify_sc_rust_backend/amplify_sc_rust_backend.did";
import { useBackend } from "@/hooks/useCanisters.ts";
import { useUserContext } from "@/providers/UserProvider.tsx";
import { useConnect } from "@connect2ic/react";

const Row = ({
  token,
  refetch,
}: {
  token: WhiteListedToken;
  refetch?: any;
}) => {
  const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false);
  const [backend] = useBackend();

  const handleRemoveWhiteList = async () => {
    setIsLoadingRemove(true);
    try {
      if (token) {
        const tokens = await backend.unwhitelist_token(token.token);
        if ("Ok" in tokens && tokens.Ok) {
          toast.success("Token Delisted");
          if (refetch) {
            await refetch();
          }
        }
        if ("Err" in tokens && tokens.Err) {
          toast.error(tokens.Err);
        }
      } else {
        toast.error("Failed to delist");
      }
    } catch (error) {
      console.log(error, "Remove Token");
      toast.error("Error: White list token");
    } finally {
      setIsLoadingRemove(false);
    }
  };
  return (
    <tr className="my-12">
      <td className="px-4 py-4 text-left font-normal">
        {token.token.toText()}
      </td>
      <td className="px-4 py-4 text-left font-normal">{token.token_type}</td>
      <td className="px-4 py-4 text-left font-normal">
        {Number(token.min_reward)}
      </td>
      <td className="px-4 py-4 text-left font-normal">
        <Button
          onClick={handleRemoveWhiteList}
          className=""
          variant="dark"
          isLoading={isLoadingRemove}
        >
          Delist
        </Button>
      </td>
    </tr>
  );
};

const Admin = () => {
  const [whiteListedTokens, setWhiteListedTokens] =
    useState<WhiteListedToken[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingTokens, setIsFetchingTokens] = useState<boolean>(false);
  const [principal, setPrincipal] = useState<string>();
  const [minRewardPrincipal, setMinRewardPrincipal] = useState<string>();
  const [platformFee, setPlatformFee] = useState<string>();
  const [minReward, setMinReward] = useState<string>();
  const [minRewardWhiteList, setMinRewardWhiteList] = useState<string>();
  const [minWinners, setMinWinners] = useState<string>();
  const [maxWinners, setMaxWinners] = useState<string>();
  const [newOwner, setNewOwner] = useState<string>();
  const [settingsData, setSettingsData] = useState<{
    platform_fee_owner: Principal;
    platform_fees: number;
    min_winners: number;
    max_winners: number;
  }>();
  const [backend] = useBackend();
  const { isOwner, setIsOwner } = useUserContext();
  const { connect } = useConnect();

  const updatePlatFormFee = async () => {
    try {
      if (platformFee) {
        const response = await backend.update_platform_fees(
          BigInt(Number(platformFee) * 10 ** 8),
        );
        console.log(response, "updated fee");
        if ("Ok" in response && response.Ok) {
          toast.success("Platform fee updated.");
          await fetchWhiteListedTokens();
        }
        if ("Err" in response && response.Err) {
          toast.error(response.Err);
        }
      } else {
        toast.warn("Please enter valid fee !");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateOwner = async () => {
    try {
      if (newOwner) {
        const response = await backend.transfer_owner(
          Principal.fromText(newOwner),
        );
        if ("Ok" in response && response.Ok) {
          toast.success("Owner updated.");
          await fetchWhiteListedTokens();
        }
        if ("Err" in response && response.Err) {
          toast.error(response.Err);
        }
      } else {
        toast.warn("Please enter valid principal !");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateMinReward = async () => {
    try {
      if (minRewardPrincipal && minReward) {
        const response = await backend.whitelist_token(
          Principal.fromText(minRewardPrincipal),
          BigInt(minReward),
          selectedToken.symbol,
        );
        console.log(response, "updated min reward");
        if ("Ok" in response && response.Ok) {
          toast.success("Minimum reward amount updated.");
          await fetchWhiteListedTokens();
        }
        if ("Err" in response && response.Err) {
          toast.error(response.Err);
        }
      } else {
        toast.warn("Please enter valid amount !");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateMinWinners = async () => {
    try {
      if (minWinners) {
        const response = await backend.update_min_winners(BigInt(minWinners));
        console.log(response, "updated min winners");
        if ("Ok" in response && response.Ok) {
          toast.success("Minimum Winners updated.");
          await fetchWhiteListedTokens();
        }
        if ("Err" in response && response.Err) {
          toast.error(response.Err);
        }
      } else {
        toast.warn("Please enter valid number !");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateMaxWinners = async () => {
    try {
      if (maxWinners) {
        const response = await backend.update_max_winners(BigInt(maxWinners));
        console.log(response, "updated max winners");
        if ("Ok" in response && response.Ok) {
          toast.success("Maximum Winners updated.");
          await fetchWhiteListedTokens();
        }
        if ("Err" in response && response.Err) {
          toast.error(response.Err);
        }
      } else {
        toast.warn("Please enter valid number !");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWhiteList = async () => {
    setIsLoading(true);
    try {
      if (principal && minRewardWhiteList) {
        const tokens = await backend.whitelist_token(
          Principal.fromText(principal),
          BigInt(minRewardWhiteList),
          selectedToken.symbol,
        );
        console.log(tokens, "Submitted whitelisted token");
        if ("Ok" in tokens && tokens.Ok) {
          toast.success("Token Whitelisted");
          await fetchWhiteListedTokens();
        }
        if ("Err" in tokens && tokens.Err) {
          toast.error(tokens.Err);
        }
      } else {
        toast.error("Please enter fields !");
      }
    } catch (error) {
      console.log(error, "Fetch whitelisted token error");
      toast.error("Error: White list token");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWhiteListedTokens = async () => {
    setIsFetchingTokens(true);
    try {
      const ownerStatus = await backend.is_owner();
      setIsOwner(ownerStatus);
      const tokens = await backend.get_whitelisted_tokens();
      const settings = await backend.get_settings();
      console.log(tokens, "Tokens");
      setWhiteListedTokens(tokens);

      if (settings) {
        setSettingsData({
          platform_fee_owner: settings.platform_fee_owner,
          platform_fees: Number(
            Number(settings.platform_fees.toString()) / 10 ** 8,
          ),
          min_winners: Number(settings.min_winners),
          max_winners: Number(settings.max_winners),
        });
      }
      console.log(settings, "settings");
    } catch (error) {
      console.log(error, "Fetch whitelisted token error");
    } finally {
      setIsFetchingTokens(false);
    }
  };

  useEffect(() => {
    fetchWhiteListedTokens();
  }, []);

  const Tokens = [
    { title: "ICRC2", symbol: "icrc2" },
    { title: "ICRC1", symbol: "icrc1" },
    { title: "ICP", symbol: "icp" },
  ];
  const [selectedToken, setSelectedToken] = useState(Tokens[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray1 px-6 sm:px-8 md:p-4 md:px-10">
      <div className="w-full max-w-3xl">
        <p className="mt-3 text-2xl font-semibold min-[2560px]:text-5xl">
          Whitelisted Tokens
        </p>
        <p className="mt-3 text-xs text-dark-35 min-[2560px]:text-2xl">
          The list of whitelisted tokens.
        </p>
        <div className="mt-4">
          <table className="w-full table-auto border">
            <thead className="rounded-xl bg-light-gray">
              <tr className="text-base font-normal capitalize ">
                <th className="px-4 py-4 text-left">Principal</th>
                <th className="px-4 py-4 text-left">Token Type</th>
                <th className="px-4 py-4 text-left">Minimum Reward</th>
                <th className="px-4 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {isFetchingTokens && (
                <tr>
                  <div className="my-4 flex w-full items-center justify-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>Loading...</p>
                  </div>
                </tr>
              )}
              {!isFetchingTokens ? (
                whiteListedTokens && whiteListedTokens.length > 0 ? (
                  whiteListedTokens?.map((token, index) => (
                    <Row
                      token={token}
                      key={index}
                      refetch={fetchWhiteListedTokens}
                    />
                  ))
                ) : (
                  <tr>{"No Tokens Whitelisted !"}</tr>
                )
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
        <div className="my-6 mt-10 w-full">
          <p className="mb-3 text-lg font-medium">Add Tokens</p>
          <div className="my-6 w-1/2 max-[300px]:w-full">
            <p className="mb-2 min-[2560px]:text-4xl">Token</p>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between rounded border border-[#b3b3b3] px-3 py-2 min-[2560px]:rounded-xl min-[2560px]:py-4 min-[2560px]:text-4xl"
              >
                <span>{selectedToken?.title ?? "Select Token"}</span>
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
                {Tokens.map((t, index) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer px-4 py-2 capitalize hover:bg-[#f3f3f3] min-[2560px]:p-6 min-[2560px]:text-4xl"
                      onClick={() => {
                        setSelectedToken(t);
                        setIsOpen(false);
                      }}
                    >
                      {t.title}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-6 md:flex-row">
            <Input
              containerClass="w-full md:flex-[0.5]"
              name="token"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Enter Principal ID"
            />
            <Input
              containerClass="w-full md:flex-[0.5]"
              name="minReward"
              value={minReward}
              onChange={(e) => setMinRewardWhiteList(e.target.value)}
              placeholder="Enter minimum reward"
            />
          </div>

          <div className="mt-4 flex items-center gap-6">
            <Button
              onClick={handleWhiteList}
              className=""
              variant="dark"
              isLoading={isLoading}
              disabled={isLoading || !principal}
            >
              Whitelist
            </Button>
          </div>
        </div>

        <p className="mt-10 text-2xl font-semibold min-[2560px]:text-5xl">
          Minimum Reward Amount
        </p>
        <p className="mt-3 text-sm text-dark-35 min-[2560px]:text-2xl">
          Update Minimum Reward
        </p>

        <div className="">
          <div className="flex w-full flex-col items-center gap-6 md:flex-row">
            <Input
              containerClass="w-full md:flex-[0.5]"
              name="minRewardToken"
              value={minRewardPrincipal}
              onChange={(e) => setMinRewardPrincipal(e.target.value)}
              placeholder="Enter Principal ID"
            />
            <Input
              containerClass="w-full md:flex-[0.5]"
              name="rewardAmount"
              value={minReward}
              onChange={(e) => setMinReward(e.target.value)}
              placeholder="Enter minimum reward"
            />
          </div>

          <div className="mt-4 flex items-center gap-6">
            <Button
              onClick={updateMinReward}
              disabled={!minReward}
              className=""
              variant="dark"
            >
              Update Minimum Reward
            </Button>
          </div>
        </div>

        <p className="mt-10 text-2xl font-semibold min-[2560px]:text-5xl">
          Platform Fee
        </p>
        <p className="mt-3 text-sm text-dark-35 min-[2560px]:text-2xl">
          Current fee :
          <span>{settingsData ? settingsData.platform_fees : "-"}</span>
        </p>

        <div className="">
          <Input
            className=""
            name="platformFee"
            value={platformFee}
            onChange={(e) => setPlatformFee(e.target.value)}
            placeholder="Change fee"
          />
          <div className="mt-4 flex items-center gap-6">
            <Button
              onClick={updatePlatFormFee}
              className=""
              variant="dark"
              disabled={!platformFee}
            >
              Update fee
            </Button>
          </div>
        </div>

        <div className="mt-2">
          <Input
            className=""
            name="newOwner"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
            placeholder="Principal"
          />
          <div className="mt-4 flex items-center gap-6">
            <Button
              onClick={updateOwner}
              className=""
              variant="dark"
              disabled={!newOwner}
            >
              Transfer Ownership
            </Button>
          </div>
        </div>
        <p className="mt-10 text-2xl font-semibold min-[2560px]:text-5xl">
          Minimum Winners
        </p>
        <p className="mt-3 text-sm text-dark-35 min-[2560px]:text-2xl">
          Current minimum Winners :
          <span>{settingsData ? settingsData.min_winners : "-"}</span>
        </p>

        <div className="">
          <Input
            className=""
            name="platformFee"
            value={minWinners}
            onChange={(e) => setMinWinners(e.target.value)}
            placeholder="Change fee"
          />
          <div className="mt-4 flex items-center gap-6">
            <Button
              onClick={updateMinWinners}
              className=""
              variant="dark"
              disabled={!minWinners}
            >
              Update Minimum winners
            </Button>
          </div>
        </div>
        <p className="mt-10 text-2xl font-semibold min-[2560px]:text-5xl">
          Maximum Winners
        </p>
        <p className="mt-3 text-sm text-dark-35 min-[2560px]:text-2xl">
          Current Winners Count :
          <span>{settingsData ? settingsData.max_winners : "-"}</span>
        </p>

        <div className="">
          <Input
            className=""
            name="maxWinners"
            value={maxWinners}
            onChange={(e) => setMaxWinners(e.target.value)}
            placeholder="Change max winners"
          />
          <div className="mt-4 flex items-center gap-6">
            <Button
              onClick={updateMaxWinners}
              disabled={!maxWinners}
              className=""
              variant="dark"
            >
              Update Maximum winners
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
