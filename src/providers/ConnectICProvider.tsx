import React from "react";
import "@connect2ic/core/style.css";
import { createClient } from "@connect2ic/core";
import {
  canisterId as BACKEND_CANISTER_ID,
  idlFactory as backendIdlFactory,
} from "@/declarations/amplify_sc_rust_backend";
import { canisterId as TOKEN_CANISTER_ID } from "@/declarations/icrc1_ledger_canister";
import {
  canisterId as ICP_CANISTER_ID,
  // idlFactory as icpIdlFactory,
} from "@/declarations/icp_ledger_canister";

import { idlFactory as icpIdlFactory } from "@dfinity/ledger-icp/dist/candid/ledger.idl";

import {
  InfinityWallet,
  StoicWallet,
  PlugWallet,
} from "@connect2ic/core/providers";
import { Connect2ICProvider, ConnectDialog } from "@connect2ic/react";

export const SUPPORTED_TOKENS = [
  {
    name: "test_token",
    canister: TOKEN_CANISTER_ID,
  },
  {
    name: "icp",
    canister: ICP_CANISTER_ID,
  },
  {
    name: "cketh",
    canister: "ss2fx-dyaaa-aaaar-qacoq-cai",
  },
];
const client = createClient({
  providers: [
    new InfinityWallet({ dev: false }),
    // new InternetIdentity(),
    // new NFID(),
    new StoicWallet({ dev: false }),
    new PlugWallet({ dev: false }),
  ],
  globalProviderConfig: {
    dev: false,
  },
  canisters: {
    backend: {
      canisterId: BACKEND_CANISTER_ID,
      idlFactory: backendIdlFactory,
    },
    test_token: {
      canisterId: TOKEN_CANISTER_ID,
      idlFactory: icpIdlFactory,
    },
    cketh: {
      canisterId: "ss2fx-dyaaa-aaaar-qacoq-cai",
      idlFactory: icpIdlFactory,
    },
    icp: {
      canisterId: ICP_CANISTER_ID,
      idlFactory: icpIdlFactory,
    },
  },
});

const ConnectICProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Connect2ICProvider client={client}>
      <>
        {children}
        <ConnectDialog />
      </>
    </Connect2ICProvider>
  );
};

export default ConnectICProvider;
