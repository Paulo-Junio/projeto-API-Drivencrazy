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

       const votos = await contagemDeVotosCollection.findOne({optionId: opcao_id})
       if(votos){
            const voto = {
                votes: votos.votes +1,
            }
            await contagemDeVotosCollection.updateOne({optionId: opcao_id},{$set: voto})
       } else{
            const newVote = {
                optionId:opcao_id,
                votes: 1,
            }
            await contagemDeVotosCollection.insertOne(newVote);

       }

        res.sendStatus(201);
    } catch (error){
        res.sendStatus(500);
    }
}