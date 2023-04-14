import EnergyPark from "../models/EnergyPark.js";
import TimeBlock from "../models/TimeBlock.js";
export default class EnergyParkRepository {

    constructor(sequlize) {
        this.sequelize = sequlize;
    }

    async createPark(data) {
        if (data) {
            let park;

            await this.sequelize.transaction(async (transaction) => {
                park = await EnergyPark.create(
                    {name: data.name, address: data.address, type: data.type},
                    transaction
                );

                let timeBlocks = [];
                data.timeBlocks.map(timeBlock =>
                    timeBlocks.push(
                        {
                            nb_hours: timeBlock.nbHours,
                            energy_quantity: timeBlock.energyQuantity,
                            min_price: timeBlock.minPrice,
                            energy_park_id: park.id
                        })
                )
                await TimeBlock.bulkCreate(timeBlocks);

                console.log("Created new Energy Park with auto-generated ID:", park.id);
            });

            return park;
        }
    }
}