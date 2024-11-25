import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { RewardToken, useRewardToken } from "@/hooks/useRewardToken.ts";
import { createActor } from "@/declarations/icp_ledger_canister";
import {
  canisterId as BACKEND_CANISTER_ID,
  createActor as createBackendActor,
} from "@/declarations/amplify_sc_rust_backend";
import { useIcpConnection } from "@/hooks/useCanisters.ts";
import { Principal } from "@dfinity/principal";
import { useTimeout } from "usehooks-ts";
import { WhiteListedToken } from "@/declarations/amplify_sc_rust_backend/amplify_sc_rust_backend.did";
import { AccountIdentifier, Tokens } from "@dfinity/ledger-icp";
import { TransferFee } from "@/declarations/icp_ledger_canister/icp_ledger_canister.did";

async function tryAndRespond<T>(inputFunction?: any): Promise<T | undefined> {
  try {
    console.log("resolve inputFunction", inputFunction);
    return inputFunction !== undefined ? await inputFunction : undefined;
  } catch (error) {
    console.error("resolve ERROR", error);
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const fetchToken = async (
  token: WhiteListedToken,
  principal?: Principal,
): Promise<
  Omit<RewardToken, "token" | "min_reward" | "token_type"> | undefined
> => {
  const actor = createActor(token.token.toString(), {
    agentOptions: {
      host: window.location.origin,
    },
  });
  const name = actor.icrc1_name();
  const decimal = actor.icrc1_decimals();
  const symbol = actor.icrc1_symbol();
  let fetchBalance = undefined;
  let fetchFee = undefined;
  let fetchAllowance = undefined;
  if (principal) {
    if (token.token_type === "icp") {
      fetchBalance = actor.account_balance({
        account: AccountIdentifier.fromPrincipal({ principal }).toNumbers(),
      });
      fetchFee = actor.transfer_fee({});
    } else {
      console.log("resolve token.token_type", token.token_type);
      fetchFee = actor.icrc1_fee();

      fetchBalance = actor.icrc1_balance_of({
        owner: principal,
        subaccount: [],
      });
      fetchAllowance = actor.icrc2_allowance({
        account: {
          owner: principal,
          subaccount: [],
        },
        spender: {
          owner: Principal.fromText(BACKEND_CANISTER_ID),
          subaccount: [],
        },
      });
    }
  }
  let rewardToken:
    | Omit<RewardToken, "token" | "min_reward" | "token_type">
    | undefined;
  try {
    const [
      resolvedName,
      resolvedDecimal,
      resolvedSymbol,
      balance,
      fee,
      allowance,
    ] = await Promise.all([
      tryAndRespond<string>(name),
      tryAndRespond<number>(decimal),
      tryAndRespond<string>(symbol),
      tryAndRespond<Tokens | bigint | undefined>(fetchBalance),
      tryAndRespond<TransferFee | bigint | undefined>(fetchFee),
      tryAndRespond<RewardToken["allowance"]>(fetchAllowance),
    ]);
    let finalBalance;
    let finalFee;
    if (balance && (balance as unknown as Tokens)?.e8s !== undefined) {
      finalBalance = (balance as unknown as Tokens).e8s;
    } else {
      finalBalance = balance as bigint;
    }
    if (
      fee &&
      (fee as unknown as TransferFee)?.transfer_fee?.e8s !== undefined
    ) {
      finalFee = (fee as unknown as TransferFee).transfer_fee.e8s;
    } else {
      finalFee = fee as bigint;
    }
    console.log(
      "resolved",
      resolvedName,
      resolvedDecimal,
      resolvedSymbol,
      balance,
      allowance,
    );
    rewardToken = {
      name: resolvedName || "ICP",
      decimal: resolvedDecimal || 8,
      symbol: resolvedSymbol || "ICP",
      balance: finalBalance,
      allowance: allowance,
      fee: finalFee,
    };
  } catch (e) {
    console.log("WTF", e);
  }
  return rewardToken;
};

const WhiteListedTokensContext = createContext<{
  rewardTokens: Record<string, RewardToken> | undefined;
  isLoading: boolean;
}>({ rewardTokens: undefined, isLoading: true });

export const useWhiteListedContext = () => {
  const context = useContext(WhiteListedTokensContext);
  if (context === undefined) {
    throw new Error(
      "useWhiteListedContext must be used within a WhiteListedTokensProvider",
    );
  }
  return context;
};
export const WhiteListedTokensProvider: React.FC<{ children: any }> = ({
  children,
}) => {
  const { addRewardToken, rewardTokens } = useRewardToken();
  const { principal } = useIcpConnection();
  const [isLoading, setIsLoading] = useState(true);
  const fetchTokens = useCallback(async () => {
    try {
      setIsLoading(true);
      const actor = createBackendActor(BACKEND_CANISTER_ID, {
        // agentOptions: {
        //   host: window.location.origin,
        // },
      });
      const tokens = await actor.get_whitelisted_tokens();
      for (const token of tokens) {
        await sleep(5000);
        const finalToken = await fetchToken(token, principal);
        if (finalToken) {
          addRewardToken(token.token.toString(), {
            ...token,
            ...finalToken,
          });
        }
      }
    } catch (e) {
      /* empty */
    }
    setIsLoading(false);
  }, [principal, addRewardToken]);

  useEffect(() => {
    fetchTokens();
  }, [principal]);

  useTimeout(fetchTokens, 60000);

  return (
    <>
      <WhiteListedTokensContext.Provider value={{ rewardTokens, isLoading }}>
        {children}
      </WhiteListedTokensContext.Provider>
    </>
  );
};

function async<T>(inputFunction: any, arg1: () => any) {
  throw new Error("Function not implemented.");
}
