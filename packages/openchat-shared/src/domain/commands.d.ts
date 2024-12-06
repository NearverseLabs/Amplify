import type { MessageContext } from "./chat";
import type { ChatPermissions, CommunityPermissions, MessagePermission } from "./permission";
import type { InterpolationValues, ResourceKey } from "../utils";
import { ValidationErrors } from "../utils/validation";
export declare const MIN_NAME_LENGTH = 3;
export type SlashCommandParamType = UserParam | BooleanParam | StringParam | NumberParam;
export type CommandParam = {
    name: string;
    description?: string;
    placeholder?: string;
    required: boolean;
};
export type UserParam = {
    kind: "user";
};
export type BooleanParam = {
    kind: "boolean";
};
export type StringParam = {
    kind: "string";
    minLength: number;
    maxLength: number;
    choices: SlashCommandOptionChoice<string>[];
};
export type NumberParam = {
    kind: "number";
    minValue: number;
    maxValue: number;
    choices: SlashCommandOptionChoice<number>[];
};
export type SlashCommandOptionChoice<T> = {
    name: string;
    value: T;
};
export type SlashCommandParam = CommandParam & SlashCommandParamType;
export declare function defaultBooleanParam(param?: SlashCommandParam): SlashCommandParam;
export declare function defaultStringParam(param?: SlashCommandParam): SlashCommandParam;
export declare function defaultNumberParam(param?: SlashCommandParam): SlashCommandParam;
export declare function defaultUserParam(param?: SlashCommandParam): SlashCommandParam;
export declare function emptySlashCommand(): SlashCommandSchema;
export type SlashCommandSchema = {
    name: string;
    description?: string;
    params: SlashCommandParam[];
    permissions: SlashCommandPermissions;
    devmode?: boolean;
};
export declare function emptyPermissions(): SlashCommandPermissions;
export type SlashCommandPermissions = {
    chatPermissions: (keyof ChatPermissions)[];
    communityPermissions: (keyof CommunityPermissions)[];
    messagePermissions: MessagePermission[];
    threadPermissions: MessagePermission[];
};
export type SlashCommandInstance = {
    name: string;
    messageContext: MessageContext;
    params: SlashCommandParamInstance[];
};
export type Bot = ExternalBot | InternalBot;
export declare function emptyBotInstance(bot?: ExternalBot): ExternalBot;
export type ExternalBot = {
    kind: "external_bot";
    name: string;
    avatar?: string;
    id: string;
    endpoint: string;
    description?: string;
    commands: SlashCommandSchema[];
};
export type InternalBot = {
    kind: "internal_bot";
    name: string;
    description?: string;
    commands: SlashCommandSchema[];
};
export type BotCommandInstance = ExternalBotCommandInstance | InternalBotCommandInstance;
export type ExternalBotCommandInstance = {
    kind: "external_bot";
    id: string;
    endpoint: string;
    command: SlashCommandInstance;
};
export type InternalBotCommandInstance = {
    kind: "internal_bot";
    command: SlashCommandInstance;
};
export type FlattenedCommand = SlashCommandSchema & ({
    kind: "external_bot";
    botName: string;
    botIcon?: string;
    botId: string;
    botEndpoint: string;
    botDescription?: string;
} | {
    kind: "internal_bot";
    botName: string;
    botDescription?: string;
});
export type CommandParamInstance = {
    name: string;
};
export type UserParamInstance = {
    kind: "user";
    userId?: string;
};
export type BooleanParamInstance = {
    kind: "boolean";
    value?: boolean;
};
export type StringParamInstance = {
    kind: "string";
    value?: string;
};
export type NumberParamInstance = {
    kind: "number";
    value: number | null;
};
export type SlashCommandParamTypeInstance = UserParamInstance | BooleanParamInstance | StringParamInstance | NumberParamInstance;
export type SlashCommandParamInstance = CommandParamInstance & SlashCommandParamTypeInstance;
export declare function createParamInstancesFromSchema(params: SlashCommandParam[], maybeParams: string[]): SlashCommandParamInstance[];
export declare function paramInstanceIsValid(schema: SlashCommandParam, instance: SlashCommandParamInstance): boolean;
export declare function i18nKey(key: string, params?: InterpolationValues): ResourceKey;
export declare function validBotComponentName(name: string): ResourceKey[];
export declare function validateBot(bot: ExternalBot): ValidationErrors;
