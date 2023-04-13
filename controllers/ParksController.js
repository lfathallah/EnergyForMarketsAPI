import {createPark} from "./../persistence/ParkRepository.js";

export default class ParksController {
async addPark(req, sequelize) {
    let name = req.body.name;

    try {
        console.log(`Creating new Energy Park with name ${name}`);
        let park = await createPark(req.body, sequelize);
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