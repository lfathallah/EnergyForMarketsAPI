import Offer from "../models/Offer.js";
import TimeBlock from "../models/TimeBlock.js";

export default class OfferRepository {

    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async createOffer(data) {
        if (data) {
            let offer;

            await this.sequelize.transaction(async (transaction) => {
                offer = await Offer.create(
                    {marketId: data.market_id, price: data.price, energy_quantity: data.energy_quantity},
                    transaction
                );

                await TimeBlock.update({
                    offer_id: offer.id
                }, {
                    where: {
                        id: data.timeBlocks
                    }
                });

                console.log("Created new Offer with auto-generated ID:", offer.id);
            });

            return offer;
        }
    }
}