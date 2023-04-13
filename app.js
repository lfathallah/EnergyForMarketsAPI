import * as dotenv from 'dotenv'
dotenv.config()
import express from "express"
import {connectAndInit} from "./utils/db-connect.js";
import {createPark} from "./persistence/ParkRepository.js";
import bodyParser from "body-parser";
import cors from "cors";
import * as swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml')

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

let sequelize;

 app.use(async (req, _res, next) => {
     sequelize = await connectAndInit();
     next()
 })

app.get('/', (req, res) => res.send("Welcome to the energy offers manager"));
app.post('/parks/new', (req, res) => addPark(req, res));

async function addPark(req, res) {
    let name = req.body.name;

    try {
        console.log(`Creating new Energy Park with name ${name}`);
        let park = await createPark(req.body, sequelize);
        console.log(`Park created successfully`);
        res.send(`The new Energy Park with name ${park.name} has been created successfully with an auto-generated ID [${park.id}]`);
    } catch (error) {
        console.log(`Error creating new Energy Park with name ${name}`, error);
        res.status(500).send(`Error creating new Energy Park with name ${name}`);
    }
}

app.listen(port, function(err){
    console.log("Listening on port ", port);
    if (err) {
        console.log("Error in server setup");
    }
})