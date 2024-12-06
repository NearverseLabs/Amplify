"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBot = exports.validBotComponentName = exports.i18nKey = exports.paramInstanceIsValid = exports.createParamInstancesFromSchema = exports.emptyBotInstance = exports.emptyPermissions = exports.emptySlashCommand = exports.defaultUserParam = exports.defaultNumberParam = exports.defaultStringParam = exports.defaultBooleanParam = exports.MIN_NAME_LENGTH = void 0;
const principal_1 = require("@dfinity/principal");
const validation_1 = require("../utils/validation");
exports.MIN_NAME_LENGTH = 3;
function defaultCommonParam(param) {
    return {
        name: param?.name ?? "",
        description: param?.description ?? "",
        placeholder: param?.placeholder ?? "",
        required: param?.required ?? true,
    };
}
function defaultBooleanParam(param) {
    return {
        kind: "boolean",
        ...defaultCommonParam(param),
    };
}
exports.defaultBooleanParam = defaultBooleanParam;
function defaultStringParam(param) {
    return {
        kind: "string",
        ...defaultCommonParam(param),
        minLength: 0,
        maxLength: 1000,
        choices: [],
    };
}
exports.defaultStringParam = defaultStringParam;
function defaultNumberParam(param) {
    return {
        kind: "number",
        ...defaultCommonParam(param),
        minValue: 0,
        maxValue: 1000,
        choices: [],
    };
}
exports.defaultNumberParam = defaultNumberParam;
function defaultUserParam(param) {
    return {
        kind: "user",
        ...defaultCommonParam(param),
    };
}
exports.defaultUserParam = defaultUserParam;
function emptySlashCommand() {
    return {
        name: "",
        description: "",
        params: [],
        permissions: emptyPermissions(),
    };
}
exports.emptySlashCommand = emptySlashCommand;
function emptyPermissions() {
    return {
        chatPermissions: [],
        communityPermissions: [],
        messagePermissions: [],
        threadPermissions: [],
    };
}
exports.emptyPermissions = emptyPermissions;
function emptyBotInstance(bot) {
    return bot
        ? structuredClone(bot)
        : {
            kind: "external_bot",
            id: "",
            name: "",
            description: "",
            endpoint: "",
            commands: [],
        };
}
exports.emptyBotInstance = emptyBotInstance;
function createParamInstancesFromSchema(params, maybeParams) {
    return params.map((p, i) => {
        switch (p.kind) {
            case "user":
                return { kind: "user", name: p.name };
            case "boolean":
                return { kind: "boolean", name: p.name, value: false };
            case "number": {
                const numParam = Number(maybeParams[i]);
                let value = isNaN(numParam) ? null : numParam;
                if (p.choices.length > 0) {
                    value = p.choices.find((c) => c.value === value)?.value ?? null;
                }
                return { kind: "number", name: p.name, value };
            }
            case "string": {
                let strParam = maybeParams[i] ?? "";
                if (p.choices.length > 0) {
                    strParam =
                        p.choices.find((c) => c.name.toLocaleLowerCase() === strParam.toLocaleLowerCase() ||
                            c.value.toLocaleLowerCase() === strParam.toLocaleLowerCase())?.value ?? "";
                }
                return { kind: "string", name: p.name, value: strParam };
            }
        }
    });
}
exports.createParamInstancesFromSchema = createParamInstancesFromSchema;
function paramInstanceIsValid(schema, instance) {
    if (schema.kind === "user" && instance.kind === "user") {
        return !schema.required || instance.userId !== undefined;
    }
    else if (schema.kind === "boolean" && instance.kind === "boolean") {
        return !schema.required || instance.value !== undefined;
    }
    else if (schema.kind === "string" && instance.kind === "string") {
        return (!schema.required ||
            (instance.value !== undefined &&
                instance.value.length > schema.minLength &&
                instance.value.length < schema.maxLength));
    }
    else if (schema.kind === "number" && instance.kind === "number") {
        return ((!schema.required && instance.value === null) ||
            (instance.value !== null &&
                instance.value >= schema.minValue &&
                instance.value <= schema.maxValue));
    }
    return false;
}
exports.paramInstanceIsValid = paramInstanceIsValid;
function i18nKey(key, params) {
    return {
        kind: "resource_key",
        key,
        params,
        lowercase: false,
    };
}
exports.i18nKey = i18nKey;
function validBotComponentName(name) {
    const errors = [];
    if (name.length < exports.MIN_NAME_LENGTH) {
        errors.push(i18nKey("bots.builder.errors.minLength", { n: exports.MIN_NAME_LENGTH }));
    }
    const regex = /^[a-zA-Z0-9_]+$/;
    if (!regex.test(name)) {
        errors.push(i18nKey("bots.builder.errors.alphaOnly"));
    }
    return errors;
}
exports.validBotComponentName = validBotComponentName;
function validateBot(bot) {
    const errors = new validation_1.ValidationErrors();
    errors.addErrors(`bot_name`, validBotComponentName(bot.name));
    if (!(validateOrigin(bot.endpoint) || validateCanister(bot.endpoint))) {
        errors.addErrors("bot_endpoint", i18nKey("bots.builder.errors.endpoint"));
    }
    if (bot.commands.length === 0) {
        errors.addErrors("no_commands", i18nKey("bots.builder.errors.noCommands"));
    }
    if (containsDuplicateCommands(bot.commands)) {
        errors.addErrors("duplicate_commands", i18nKey("bots.builder.errors.duplicateCommands"));
    }
    bot.commands.forEach((command, i) => {
        if (!validateCommand(command, `command_${i}`, errors)) {
            errors.addErrors(`command_${i}`, i18nKey("Command has errors"));
        }
    });
    return errors;
}
exports.validateBot = validateBot;
function validateCommand(command, errorPath, errors) {
    let valid = true;
    let nameErrors = validBotComponentName(command.name);
    if (nameErrors.length > 0) {
        errors.addErrors(`${errorPath}_name`, nameErrors);
        valid = false;
    }
    if (containsDuplicateParams(command.params)) {
        errors.addErrors(`${errorPath}_duplicate_params`, i18nKey("bots.builder.errors.duplicateParams"));
    }
    command.params.forEach((p, i) => {
        const paramPath = `${errorPath}_param_${i}`;
        if (!validateParameter(p, paramPath, errors)) {
            errors.addErrors(paramPath, i18nKey("Parameter has errors"));
            valid = false;
        }
    });
    return valid;
}
function containsDuplicateCommands(commands) {
    const set = new Set(commands.map((c) => c.name));
    return set.size < commands.length;
}
function containsDuplicateParams(params) {
    const set = new Set(params.map((p) => p.name));
    return set.size < params.length;
}
function validateParameter(param, errorPath, errors) {
    let valid = true;
    let nameErrors = validBotComponentName(param.name);
    if (nameErrors.length > 0) {
        errors.addErrors(`${errorPath}_name`, nameErrors);
        valid = false;
    }
    if (param.kind === "string") {
        param.choices.forEach((c, i) => {
            if (c.name.length < exports.MIN_NAME_LENGTH) {
                errors.addErrors(`${errorPath}_choices_${i}_name`, i18nKey("bots.builder.errors.minLength", { n: 3 }));
                valid = false;
            }
            if (c.value.length < exports.MIN_NAME_LENGTH) {
                errors.addErrors(`${errorPath}_choices_${i}_value`, i18nKey("bots.builder.errors.minLength", { n: 3 }));
                valid = false;
            }
        });
    }
    if (param.kind === "number") {
        param.choices.forEach((c, i) => {
            if (c.name.length < exports.MIN_NAME_LENGTH) {
                errors.addErrors(`${errorPath}_choices_${i}_name`, i18nKey("bots.builder.errors.minLength", { n: 3 }));
                valid = false;
            }
        });
    }
    return valid;
}
function validateOrigin(origin) {
    if (!origin)
        return false;
    try {
        const o = new URL(origin);
        return o.origin === origin;
    }
    catch (_) {
        return false;
    }
}
function validateCanister(canister) {
    if (!canister)
        return false;
    try {
        principal_1.Principal.fromText(canister);
        return true;
    }
    catch (_) {
        return false;
    }
}
