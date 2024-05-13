import { Principal } from "@dfinity/principal";
import {beforeAll, beforeEach, describe, expect, test} from "@jest/globals";
import fetch from "isomorphic-fetch";
import {canisterId as BACKEND_CANISTER_ID, idlFactory as backendIdlFactory} from "../src/declarations/amplify_sc_rust_backend";
import {canisterId as TOKEN_CANISTER_ID, idlFactory as tokenIdlFactory} from "../src/declarations/icrc1_ledger_canister";
import {canisterId as ICP_CANISTER_ID, idlFactory as icpIdlFactory} from "../src/declarations/icp_ledger_canister";
import {Actor, ActorSubclass, HttpAgent, Identity} from "@dfinity/agent";
import {IDL} from "@dfinity/candid";
import {CreateActorOptions} from "../src/declarations/icp_ledger_canister";
import {_SERVICE as BackendService} from "../src/declarations/amplify_sc_rust_backend/amplify_sc_rust_backend.did";
import {_SERVICE as TokenService} from "../src/declarations/icrc1_ledger_canister/icrc1_ledger_canister.did";
import {alice, deployer, jack, minter, newIdentity} from "./identity";
// import {deployer, minter} from "./identity";
import { createAgent as createIcpAgent } from "@dfinity/utils";
import {AccountIdentifier, LedgerCanister} from "@dfinity/ledger-icp";
import {Problem} from "webpack-cli";


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
        host: `http://127.0.0.1:8000`,
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


export function backend(identity?: Identity) {
    return createActor<BackendService>(BACKEND_CANISTER_ID, backendIdlFactory, {
        agent: agent(identity),
    });
}
export function token(identity?: Identity) {
    return createActor<TokenService>(TOKEN_CANISTER_ID, tokenIdlFactory, {
        agent: agent(identity),
    });
}

export async function icp(identity?: Identity) {
    const agent = await createIcpAgent({
        identity,
        host: `http://127.0.0.1:8000`,
        fetchRootKey: true
    });

    return LedgerCanister.create({
        agent,
        canisterId: Principal.fromText(ICP_CANISTER_ID),
    });
    //
    // return createActor<IcpService>(ICP_CANISTER_ID, icpIdlFactory, {
    //     agent: agent(identity),
    // });
}

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
export async function fundIcpIdentity(
    token: LedgerCanister,
    to: AccountIdentifier,
    amount: bigint,
) {
    const result = await token.transfer({
        to: to,
        fee: 10000n,
        memo: 0n,
        amount: amount,
    });
    expect(result).toBeGreaterThanOrEqual(1n);
}
export async function registerUsers(
    addresses: Principal[]
) {
    for (const address of addresses) {
        const jack_register_result = await backend(minter).register_user({
            twitter_username: address.toText(),
            name: address.toText(),
            id: address
        })
        expect(jack_register_result.hasOwnProperty('Err')).toEqual(false)
    }
}

