"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketMakerClient = void 0;
const idl_1 = require("./candid/idl");
const candidService_1 = require("../candidService");
const mappers_1 = require("./mappers");
const chatMappers_1 = require("../common/chatMappers");
const mapping_1 = require("../../utils/mapping");
class MarketMakerClient extends candidService_1.CandidService {
    constructor(identity, agent, canisterId) {
        super(identity, agent, canisterId);
        this.service = this.createServiceClient(idl_1.idlFactory);
    }
    updateConfig(config) {
        const args = {
            exchange_id: config.exchangeId,
            enabled: (0, chatMappers_1.apiOptional)(mapping_1.identity, config.enabled),
            price_increment: (0, chatMappers_1.apiOptional)(mapping_1.identity, config.priceIncrement),
            order_size: (0, chatMappers_1.apiOptional)(mapping_1.identity, config.orderSize),
            min_order_size: (0, chatMappers_1.apiOptional)(mapping_1.identity, config.minOrderSize),
            max_buy_price: (0, chatMappers_1.apiOptional)(mapping_1.identity, config.maxBuyPrice),
            min_sell_price: (0, chatMappers_1.apiOptional)(mapping_1.identity, config.minSellPrice),
            spread: (0, chatMappers_1.apiOptional)(mapping_1.identity, config.spread),
            min_orders_per_direction: (0, chatMappers_1.apiOptional)(mapping_1.identity, config.minOrdersPerDirection),
            max_orders_per_direction: (0, chatMappers_1.apiOptional)(mapping_1.identity, config.maxOrdersPerDirection),
            max_orders_to_make_per_iteration: (0, chatMappers_1.apiOptional)(mapping_1.identity, config.maxOrdersToMakePerIteration),
            max_orders_to_cancel_per_iteration: (0, chatMappers_1.apiOptional)(mapping_1.identity, config.maxOrdersToCancelPerIteration),
        };
        return this.handleResponse(this.service.update_config(args), mappers_1.updateConfigResponse);
    }
}
exports.MarketMakerClient = MarketMakerClient;
