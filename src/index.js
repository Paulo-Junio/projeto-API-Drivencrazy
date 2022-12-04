import cors from "cors";
import express from "express";
import dotenv from "dotenv";
dotenv.config()

import enqueteRoutes from "./routes/enqueteRoutes.js";
import votesRoutes from "./routes/votesRoutes.js";
import optionVoteRoutes from "./routes/optionVoteRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());


app.use(enqueteRoutes);
app.use(votesRoutes);
app.use(optionVoteRoutes);


app.listen(process.env.PORT, console.log("Server is running..."));