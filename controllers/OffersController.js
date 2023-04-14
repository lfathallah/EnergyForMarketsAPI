
export default class OffersController {

    constructor(repository) {
        this.repository = repository;
    }

    async addOffer(data) {
        try {
            console.log(`Creating new Energy Offer`);
            let offer = await this.repository.createOffer(data);
            console.log(`Offer created successfully`);

            return {
                message: `The new Offer has been created successfully with an auto-generated ID [${offer.id}]`,
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