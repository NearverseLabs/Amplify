import { Ed25519KeyIdentity, Secp256k1KeyIdentity } from "@dfinity/identity";

// Minter identity which holds the ICP and initial tokens on the local network
//
// This key is not a secret. Only use it for testing! It is from:
// https://internetcomputer.org/docs/current/references/cli-reference/dfx-nns/#example-accessing-icp-on-the-command-line
const minterPrivateKey = Buffer.from(
    "YOUR_KEYS",
    "base64",
);
export const minter = Ed25519KeyIdentity.fromSecretKey(minterPrivateKey);
//
const deployerPrivateKey = Buffer.from(
    "YOUR_KEYS",
    "base64",
);
export const deployer = Ed25519KeyIdentity.fromSecretKey(deployerPrivateKey);
export const alice = Ed25519KeyIdentity.fromParsedJson(['YOUR_KEYS','YOUR_KEYS']);
export const jack = Ed25519KeyIdentity.fromParsedJson(['YOUR_KEYS','YOUR_KEYS']);

// Randomly generate a new test account each run so there are no collisions,
// and our tests are forced to be robust.
export function newIdentity(): Ed25519KeyIdentity {
    return Ed25519KeyIdentity.generate();
}