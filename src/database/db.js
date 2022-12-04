import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);


try {
    await mongoClient.connect();
  } catch (err) {
    console.log(err);
  }
  
  const db = mongoClient.db("enquetes")
  export const enquetesCollection = db.collection("enquetes");
  export const opcoesDeVotoCollection = db.collection("opcaoVoto");
  export const votosCollection = db.collection("votos");
  export const contagemDeVotosCollection = db.collection("contagemDeVotos");


