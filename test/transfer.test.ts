import { Principal } from "@dfinity/principal";
import {beforeAll, beforeEach, describe, expect, test} from "@jest/globals";
import fetch from "isomorphic-fetch";
import {canisterId as TOKEN_CANISTER_ID, idlFactory as tokenIdlFactory} from "../src/declarations/icrc1_ledger_canister";
import {Actor, ActorSubclass, HttpAgent, Identity} from "@dfinity/agent";
import {IDL} from "@dfinity/candid";
import {CreateActorOptions} from "../src/declarations/icp_ledger_canister";
import {_SERVICE as TokenService} from "../src/declarations/icrc1_ledger_canister/icrc1_ledger_canister.did";
import {_SERVICE as IcpService} from "../src/declarations/icp_ledger_canister/icp_ledger_canister.did";
import {alice, deployer, minter, newIdentity} from "./identity";
// import {deployer, minter} from "./identity";


export function createActor<T>(
    canisterId: string | Principal,
    idlFactory: IDL.InterfaceFactory,
    options: CreateActorOptions = {},
): ActorSubclass<T> {
    const agent = options.agent || new HttpAgent({ ...options.agentOptions });

    if (options.agent && options.agentOptions) {
        console.warn(
            "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.",
        );
    }

    // Creates an actor with using the candid interface and the HttpAgent
    return Actor.createActor(idlFactory, {
        agent,
        canisterId,
        ...options.actorOptions,
    });
}

export function agent(identity?: Identity) {
    const a = new HttpAgent({
        identity,
        host: `http://13.49.84.77:35615`,
        fetch,
    });

    // Fetch root key for certificate validation during development
    if (process.env.DFX_NETWORK !== "ic") {
        a.fetchRootKey().catch((err: any) => {
            console.warn(
                "Unable to fetch root key. Check to ensure that your local replica is running",
            );
            console.error(err);
        });
    }

    return a;
}


// export function backend(identity?: Identity) {
//     return createActor<BackendService>(BACKEND_CANISTER_ID, backendIdlFactory, {
//         agent: agent(identity),
//     });
// }
export function token(identity?: Identity) {
    return createActor<TokenService>('bkyz2-fmaaa-aaaaa-qaaaq-cai', tokenIdlFactory, {
        agent: agent(identity),
    });
}

// export function icp(identity?: Identity) {
//     return createActor<IcpService>(ICP_CANISTER_ID, icpIdlFactory, {
//         agent: agent(identity),
//     });
// }

export async function fundIdentity(
    token: ActorSubclass<TokenService>,
    to: Identity,
    amount: bigint,
) {
    const result = await token.icrc1_transfer({
        to: { owner: to.getPrincipal(), subaccount: [] },
        fee: [],
        memo: [],
        from_subaccount: [],
        created_at_time: [],
        amount,
    });
    expect(result).toHaveProperty("Ok");
}
export async function fundPrincipalIdentity(
    token: ActorSubclass<TokenService>,
    to: Principal,
    amount: bigint,
) {
    const result = await token.icrc1_transfer({
        to: { owner: to, subaccount: [] },
        fee: [],
        memo: [],
        from_subaccount: [],
        created_at_time: [],
        amount,
    });
    expect(result).toHaveProperty("Ok");
}
export async function fundIcpIdentity(
    token: ActorSubclass<IcpService>,
    to: Identity,
    amount: bigint,
) {
    const result = await token.transfer({
        to: to.getPrincipal().toUint8Array(),
        fee: {
            e8s: 10000n
        },
        memo: 0n,
        from_subaccount: [],
        created_at_time: [],
        amount: {
            e8s: amount
        },
    });
    expect(result).toHaveProperty("Ok");
}

const defaultTimeout = 10*1000
describe("icrc", () => {
    beforeEach(async () => {
        // await backend(deployer).clear()
    }, defaultTimeout)
    describe("public", () => {
        beforeEach(async () => {
            // await backend(deployer).clear()
        }, defaultTimeout)
        test("fetch settings", async () => {
            await fundPrincipalIdentity(token(minter), Principal.fromText("yptzn-5el66-3jaa3-wheyb-sgobg-lbcnx-t534t-ufc6z-qx7l3-hpq4o-aqe"), 50000_000_000n);
        })
    });
});