import { type DBSchema, type IDBPDatabase } from "idb";
import type { RegistryValue } from "openchat-shared";
export type RegistryDatabase = Promise<IDBPDatabase<RegistrySchema>>;
export interface RegistrySchema extends DBSchema {
    registry: {
        key: string;
        value: RegistryValue;
    };
}
export declare function lazyOpenRegistryCache(): RegistryDatabase;
export declare function getCachedRegistry(): Promise<RegistryValue | undefined>;
export declare function setCachedRegistry(value: RegistryValue): Promise<void>;
