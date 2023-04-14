
export default class EnergyParksController {

    constructor(repository) {
        this.repository = repository;
    }

    async addPark(data) {
        let name = data.name;
        try {
            console.log(`Creating new Energy Park with name ${name}`);
            let park = await this.repository.createPark(data);
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