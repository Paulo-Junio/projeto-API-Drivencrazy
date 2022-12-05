import { ObjectId } from "mongodb";
import { enquetesCollection } from "../database/db.js";
import { opcoesDeVotoCollection } from "../database/db.js";
import { votosCollection } from "../database/db.js";
import dayjs from "dayjs";



export const EnqueteRegister = async (req, res) => {
    const enquete = res.locals.enquete;

    try {
       await enquetesCollection.insertOne(enquete);
       const enqueteRegistrada = await enquetesCollection.findOne(enquete);
        res.status(201).send(enqueteRegistrada);
    } catch (error){
        res.sendStatus(500);
    }
}

export const EnquetesData = async (req, res) => {

    try {
       const enquetes = await enquetesCollection.find().toArray();
        res.status(201).send(enquetes);
    } catch (error){
        res.sendStatus(500);
    }
}

export const Result = async (req,res) =>{
    const id = req.params.id;
    try {
        console.log(id)
        const enqueteEscolhida = await enquetesCollection.findOne({_id: ObjectId(id)});
        
        if(!enqueteEscolhida){
            return res.sendStatus(404)
        }

        const opcoes = await opcoesDeVotoCollection.find({pollId: id}).toArray();
        if(!opcoes){
            return res.sendStatus(404)
        }

        const votos = await votosCollection.find().toArray();
        let maiorNumeroDeVotos = 0;
        let contagemDeVotos = 0;
        let maisVotado={};


        for(let i=0; i <opcoes.length; i++){
            let opcao = opcoes[i]._id;
            let id_opcao = opcao.toHexString()
            contagemDeVotos = 0;
            for(let j=0; j < votos.length; j++){
                let id_voto = votos[j].choiceId;
                if(Object.is(id_opcao , id_voto)){
                    contagemDeVotos +=1;
                }
            }

            if(contagemDeVotos > maiorNumeroDeVotos){
                maiorNumeroDeVotos = contagemDeVotos;
                maisVotado = opcoes[i]
            }
        }
        const id_enquete = maisVotado.pollId;
        const enquete = await enquetesCollection.findOne({_id: new ObjectId(id_enquete)});
        const date = dayjs().format("YYYY-MM-DD HH:mm");

        if(enquete.expireAt < date){
            return res.sendStatus(404);
        }
        
        const resultado = {
            ...enquete,
            result: {
                title: maisVotado.title,
                votes: maiorNumeroDeVotos,
            }
        }

        
        res.status(201).send(resultado);


     } catch (error){
        return res.sendStatus(404)
     }
}