
export default class OffersController {

    constructor(repository) {
        this.repository = repository;
    }

    async addOffer(data) {
        let type = data.type_id;
        try {
            console.log(`Creating new Energy Offer`);
            let offer = await this.repository.createOffer(data);
            console.log(`Offer created successfully`);

            return {
                message: `The new Energy Offer with name ${offer.typeName} has been created successfully with an auto-generated ID [${offer.id}]`,
                statusCode: 200
            }
        } catch (error) {
            return {
                message: `Error creating new Energy Offer`,
                statusCode: 500
            }
        }
    }
}