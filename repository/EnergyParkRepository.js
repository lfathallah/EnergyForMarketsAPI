import EnergyPark from "../models/EnergyPark.js";
import TimeBlock from "../models/TimeBlock.js";
export default class EnergyParkRepository {

    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async createPark(data) {
        if (data) {
            let park;

            await this.sequelize.transaction(async (transaction) => {
                park = await EnergyPark.create(
                    {name: data.name, address: data.address, type_id: data.type_id},
                    transaction
                );

                let timeBlocks = [];
                data.timeBlocks.map(timeBlock =>
                    timeBlocks.push(
                        {
                            nb_hours: timeBlock.nb_hours,
                            energy_quantity: timeBlock.energy_quantity,
                            min_price: timeBlock.min_price,
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