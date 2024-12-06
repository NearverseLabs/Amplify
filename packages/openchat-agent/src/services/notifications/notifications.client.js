"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsClient = void 0;
const candidService_1 = require("../candidService");
const mappers_1 = require("./mappers");
const mapping_1 = require("../../utils/mapping");
const typebox_1 = require("../../typebox");
class NotificationsClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId) {
        super(identity, agent, canisterId);
    }
    subscriptionExists(p256dh_key) {
        return this.executeMsgpackQuery("subscription_exists", {
            p256dh_key,
        }, mappers_1.subscriptionExistsResponse, typebox_1.NotificationsIndexSubscriptionExistsArgs, typebox_1.NotificationsIndexSubscriptionExistsResponse);
    }
    pushSubscription(subscription) {
        const request = {
            subscription: {
                endpoint: subscription.endpoint,
                keys: {
                    auth: subscription.keys["auth"],
                    p256dh: subscription.keys["p256dh"],
                },
            },
        };
        return this.executeMsgpackUpdate("push_subscription", request, mapping_1.toVoid, typebox_1.NotificationsIndexPushSubscriptionArgs, typebox_1.NotificationsIndexPushSubscriptionResponse);
    }
    removeSubscription(subscription) {
        return this.executeMsgpackUpdate("remove_subscription", {
            p256dh_key: subscription.keys["p256dh"],
        }, mapping_1.toVoid, typebox_1.NotificationsIndexRemoveSubscriptionArgs, typebox_1.NotificationsIndexRemoveSubscriptionResponse);
    }
}
exports.NotificationsClient = NotificationsClient;
