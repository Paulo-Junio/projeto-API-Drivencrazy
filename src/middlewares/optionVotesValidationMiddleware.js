import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { optionEnqueteSchema } from "../models/optionEnqueteModels.js";
import { opcoesDeVotoCollection, enquetesCollection} from "../database/db.js";


export const OptionEnqueteValidation = async(req, res, next)=>{
    const opcao = req.body;
    const id = opcao.pollId;
    try{
        const {error}= optionEnqueteSchema.validate(opcao, { abortEarly: false });
            if(error){
            return res.sendStatus(422);
        };

        const opcaoExiste = await opcoesDeVotoCollection.findOne(opcao);

        if (opcaoExiste){
            return res.sendStatus(409);
        }

        const enquete= await enquetesCollection.findOne({_id: new ObjectId(id)});
        const date = dayjs().format("YYYY-MM-DD HH:mm");
        if(enquete.expireAt < date){
            return res.sendStatus(403);
        }

        res.locals.opcao = opcao;
    } catch(error){
        res.sendStatus(500)
    }

   
    next();
};