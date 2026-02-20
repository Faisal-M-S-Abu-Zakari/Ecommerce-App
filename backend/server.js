import express from "express";
import cors from "cors";
import "dotenv/config"; // this import will five me the support to use the .env file

import connectDB from "./config/mongoDB.js";

// App Config

const app = express();
const port = process.env.PORT || 4000;
connectDB();

// Middlewares
app.use(express.json()); // this middleware will allow us to parse the incoming request body as JSON
app.use(cors()); // this middleware will allow us access to the backend from any IP .

// api endpoints

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`listening on localhost:${port}`);
});
