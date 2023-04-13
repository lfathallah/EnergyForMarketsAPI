import ParkRepository from "./../persistence/ParkRepository.js";

export default class ParksController {

    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async addPark(data) {
        let name = data.name;
        let repository = new ParkRepository(this.sequelize);
        try {
            console.log(`Creating new Energy Park with name ${name}`);
            let park = await repository.createPark(data);
            console.log(`Park created successfully`);

            return {
                message: `The new Energy Park with name ${park.name} has been created successfully with an auto-generated ID [${park.id}]`,
                statusCode: 200
            }
        } catch (error) {
            return {
                message: `Error creating new Energy Park with name ${name}`,
                statusCode: 500
            }
        }
    }
}