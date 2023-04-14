import Offer from "../models/Offer.js";
import TimeBlock from "../models/TimeBlock.js";
import EnergyPark from "../models/EnergyPark.js";

export default class OfferRepository {

    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async createOffer(data) {
        if (data) {
            let offer;

            await this.sequelize.transaction(async (transaction) => {
                offer = await Offer.create(
                    {id: data.id, market_id: data.market_id, price: data.price, energy_quantity: data.energy_quantity},
                    transaction
                );

                let promises = [];
                data.timeBlocks?.forEach(id =>
                    promises.push(TimeBlock.update({offer_id: offer.id }, {
                        where: {
                            id: id
                        }
                    }))
                );
                await Promise.all(promises);

                console.log("Created new Offer with auto-generated ID:", offer.id);
            });

            return offer;
        }
    }
}