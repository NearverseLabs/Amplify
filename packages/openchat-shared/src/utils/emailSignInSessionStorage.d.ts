import type { AuthClientStorage } from "@dfinity/auth-client";
import { ECDSAKeyIdentity } from "@dfinity/identity";
export type EmailSignInSession = EmailSignInContext & {
    key: ECDSAKeyIdentity;
};
export type EmailSignInContext = {
    email: string;
    userKey: Uint8Array;
    expiration: bigint;
};
export declare function storeEmailSignInSession(storage: AuthClientStorage, session: EmailSignInSession): Promise<void>;
export declare function getEmailSignInSession(storage: AuthClientStorage): Promise<EmailSignInSession | undefined>;
export declare function removeEmailSignInSession(storage: AuthClientStorage): Promise<void>;
