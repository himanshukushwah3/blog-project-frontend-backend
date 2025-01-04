import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import router from "./routes/route.js";
import Connection from "./database/db.js";

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const app = express();
const port = 8000;
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

Connection(USERNAME, PASSWORD);
app.listen(port, () => {
  console.log(`Server is Running At Port ${port}...`);
});
