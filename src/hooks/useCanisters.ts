import { useCanister, useConnect } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { useEffect, useState } from "react";
import { PlugWallet } from "@connect2ic/core/providers";
import { ActorSubclass } from "@dfinity/agent";
import { _SERVICE as BACKEND_CANISTER } from "@/declarations/amplify_sc_rust_backend/amplify_sc_rust_backend.did";
import { _SERVICE as TOKEN_CANISTER } from "@/declarations/icrc1_ledger_canister/icrc1_ledger_canister.did";
import { _SERVICE as ICP_CANISTER } from "@dfinity/ledger-icp/dist/candid/ledger";
import { useUserContext } from "@/providers/UserProvider.tsx";
import { SUPPORTED_TOKENS } from "@/providers/ConnectICProvider.tsx";
import {
  AccountIdentifier,
  LedgerCanister,
  SubAccount,
} from "@dfinity/ledger-icp";
import { canisterId as BACKEND_CANISTER_ID } from "@/declarations/amplify_sc_rust_backend";
import { useNavigate } from "react-router-dom";
export const useBackend = () => {
  return useCustomCanister<BACKEND_CANISTER>("backend");
};
export const useToken = (token_principal?: string) => {
  const internal_name = SUPPORTED_TOKENS.find(
    (t) => t.canister === token_principal,
  );
  if (token_principal && !internal_name) throw Error("Token not found");
  return useCustomCanister<ICP_CANISTER>(internal_name?.name || "test_token");
};

export const useCurrentPrincipal = (): Principal | undefined => {
  const { isConnected, principal, activeProvider } = useConnect();
  const [finalPrincipal, setFinalPrincipal] = useState<Principal | undefined>(
    undefined,
  );
  // useInterval(
  //   () => {
  //     if (activeProvider instanceof PlugWallet) {
  //       setFinalPrincipal(
  //         Principal.fromText(
  //           window.ic.plug.sessionManager.sessionData.principalId,
  //         ),
  //       );
  //       return;
  //     }
  //   },
  //   // activeProvider instanceof PlugWallet ? 3000 : 0,
  //   activeProvider instanceof PlugWallet ? 0 : 0,
  // );

  useEffect(() => {
    if (isConnected && !finalPrincipal) {
      if (principal) {
        setFinalPrincipal(Principal.fromText(principal));
        return;
      }
      if (activeProvider instanceof PlugWallet) {
        setFinalPrincipal(
          Principal.fromText(
            window.ic.plug.sessionManager.sessionData.principalId,
          ),
        );
        return;
      }
    }
    if (!isConnected && finalPrincipal) setFinalPrincipal(undefined);
  }, [activeProvider, principal, finalPrincipal, isConnected]);
  return finalPrincipal;
};

export const useIcpConnection = (props?: {
  onConnect?: ({ provider }: { provider: any }) => void;
  onDisconnect?: () => void;
}) => {
  const { isConnected, activeProvider, isConnecting, connect, disconnect } =
    useConnect(props);
  const { user, setUser, principal } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id && principal) {
      if (principal?.toText() !== user.id) {
        disconnect();
        localStorage.removeItem("wallet_connected");
        navigate("/login");
      }
    }
  }, [principal, user]);

  return {
    principal,
    isConnected,
    activeProvider,
    isConnecting,
    connect,
    user,
    setUser,
    disconnect,
  };
};

export const useCustomCanister: <T>(
  canisterName: string,
  options?: { mode: string },
) => readonly [
  ActorSubclass<T>,
  { canisterDefinition: any; error: any; loading: boolean },
] = <T>(
  canisterName: string,
  options: { mode: string } = {
    mode: "connected", // "anonymous" | "connected"
  },
) => {
  return useCanister<T>(canisterName, options) as [
    ActorSubclass<T>,
    { canisterDefinition: any; error: any; loading: boolean },
  ];
};

export const useICP = () => {
  return useCustomCanister<ICP_CANISTER>("icp");
};

export const transferICP = () => {
  const [icp] = useICP();
  const [backend] = useBackend();
  const { activeProvider } = useConnect();

  const transfer = async ({ amount }: { amount: bigint }) => {
    if (amount <= 0n) return true;
    if (icp && backend) {
      const depositAddress = await backend.getDepositAddress();
      const fee = await icp.transfer_fee({});
      const transfer = await icp.transfer({
        amount: {
          e8s: amount + fee.transfer_fee.e8s,
        },
        created_at_time: [],
        fee: fee.transfer_fee,
        from_subaccount: [],
        memo: 0n,
        to: AccountIdentifier.fromHex(depositAddress).toNumbers(),
      });
      if ("Ok" in transfer && transfer.Ok) {
        return true;
      }
    }
    return false;
  };

  return [transfer];
};

export const transferIcrc1Tokens = (token_principal?: string) => {
  const [token] = useToken(token_principal);
  const [backend] = useBackend();

  const transfer = async ({
    amount,
    caller,
  }: {
    amount: bigint;
    caller: Principal;
  }) => {
    if (amount <= 0n) return true;
    if (token && backend) {
      const depositAddress = await backend.getDepositAddress();
      const fee = await token.icrc1_fee();
      const transfer = await token.icrc1_transfer({
        amount: amount,
        created_at_time: [],
        fee: [fee],
        from_subaccount: [],
        memo: [],
        to: {
          owner: Principal.fromText(BACKEND_CANISTER_ID),
          subaccount: [SubAccount.fromPrincipal(caller).toUint8Array()],
        },
      });
      if ("Ok" in transfer && transfer.Ok) {
        return true;
      }
    }
    return false;
  };

  return [transfer];
};
