import * as dotenv from 'dotenv'
dotenv.config()
import express from "express"
import {connectAndInit} from "./utils/db-connect.js";
import bodyParser from "body-parser";
import cors from "cors";
import * as swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import EnergyParksController from "./controllers/EnergyParksController.js";
import ParksRepository from "./repository/EnergyParkRepository.js";
import OffersController from "./controllers/OffersController.js";
import OfferRepository from "./repository/OfferRepository.js";
import MarketsController from "./controllers/MarketsController.js";
import EnergyMarketRepository from "./repository/EnergyMarketRepository.js";
const swaggerDocument = YAML.load('./swagger.yaml')

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

let sequelize;
let parksController;
let parkRepository;
let offerController;
let offerRepository;
let marketController;
let marketRepository;

 app.use(async (req, _res, next) => {
     sequelize = await connectAndInit();
     parkRepository = new ParksRepository(sequelize);
     parksController = new EnergyParksController(parkRepository);
     offerRepository = new OfferRepository(sequelize);
     offerController = new OffersController(offerRepository);
     marketRepository = new EnergyMarketRepository(sequelize);
     marketController = new MarketsController(marketRepository);

     next()
 })

app.get('/', (req, res) => {
    console.log("Welcome to the energy offers manager");
    res.send("Welcome to the energy offers manager");
});
app.post('/parks', async (req, res) =>  {
    let response = await parksController.addPark(req.body);
    res.status(response.statusCode).send(response.message);
});
app.post('/offers', async (req, res) =>  {
    let response = await offerController.addOffer(req.body);
    res.status(response.statusCode).send(response.message);
});
app.post('/markets', async (req, res) =>  {
    let response = await marketController.addMarket(req.body);
    res.status(response.statusCode).send(response.message);
});
app.get('/markets', async (req, res) => {
    let response = await marketController.getAllMarketsWithOffers();
    res.status(response.statusCode).send(response.message);
});

app.listen(port, function(err){
    console.log("Listening on port ", port);
    if (err) {
        console.log("Error in server setup");
    }
})