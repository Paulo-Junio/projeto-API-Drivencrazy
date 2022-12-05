import { opcoesDeVotoCollection } from "../database/db.js";



export const OptionVoteRegister = async (req, res) => {
    const opcao = res.locals.opcao;

    try {
       await opcoesDeVotoCollection.insertOne(opcao);
        res.sendStatus(201);
    } catch (error){
        res.sendStatus(500);
    }
}

export const OptionEnquetesData = async (req, res) => {
    const id = req.params.id;
    try {
       const opcoes = await opcoesDeVotoCollection.find({pollId:id}).toArray();
        console.log(opcoes)

       if(opcoes ==[] || !opcoes ){
        return res.sendStatus(404);
       }

        res.status(200).send(opcoes);
    } catch (error){
        return res.sendStatus(500);
    }
}