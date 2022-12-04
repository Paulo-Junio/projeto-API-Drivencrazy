import { ObjectId } from "mongodb";
import { opcoesDeVotoCollection, enquetesCollection} from "../database/db.js";
import dayjs from "dayjs";

export const VoteValidation = async(req, res, next)=>{
    const opcao_id = req.params.id;
    try{
        const opcao = await opcoesDeVotoCollection.findOne({_id: new ObjectId(opcao_id)});
        if (!opcao){
            return res.sendStatus(404);
        }

        const enquete = await enquetesCollection.findOne({_id: new ObjectId(opcao.pollId)});
        const date = dayjs().format("YYYY-MM-DD HH:mm");

        if(enquete.expireAt < date){
            return res.sendStatus(403);
        }

        res.locals.opcao_id = opcao_id;
    } catch(error){
        res.sendStatus(500);
    }
   
    next();
};