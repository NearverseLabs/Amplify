import {Principal} from "@dfinity/principal";
import {IDL} from "@dfinity/candid";
import {Actor, ActorSubclass, HttpAgent, Identity} from "@dfinity/agent";
import {_SERVICE as BackendService} from "../../declarations/amplify_sc_rust_backend/amplify_sc_rust_backend.did.d";
import {
  idlFactory as backendIdlFactory, CreateActorOptions
} from "../../declarations/amplify_sc_rust_backend/index";
import {Ed25519KeyIdentity} from "@dfinity/identity";
import fetch from 'isomorphic-fetch';

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

export function agent(identity?: Identity, host?: string) {
  const a = new HttpAgent({
    identity,
    host: host || `http://127.0.0.1:8000`,
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


export function backend(canisterId: string, identity?: Identity,  host?: string) {
  return createActor<BackendService>(canisterId, backendIdlFactory, {
    agent: agent(identity, host),
  });
}

export const alice = Ed25519KeyIdentity.fromParsedJson(['302a300506032b657003210094ce46635ec509bb5bdbfe44ad439491cadc1147d0a4bf278e6df40fa8b2c008','e406d2f0f81083615b599fa59a2ff400c740ec0f16b589fe1ea35ee244536f1694ce46635ec509bb5bdbfe44ad439491cadc1147d0a4bf278e6df40fa8b2c008']);
