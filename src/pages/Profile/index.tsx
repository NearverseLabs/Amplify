import { Copy, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { walletNameTrimmer } from "@/lib/utils";
import { useUserContext } from "@/providers/UserProvider";
import AuthLayout from "@/components/AuthLayout";
import React, { useEffect, useMemo, useState } from "react";
import { Users } from "@/declarations/amplify_sc_rust_backend/amplify_sc_rust_backend.did";
import { useBackend, useIcpConnection } from "@/hooks/useCanisters.ts";
import { useWhiteListedContext } from "@/providers/WhiteListedTokensProvider.tsx";
import Button from "@/components/buttons/Button";
import DepositModal, { OpenChattModal } from "@/components/DepositModal";
import WithdrawModal from "@/components/WithdrawModal";
import { RewardToken } from "@/hooks/useRewardToken";
import { toast } from "react-toastify";

const TokensRow = ({
  name,
  balance,
  tokenId,
  token,
}: {
  name: string;
  tokenId: string;
  balance: number;
  token: RewardToken;
}) => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  return (
    <>
      <tr>
        <td className="px-3 py-2 min-[2560px]:py-6 min-[2560px]:text-3xl">
          {name}
        </td>
        <td className="whitespace-nowrap px-3 py-2 min-[2560px]:py-6 min-[2560px]:text-3xl">
          {tokenId}
        </td>
        <td className="px-3 py-2 min-[2560px]:py-6 min-[2560px]:text-3xl">
          {balance}
        </td>
        <td className="px-3 py-2 min-[2560px]:py-6 min-[2560px]:text-3xl">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsDepositModalOpen(true)}
              variant="outline-secondary"
              size="sm"
            >
              Deposit
            </Button>
            <Button
              onClick={() => setIsWithdrawOpen(true)}
              variant="outline-secondary"
              size="sm"
            >
              Withdraw
            </Button>
            <DepositModal
              token={token}
              isOpen={isDepositModalOpen}
              setIsOpen={setIsDepositModalOpen}
              onClose={() => setIsDepositModalOpen(false)}
            />
            <WithdrawModal
              token={token}
              isOpen={isWithdrawOpen}
              setIsOpen={setIsWithdrawOpen}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default function Profile() {
  const navigate = useNavigate();
  const { rewardTokens: tokens, isLoading: isFetchingTokens } =
    useWhiteListedContext();
  const rewardTokens = useMemo(() => Object.values(tokens || {}), [tokens]);
  console.log("rewardTokens", rewardTokens);
  const { isConnected, principal, disconnect, activeProvider } =
    useIcpConnection({
      onDisconnect: () => {
        localStorage.removeItem("wallet_connected");
        navigate("/login");
      },
    });

  const [isLoading, setLoading] = React.useState(false);
  const [isOpenChatModalOpen, setIsOpenChatModalOpen] = useState(false);
  const [isTaggrModalOpen, setIsTaggrModalOpen] = useState(false);
  const [live_user, setLiveUser] = React.useState<Users | undefined>(undefined);
  const [backend] = useBackend();

  const fetchUser = async () => {
    if (!principal) return;
    try {
      const liveUser = await backend.get_user(principal);
      if ("Ok" in liveUser) {
        setLiveUser(liveUser.Ok);
      }
    } catch (e) {
      // alert(`Error from ${activeProvider.meta.name}: ${e}`);
      // return;
    }
  };
  useEffect(() => {
    fetchUser();
  }, [principal]);

  const { user, randomAvatar } = useUserContext();

  console.log("live_user", live_user);
  // if (isLoading) {
  //   return (
  //     <div className="flex h-[calc(100vh_-_73px)] w-full items-center justify-center">
  //       <Loader2 className="h-10 w-10 animate-spin" />
  //     </div>
  //   );
  // }

  console.log({ isConnected, principal }, "WW");
  return (
    <AuthLayout>
      <main>
        <div>
          <div className="mb-4 flex flex-col items-center gap-4 min-[450px]:flex-row">
            <div className="relative h-24 w-24 min-[2560px]:h-40 min-[2560px]:w-40">
              {user ? (
                <img
                  src={user.avatar_url}
                  alt={"avatar"}
                  className="rounded-full"
                />
              ) : (
                <img
                  src={randomAvatar}
                  alt={"profile"}
                  className="rounded-full"
                />
              )}
            </div>
            <div className="text-center min-[450px]:text-left">
              <h3 className="mb-2 text-2xl font-semibold capitalize min-[2560px]:mb-6 min-[2560px]:text-5xl">
                {`Hi, ${
                  principal
                    ? walletNameTrimmer(principal.toString(), 10, 8)
                    : "-"
                }`}
              </h3>
              <p className="text-base font-medium min-[2560px]:text-3xl">
                Platform and Wallet Connections
              </p>
            </div>
          </div>
          <div className="mb-4 rounded-md border border-[#e6e6e6] bg-[#f3f3f3] p-4 min-[2560px]:mb-6 min-[2560px]:p-8">
            <h3 className="border-b border-[#808080] pb-3 text-lg font-bold min-[2560px]:text-4xl">
              Taggr
            </h3>
            <div className="flex items-center justify-between py-3">
              <p
                onClick={() => {
                  if ((live_user?.taggr_principal.length || 0) > 0) {
                    window?.navigator?.clipboard?.writeText(
                      live_user?.taggr_principal?.[0]?.toString() || "",
                    );
                    toast.info("Copied!");
                  }
                }}
                className="cursor-pointer text-lg font-semibold min-[2560px]:text-4xl"
              >
                {(live_user?.taggr_principal.length || 0) > 0 ? (
                  <span className="flex items-center">
                    {live_user?.taggr_principal?.[0]?.toString()}{" "}
                    <Copy className="ml-1" />
                  </span>
                ) : (
                  "-"
                )}
              </p>
              <button
                className="cursor-pointer text-lg font-normal underline min-[2560px]:text-4xl"
                // disabled={(live_user?.taggr_principal?.length || 0) > 0}
                onClick={() => setIsTaggrModalOpen(true)}
              >
                {(live_user?.taggr_principal?.length || 0) > 0
                  ? "Linked"
                  : "Link"}
              </button>
            </div>
          </div>
          <div className="mb-4 rounded-md border border-[#e6e6e6] bg-[#f3f3f3] p-4 min-[2560px]:mb-6 min-[2560px]:p-8">
            <h3 className="border-b border-[#808080] pb-3 text-lg font-bold min-[2560px]:text-4xl">
              OpenChat
            </h3>
            <div className="flex items-center justify-between py-3">
              <p
                onClick={() => {
                  if ((live_user?.openchat_principal.length || 0) > 0) {
                    window?.navigator?.clipboard?.writeText(
                      live_user?.openchat_principal?.[0]?.toString() || "",
                    );
                    toast.info("Copied!");
                  }
                }}
                className="cursor-pointer text-lg font-semibold min-[2560px]:text-4xl"
              >
                {(live_user?.openchat_principal?.length || 0) > 0 ? (
                  <span className="flex items-center">
                    {walletNameTrimmer(
                      live_user?.openchat_principal?.[0]?.toString(),
                      10,
                      8,
                    )}{" "}
                    <Copy className="ml-1" />
                  </span>
                ) : (
                  "-"
                )}
              </p>
              <button
                className="cursor-pointer text-lg font-normal underline min-[2560px]:text-4xl"
                onClick={() => setIsOpenChatModalOpen(true)}
                // disabled={(live_user?.openchat_principal?.length || 0) > 0}
              >
                {(live_user?.openchat_principal?.length || 0) > 0
                  ? "Linked"
                  : "Link"}
              </button>
            </div>
          </div>
          <div className="mb-4 rounded-md border border-[#e6e6e6] bg-[#f3f3f3] p-4 min-[2560px]:mb-6 min-[2560px]:p-8">
            <h3 className="border-b border-[#808080] pb-3 text-lg font-bold min-[2560px]:text-4xl">
              Wallets
            </h3>
            <div className="flex items-center justify-between py-3">
              <p
                onClick={() => {
                  if (principal) {
                    window?.navigator?.clipboard?.writeText(
                      principal?.toString(),
                    );
                    toast.info("Copied!");
                  }
                }}
                className="cursor-pointer text-lg font-semibold min-[2560px]:text-4xl"
              >
                {principal ? (
                  <span className="flex items-center">
                    {walletNameTrimmer(principal.toString(), 10, 8)}{" "}
                    <Copy className="ml-1" />
                  </span>
                ) : (
                  "-"
                )}
              </p>
              {isConnected && (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    disconnect();
                  }}
                >
                  <div className="cursor-pointer">{"Disconnect"}</div>
                </div>
              )}
            </div>
          </div>
          <div className="rounded-md border border-[#e6e6e6] bg-[#f3f3f3] p-4 min-[2560px]:p-8">
            <div className="flex flex-col items-start gap-4 border-b border-[#808080] pb-3 lg:flex-row lg:items-center lg:justify-between min-[2560px]:pb-6">
              <div className="lg:w-10/12">
                <h3 className="text-lg font-bold min-[2560px]:text-4xl">
                  Token Balances
                </h3>
                <p className="text-sm font-normal min-[2560px]:text-2xl">
                  These tokens can be allocated as bounties for users that
                  engage with your posts. These tokens can be allocated as
                  bounties for campaigns.
                </p>
              </div>
            </div>
            <div className={`w-full overflow-x-auto rounded-lg`}>
              <table className="w-full table-auto text-center">
                <thead className="whitespace-nowrap py-3">
                  <tr>
                    <th className="px-3 py-2 min-[2560px]:py-6 min-[2560px]:text-3xl">
                      Token Name
                    </th>
                    <th className="px-3 py-2 min-[2560px]:py-6 min-[2560px]:text-3xl">
                      Cannister ID
                    </th>
                    <th className="px-3 py-2 min-[2560px]:py-6 min-[2560px]:text-3xl">
                      Token Balance
                    </th>
                    <th className="px-3 py-2 min-[2560px]:py-6 min-[2560px]:text-3xl">
                      Action
                    </th>
                  </tr>
                </thead>
                {!isLoading && (
                  <tbody>
                    {rewardTokens.length > 0 ? (
                      rewardTokens.map((tkn) => {
                        console.log(tkn, "TKD");
                        return (
                          <TokensRow
                            token={tkn}
                            key={tkn.name}
                            name={tkn.name}
                            balance={
                              Number(tkn.balance || 0) /
                              10 ** Number(tkn.decimal || 8)
                            }
                            tokenId={tkn.token.toString()}
                          />
                        );
                      })
                    ) : (
                      <tr aria-colspan={3} className="text-center">
                        <td>No tokens Found</td>
                      </tr>
                    )}
                  </tbody>
                )}
              </table>
            </div>
            {isLoading && (
              <div className="flex w-full items-center justify-center">
                <Loader2 className="animate-spin" />
              </div>
            )}
            <OpenChattModal
              platform={"Openchat"}
              isOpen={isOpenChatModalOpen}
              setIsOpen={setIsOpenChatModalOpen}
              onClose={() => {
                fetchUser();
                setIsOpenChatModalOpen(false);
              }}
              token={""}
            />
            <OpenChattModal
              platform={"Taggr"}
              isOpen={isTaggrModalOpen}
              setIsOpen={setIsTaggrModalOpen}
              onClose={() => {
                fetchUser();
                setIsTaggrModalOpen(false);
              }}
              token={""}
            />
          </div>
        </div>
      </main>
    </AuthLayout>
  );
}
