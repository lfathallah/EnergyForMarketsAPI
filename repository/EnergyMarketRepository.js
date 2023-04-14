import EnergyPark from "../models/EnergyPark.js";
import TimeBlock from "../models/TimeBlock.js";
import EnergyMarket from "../models/EnergyMarket.js";
import MarketType from "../models/MarketType.js";
export default class EnergyMarketRepository {

    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async createMarket(data) {
        if (data) {
            let market;

            await this.sequelize.transaction(async (transaction) => {
                market = await EnergyMarket.create(
                    {energy_reserve_max: data.energyReserveMax, energy_reserve_min: data.energyReserveMin, type_id: data.marketTypeId},
                    transaction
                );

                console.log("Created new Energy Market with auto-generated ID:", market.id);
            });

            market.typeName = await MarketType.findByPk(market.type_id);

            return market;
        }
    }


}