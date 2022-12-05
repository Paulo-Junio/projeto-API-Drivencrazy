import { votosCollection, contagemDeVotosCollection } from "../database/db.js";
import dayjs from "dayjs";

export const VoteRegister = async (req, res) => {
    const opcao_id = res.locals.opcao_id;


    try {
        const date = dayjs().format("YYYY-MM-DD HH:mm");
        const choice = {
            createdAt: date,
            choiceId: opcao_id,
        }

        await votosCollection.insertOne(choice);

        res.sendStatus(201);
    } catch (error){
        res.sendStatus(500);
    }
}