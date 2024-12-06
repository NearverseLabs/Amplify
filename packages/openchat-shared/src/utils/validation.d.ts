import type { ResourceKey } from "./i18n";
export type ValidationErrorMessages = ResourceKey[];
export declare class ValidationErrors {
    private errors;
    addErrors(key: string, errors: ResourceKey | ResourceKey[]): void;
    has(key: string): boolean;
    get(key: string): ValidationErrorMessages;
    get size(): number;
}
