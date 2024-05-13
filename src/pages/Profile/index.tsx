import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useConnect, ConnectButton, ConnectDialog } from "@connect2ic/react";
import { walletNameTrimmer } from "@/lib/utils";
import { useUserContext } from "@/providers/UserProvider";
import AuthLayout from "@/components/AuthLayout";
import { idlFactory } from "../../declarations/icrc1_ledger_canister";
import { idlFactory as icpIdlFactory } from "../../declarations/icp_ledger_canister";
import React, { useEffect, useMemo, useState } from "react";
import { WhiteListedToken } from "@/declarations/amplify_sc_rust_backend/amplify_sc_rust_backend.did";
import { useBackend, useIcpConnection } from "@/hooks/useCanisters.ts";
import { _SERVICE } from "@/declarations/icrc1_ledger_canister/icrc1_ledger_canister.did";
import { _SERVICE as ICP_SERVICE } from "@/declarations/icp_ledger_canister/icp_ledger_canister.did";
import {
  fetchToken,
  useWhiteListedContext,
} from "@/providers/WhiteListedTokensProvider.tsx";

const TokensRow = ({
  name,
  balance,
  tokenId,
}: {
  name: string;
  tokenId: string;
  balance: number;
}) => {
  return (
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
    </tr>
  );
};

export default function Profile() {
  const navigate = useNavigate();
  const { rewardTokens: tokens } = useWhiteListedContext();
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

  const { user, randomAvatar } = useUserContext();

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
                {`Hi, ${user ? user?.name : "-"}`}
              </h3>
              <p className="text-base font-medium min-[2560px]:text-3xl">
                Twitter and Wallet Connections
              </p>
            </div>
          </div>
          <div className="mb-4 rounded-md border border-[#e6e6e6] bg-[#f3f3f3] p-4 min-[2560px]:mb-6 min-[2560px]:p-8">
            <h3 className="border-b border-[#808080] pb-3 text-lg font-bold min-[2560px]:text-4xl">
              Twitter
            </h3>
            <div className="flex items-center justify-between py-3">
              <p className="text-lg font-semibold min-[2560px]:text-4xl">
                {user ? user.name : "-"}
              </p>
              {user ? (
                <p className="text-lg font-normal min-[2560px]:text-4xl">
                  Linked
                </p>
              ) : (
                <a
                  className="text-lg font-normal underline min-[2560px]:text-4xl"
                  href={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/twitter/redirect/${principal?.toString()}`}
                >
                  Link
                </a>
              )}
            </div>
          </div>
          <div className="mb-4 rounded-md border border-[#e6e6e6] bg-[#f3f3f3] p-4 min-[2560px]:mb-6 min-[2560px]:p-8">
            <h3 className="border-b border-[#808080] pb-3 text-lg font-bold min-[2560px]:text-4xl">
              Wallets
            </h3>
            <div className="flex items-center justify-between py-3">
              <p
                onClick={() =>
                  principal
                    ? window?.navigator?.clipboard?.writeText(
                        principal?.toString(),
                      )
                    : alert("Principal not found")
                }
                className="cursor-pointer text-lg font-semibold min-[2560px]:text-4xl"
              >
                {principal
                  ? walletNameTrimmer(principal.toString(), 10, 8)
                  : "-"}
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
                  </tr>
                </thead>
                {!isLoading && (
                  <tbody>
                    {rewardTokens.length > 0 ? (
                      rewardTokens.map((tkn) => {
                        // const tkn = rewardTokens[tk];
                        return (
                          <TokensRow
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
          </div>
        </div>
      </main>
    </AuthLayout>
  );
}