const defaultTimeout = 10*1000
describe("backend", () => {
    beforeEach(async () => {
        // await backend(deployer).clear()
    }, defaultTimeout)
    describe("public", () => {
        beforeEach(async () => {
            // await backend(deployer).clear()
        }, defaultTimeout)
        test("fetch settings", async () => {
            const settings = await backend().get_settings()
            expect(settings.max_winners).toEqual(0n)
        })
        test("fetch whitelisted tokens", async () => {
            let settings = await backend().get_whitelisted_tokens()
            expect(settings.length).toEqual(0)
        })
        test("can create campaign", async () => {
            const decimals = await token().icrc1_decimals()
            const fee = await token().icrc1_fee()
            console.log('alice', alice.getPrincipal().toText())
            await backend(deployer).update_platform_fees(500_000_000n)
            const depositAddress = await backend(alice).getDepositAddress()
            await fundIdentity(token(minter), alice, 500_000_000n + fee);
            await fundIcpIdentity(await icp(minter), AccountIdentifier.fromPrincipal({principal: alice.getPrincipal()}), 500_000_000n + fee);
            await fundIcpIdentity(await icp(alice), AccountIdentifier.fromHex(depositAddress), 500_000_000n + fee);
            const approvalA = await token(alice).icrc2_approve({
                amount: 500_000_000n + fee + (fee*5n),
                created_at_time: [],
                expected_allowance: [],
                expires_at: [],
                fee: [],
                from_subaccount: [],
                memo: [],
                spender: {
                    owner: Principal.fromText(BACKEND_CANISTER_ID),
                    subaccount: []
                }
            })
            expect(approvalA).toHaveProperty("Ok");

            // await fundIcpIdentity(icp(minter), alice, 500_000_000n);
            let alice_balance = await token(alice).icrc1_balance_of({
                owner: alice.getPrincipal(),
                subaccount: []
            })
            let alice_allowance = await token(alice).icrc2_allowance({
                account: {
                    owner: alice.getPrincipal(), subaccount: []
                },
                spender: {
                    owner: Principal.fromText(BACKEND_CANISTER_ID), subaccount: []
                }
            })
            await backend(deployer).whitelist_token(Principal.fromText(TOKEN_CANISTER_ID), 0n, 'icrc2')
            expect(alice_balance).toBeGreaterThanOrEqual(500_000_000n + fee)
            expect(alice_allowance.allowance).toBeGreaterThanOrEqual(500_000_000n + fee)
            console.log('Allowance', alice_allowance.allowance)
            let result = await backend(deployer).create_campaign({
                project_name: `Demo ${+new Date}`,
                requirements: {
                    retweet: true,
                    quote_retweet: true,
                    follow: true,
                    like: true,
                    tweet_reply: true
                },
                reward_token: Principal.fromText(TOKEN_CANISTER_ID),
                user_id: alice.getPrincipal(),
                winners: 5n,
                reward: {
                    'e8s': 100_000_000n
                },
                tweet_id: "123",
                ends_at: BigInt(+new Date + 100000) * 1_000_000n,
                starts_at: 0n
            })
            console.log('result', result)
            expect(result.hasOwnProperty('Err')).toEqual(false)
            if('Ok' in result) {
                let deposit_tokens = await backend(alice).deposit_campaign(result.Ok)
                console.log('deposit_tokens', deposit_tokens)
                expect(deposit_tokens.hasOwnProperty('Err')).toEqual(false)
            }
            let backend_balance = await token(alice).icrc1_balance_of({
                owner: Principal.fromText(BACKEND_CANISTER_ID),
                subaccount: []
            })
            console.log('backend_balance', backend_balance)
            expect(backend_balance).toBeGreaterThan(0n)

            if('Ok' in result) {
                const jack_register_result = await backend(minter).register_user({
                    twitter_username: 'jack',
                    name: 'Jack',
                    id: jack.getPrincipal()
                })
                expect(jack_register_result.hasOwnProperty('Err')).toEqual(false)
                const jack_result = await backend(jack).participate_in_campaign(result.Ok)
                console.log('jack_result', jack_result)
                expect(jack_result.hasOwnProperty('Err')).toEqual(false)
                const submit_result = await backend(minter).submit_participants(result.Ok, [
                    jack.getPrincipal()
                ])
                console.log('submit_result', submit_result)
                expect(submit_result.hasOwnProperty('Err')).toEqual(false)
                await new Promise(r => setTimeout(r, 120000));
                const select_winners_result = await backend(minter).select_winners(result.Ok)
                console.log('select_winners_result', select_winners_result)
                expect(select_winners_result.hasOwnProperty('Err')).toEqual(false)
                const won =  await backend(jack).am_i_a_winner(result.Ok)
                expect(won).toEqual(true)
                const claimed =  await backend(jack).claimReward(result.Ok)
                expect(claimed.hasOwnProperty('Err')).toEqual(false)
            }
        }, 180*1000)

        test("can paginate search campaigns", async () => {
            let result = await backend(alice).paginate_campaigns({
                page_number: 1n, page_size: 10n
            }, {
                my_claimed_campaigns: [],
                my_created_campaigns: [],
                my_participated_campaigns: [],
                my_unclaimed_campaigns: [],
                project_name: ["Demo"],
                reward_token: [],
                to_be_verified: [],
                status: []
            });
            console.log('search', result)
            // expect(result.length).toBeGreaterThanOrEqual(1)
            result = await backend(alice).paginate_campaigns({
                page_number: 1n, page_size: 10n
            }, {
                my_claimed_campaigns: [],
                my_created_campaigns: [],
                my_participated_campaigns: [],
                my_unclaimed_campaigns: [],
                project_name: ["Work"],
                reward_token: [],
                to_be_verified: [],
                status: []
            });
            expect(result.length).toEqual(0)
        })
    });
    describe("select winner", () => {
        test("can select max winners", async () => {
            const decimals = await token().icrc1_decimals()
            const fee = await token().icrc1_fee()
            console.log('alice', alice.getPrincipal().toText())
            await backend(deployer).update_platform_fees(500_000_000n)
            const depositAddress = await backend(alice).getDepositAddress()
            await fundIdentity(token(minter), alice, 500_000_000n + fee);
            await fundIcpIdentity(await icp(minter), AccountIdentifier.fromPrincipal({principal: alice.getPrincipal()}), 500_000_000n + fee);
            await fundIcpIdentity(await icp(alice), AccountIdentifier.fromHex(depositAddress), 500_000_000n + fee);
            const approvalA = await token(alice).icrc2_approve({
                amount: 500_000_000n + fee + (fee*5n),
                created_at_time: [],
                expected_allowance: [],
                expires_at: [],
                fee: [],
                from_subaccount: [],
                memo: [],
                spender: {
                    owner: Principal.fromText(BACKEND_CANISTER_ID),
                    subaccount: []
                }
            })
            expect(approvalA).toHaveProperty("Ok");

            // await fundIcpIdentity(icp(minter), alice, 500_000_000n);
            let alice_balance = await token(alice).icrc1_balance_of({
                owner: alice.getPrincipal(),
                subaccount: []
            })
            let alice_allowance = await token(alice).icrc2_allowance({
                account: {
                    owner: alice.getPrincipal(), subaccount: []
                },
                spender: {
                    owner: Principal.fromText(BACKEND_CANISTER_ID), subaccount: []
                }
            })
            await backend(deployer).whitelist_token(Principal.fromText(TOKEN_CANISTER_ID), 0n, 'icrc2')
            expect(alice_balance).toBeGreaterThanOrEqual(500_000_000n + fee)
            expect(alice_allowance.allowance).toBeGreaterThanOrEqual(500_000_000n + fee)
            console.log('Allowance', alice_allowance.allowance)
            let result = await backend(deployer).create_campaign({
                project_name: `Demo ${+new Date}`,
                requirements: {
                    retweet: true,
                    quote_retweet: true,
                    follow: true,
                    like: true,
                    tweet_reply: true
                },
                reward_token: Principal.fromText(TOKEN_CANISTER_ID),
                user_id: alice.getPrincipal(),
                winners: 3n,
                reward: {
                    'e8s': 100_000_000n
                },
                tweet_id: "123",
                ends_at: BigInt(+new Date + 100000) * 1_000_000n,
                starts_at: 0n
            })
            expect(result.hasOwnProperty('Err')).toEqual(false)
            if('Ok' in result) {
                let deposit_tokens = await backend(alice).deposit_campaign(result.Ok)
                console.log('deposit_tokens', deposit_tokens)
                expect(deposit_tokens.hasOwnProperty('Err')).toEqual(false)
            }
            let backend_balance = await token(alice).icrc1_balance_of({
                owner: Principal.fromText(BACKEND_CANISTER_ID),
                subaccount: []
            })
            console.log('backend_balance', backend_balance)
            expect(backend_balance).toBeGreaterThan(0n)

            if('Ok' in result) {
                const p1 = newIdentity()
                const p2 = newIdentity()
                const p3 = newIdentity()
                const p4 = newIdentity()
                const p5 = newIdentity()
                const participants = [p1, p2, p3, p4, p5];
                await registerUsers(participants.map(p => p.getPrincipal()))
                // for (const participant of participants) {
                //     const jack_result = await backend(participant).participate_in_campaign(result.Ok)
                //     expect(jack_result.hasOwnProperty('Err')).toEqual(false)
                // }
                const submit_result = await backend(minter).submit_participants(result.Ok, participants.map(p => p.getPrincipal()))
                console.log('submit_result', submit_result)
                expect(submit_result.hasOwnProperty('Err')).toEqual(false)
                await new Promise(r => setTimeout(r, 120000));
                const select_winners_result = await backend(minter).select_winners(result.Ok)
                console.log('select_winners_result', select_winners_result)
                expect(select_winners_result.hasOwnProperty('Err')).toEqual(false)
                const total_winners_result = await backend(minter).paginate_winners(result.Ok, {
                    page_number: 1n, page_size: 1000n
                })
                console.log('total_winners_result', JSON.stringify(total_winners_result))
                // const won =  await backend(jack).am_i_a_winner(result.Ok)
                // expect(won).toEqual(true)
                // const claimed =  await backend(jack).claimReward(result.Ok)
                // expect(claimed.hasOwnProperty('Err')).toEqual(false)
            }
        }, 180*1000)
        test("can select multiple winners", async () => {
            const decimals = await token().icrc1_decimals()
            const fee = await token().icrc1_fee()
            console.log('alice', alice.getPrincipal().toText())
            await backend(deployer).update_platform_fees(500_000_000n)
            const depositAddress = await backend(alice).getDepositAddress()
            await fundIdentity(token(minter), alice, 500_000_000n + fee);
            await fundIcpIdentity(await icp(minter), AccountIdentifier.fromPrincipal({principal: alice.getPrincipal()}), 500_000_000n + fee);
            await fundIcpIdentity(await icp(alice), AccountIdentifier.fromHex(depositAddress), 500_000_000n + fee);
            const approvalA = await token(alice).icrc2_approve({
                amount: 500_000_000n + fee + (fee*5n),
                created_at_time: [],
                expected_allowance: [],
                expires_at: [],
                fee: [],
                from_subaccount: [],
                memo: [],
                spender: {
                    owner: Principal.fromText(BACKEND_CANISTER_ID),
                    subaccount: []
                }
            })
            expect(approvalA).toHaveProperty("Ok");

            // await fundIcpIdentity(icp(minter), alice, 500_000_000n);
            let alice_balance = await token(alice).icrc1_balance_of({
                owner: alice.getPrincipal(),
                subaccount: []
            })
            let alice_allowance = await token(alice).icrc2_allowance({
                account: {
                    owner: alice.getPrincipal(), subaccount: []
                },
                spender: {
                    owner: Principal.fromText(BACKEND_CANISTER_ID), subaccount: []
                }
            })
            await backend(deployer).whitelist_token(Principal.fromText(TOKEN_CANISTER_ID), 0n, 'icrc2')
            expect(alice_balance).toBeGreaterThanOrEqual(500_000_000n + fee)
            expect(alice_allowance.allowance).toBeGreaterThanOrEqual(500_000_000n + fee)
            console.log('Allowance', alice_allowance.allowance)
            let result = await backend(deployer).create_campaign({
                project_name: `Demo ${+new Date}`,
                requirements: {
                    retweet: true,
                    quote_retweet: true,
                    follow: true,
                    like: true,
                    tweet_reply: true
                },
                reward_token: Principal.fromText(TOKEN_CANISTER_ID),
                user_id: alice.getPrincipal(),
                winners: 4n,
                reward: {
                    'e8s': 100_000_000n
                },
                tweet_id: "123",
                ends_at: BigInt(+new Date + 100000) * 1_000_000n,
                starts_at: 0n
            })
            expect(result.hasOwnProperty('Err')).toEqual(false)
            if('Ok' in result) {
                let deposit_tokens = await backend(alice).deposit_campaign(result.Ok)
                console.log('deposit_tokens', deposit_tokens)
                expect(deposit_tokens.hasOwnProperty('Err')).toEqual(false)
            }
            let backend_balance = await token(alice).icrc1_balance_of({
                owner: Principal.fromText(BACKEND_CANISTER_ID),
                subaccount: []
            })
            console.log('backend_balance', backend_balance)
            expect(backend_balance).toBeGreaterThan(0n)

            if('Ok' in result) {
                const p1 = newIdentity()
                const p2 = newIdentity()
                const p3 = newIdentity()
                const p4 = newIdentity()
                const p5 = newIdentity()
                const participants = [p1, p2, p3, p4, p5];
                await registerUsers(participants.map(p => p.getPrincipal()))
                // for (const participant of participants) {
                //     const jack_result = await backend(participant).participate_in_campaign(result.Ok)
                //     expect(jack_result.hasOwnProperty('Err')).toEqual(false)
                // }
                const submit_result = await backend(minter).submit_participants(result.Ok, participants.map(p => p.getPrincipal()))
                console.log('submit_result', submit_result)
                expect(submit_result.hasOwnProperty('Err')).toEqual(false)
                await new Promise(r => setTimeout(r, 120000));
                const select_winners_result = await backend(minter).select_winners(result.Ok)
                console.log('select_winners_result', select_winners_result)
                expect(select_winners_result.hasOwnProperty('Err')).toEqual(false)
                const total_winners_result = await backend(minter).paginate_winners(result.Ok, {
                    page_number: 1n, page_size: 1000n
                })
                console.log('total_winners_result', JSON.stringify(total_winners_result))
                // const won =  await backend(jack).am_i_a_winner(result.Ok)
                // expect(won).toEqual(true)
                // const claimed =  await backend(jack).claimReward(result.Ok)
                // expect(claimed.hasOwnProperty('Err')).toEqual(false)
            }
        }, 180*1000)
    });
    describe("admin options", () => {
        test("owner can change settings", async () => {
            await backend(deployer).update_max_winners(1n)
            const settings = await backend().get_settings()
            expect(settings.max_winners).toEqual(1n)
            await backend(deployer).update_max_winners(0n)
        }, defaultTimeout)
        test("can whitelist tokens", async () => {
            let settings = await backend().get_whitelisted_tokens()
            await backend(deployer).whitelist_token(Principal.fromText(process.env.CANISTER_ID_ICRC1_LEDGER_CANISTER), 0n, 'icrc2')
            settings = await backend().get_whitelisted_tokens()
            console.log('tokens', settings.map(p => p.toString()))
            expect(settings.map(p => p.token.toString()).includes(process.env.CANISTER_ID_ICRC1_LEDGER_CANISTER)).toEqual(true)
            await backend(deployer).unwhitelist_token(Principal.fromText(process.env.CANISTER_ID_ICRC1_LEDGER_CANISTER))
        }, defaultTimeout)
    });
});