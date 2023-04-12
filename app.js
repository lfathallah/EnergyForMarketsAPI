import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
import cors from "cors";
import {connectAndInit} from "./utils/db-connect.js";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors());

 app.use(async (req, _res, next) => {
     await connectAndInit();
     next()
 })

app.get('/', (req, res) => res.send("Welcome to the energy offers manager"));

 app.listen(port, function(err){
    console.log("Listening on port ", port);
    if (err) {
        console.log("Error in server setup");
    }
})