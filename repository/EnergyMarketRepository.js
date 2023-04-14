import EnergyPark from "../models/EnergyPark.js";
import TimeBlock from "../models/TimeBlock.js";
import EnergyMarket from "../models/EnergyMarket.js";
import MarketType from "../models/MarketType.js";
import Offer from "../models/Offer.js";
export default class EnergyMarketRepository {

    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async createMarket(data) {
        if (data) {
            let market;

            await this.sequelize.transaction(async (transaction) => {
                market = await EnergyMarket.create(
                    {energy_reserve_max: data.energy_reserve_max, energy_reserve_min: data.energy_reserve_min, type_id: data.type_id},
                    transaction
                );

                market.typeName = await MarketType.findByPk(market.type_id);
                console.log("Created new Energy Market with auto-generated ID:", market.id);
            });

            return market;
        }
    }

    async findAllWithOffers() {
        return await EnergyMarket.findAll({
            include: [{
                model: Offer
            }]
        })
    }

}