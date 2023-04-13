import * as dotenv from 'dotenv'
dotenv.config()
import express, {response} from "express"
import {connectAndInit} from "./utils/db-connect.js";
import bodyParser from "body-parser";
import cors from "cors";
import * as swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import ParksController from "./controllers/ParksController.js";
const swaggerDocument = YAML.load('./swagger.yaml')

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

let sequelize;
let parksController = new ParksController();

 app.use(async (req, _res, next) => {
     sequelize = await connectAndInit();
     next()
 })

app.get('/', (req, res) => res.send("Welcome to the energy offers manager"));
app.post('/parks/new', async (req, res) =>  {
    let response = parksController.addPark(req, sequelize);
    res.status((await response).statusCode).send((await response).message);
});

app.listen(port, function(err){
    console.log("Listening on port ", port);
    if (err) {
        console.log("Error in server setup");
    }
})