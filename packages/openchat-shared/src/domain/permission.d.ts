import type { VideoCallType } from "./chat";
import type { OptionUpdate } from "./optionUpdate";
export declare const allRoles: readonly ["none", "owner", "admin", "moderator", "member"];
export declare const chatRoles: readonly ["none", "owner", "admin", "moderator", "member"];
type ChatRolesType = typeof allRoles;
export type ChatPermissionRole = ChatRolesType[number];
export type PermissionRole = ChatPermissionRole;
export declare const communityRoles: readonly ["owner", "admin", "member"];
type CommunityRolesType = typeof communityRoles;
export type CommunityPermissionRole = CommunityRolesType[number];
export type MemberRole = "admin" | "moderator" | "member" | "owner" | "none";
export declare const messagePermissionsList: readonly ["text", "image", "video", "audio", "file", "poll", "crypto", "giphy", "prize", "memeFighter", "p2pSwap"];
type MessagePermissionsType = typeof messagePermissionsList;
export type MessagePermission = MessagePermissionsType[number];
export declare const chatPermissionsList: readonly ["changeRoles", "updateGroup", "inviteUsers", "addMembers", "removeMembers", "deleteMessages", "pinMessages", "reactToMessages", "mentionAllMembers", "startVideoCall"];
export declare const communityPermissionsList: readonly ["changeRoles", "updateDetails", "inviteUsers", "removeMembers", "createPublicChannel", "createPrivateChannel", "manageUserGroups"];
export type Permissioned<T> = {
    permissions: T;
};
export type HasMembershipRole = {
    membership: {
        role: MemberRole;
        lapsed: boolean;
    };
};
export type ChatPermissions = {
    changeRoles: ChatPermissionRole;
    updateGroup: ChatPermissionRole;
    inviteUsers: ChatPermissionRole;
    addMembers: ChatPermissionRole;
    removeMembers: ChatPermissionRole;
    deleteMessages: ChatPermissionRole;
    pinMessages: ChatPermissionRole;
    reactToMessages: ChatPermissionRole;
    mentionAllMembers: ChatPermissionRole;
    startVideoCall: ChatPermissionRole;
    messagePermissions: MessagePermissions;
    threadPermissions: MessagePermissions | undefined;
};
export type MessagePermissions = {
    default: ChatPermissionRole;
    text?: ChatPermissionRole;
    image?: ChatPermissionRole;
    video?: ChatPermissionRole;
    audio?: ChatPermissionRole;
    file?: ChatPermissionRole;
    poll?: ChatPermissionRole;
    crypto?: ChatPermissionRole;
    giphy?: ChatPermissionRole;
    prize?: ChatPermissionRole;
    memeFighter?: ChatPermissionRole;
    p2pSwap?: ChatPermissionRole;
};
export type OptionalChatPermissions = {
    changeRoles?: ChatPermissionRole;
    updateGroup?: ChatPermissionRole;
    inviteUsers?: ChatPermissionRole;
    addMembers?: ChatPermissionRole;
    removeMembers?: ChatPermissionRole;
    deleteMessages?: ChatPermissionRole;
    pinMessages?: ChatPermissionRole;
    reactToMessages?: ChatPermissionRole;
    mentionAllMembers?: ChatPermissionRole;
    startVideoCall?: ChatPermissionRole;
    messagePermissions: OptionalMessagePermissions | undefined;
    threadPermissions: OptionUpdate<OptionalMessagePermissions>;
};
export type OptionalMessagePermissions = {
    default: ChatPermissionRole | undefined;
    text: OptionUpdate<ChatPermissionRole>;
    image: OptionUpdate<ChatPermissionRole>;
    video: OptionUpdate<ChatPermissionRole>;
    audio: OptionUpdate<ChatPermissionRole>;
    file: OptionUpdate<ChatPermissionRole>;
    poll: OptionUpdate<ChatPermissionRole>;
    crypto: OptionUpdate<ChatPermissionRole>;
    giphy: OptionUpdate<ChatPermissionRole>;
    prize: OptionUpdate<ChatPermissionRole>;
    memeFighter: OptionUpdate<ChatPermissionRole>;
    p2pSwap: OptionUpdate<ChatPermissionRole>;
};
export type CommunityPermissions = {
    changeRoles: CommunityPermissionRole;
    updateDetails: CommunityPermissionRole;
    inviteUsers: CommunityPermissionRole;
    removeMembers: CommunityPermissionRole;
    createPublicChannel: CommunityPermissionRole;
    createPrivateChannel: CommunityPermissionRole;
    manageUserGroups: CommunityPermissionRole;
};
export declare function defaultOptionalChatPermissions(): OptionalChatPermissions;
export declare function defaultOptionalMessagePermissions(): OptionalMessagePermissions;
export type PermissionsByRole = Record<ChatPermissionRole, Set<string>>;
export type AccessTokenType = JoinVideoCall | StartVideoCall;
export type JoinVideoCall = {
    kind: "join_video_call";
};
export type StartVideoCall = {
    kind: "start_video_call";
    callType: VideoCallType;
};
export {};
