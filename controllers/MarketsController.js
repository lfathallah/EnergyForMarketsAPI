
export default class MarketsController {

    constructor(repository) {
        this.repository = repository;
    }

    async addMarket(data) {
        let type = data.type_id;
        try {
            console.log(`Creating new Energy Market`);
            let market = await this.repository.createMarket(data);
            console.log(`Market created successfully`);

            return {
                message: `The new Energy Market with name ${market.typeName} has been created successfully with an auto-generated ID [${market.id}]`,
                statusCode: 200
            }
        } catch (error) {
            return {
                message: `Error creating new Energy Market`,
                statusCode: 500
            }
        }
    };

    async getAllMarketsWithOffers() {
        try {
            console.log(`Listing all markets and their offers`);
            let markets = await this.repository.findAllWithOffers();

            console.log(`Found all Markets and their offers successfully`);

            return {
                message: `Found all Markets and their offers successfully`,
                statusCode: 200
            }
        } catch (error) {
            return {
                message: `finding all Markets and their offers`,
                statusCode: 500
            }
        }
    }
}