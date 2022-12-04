import dayjs from "dayjs";
import { enqueteSchema} from "../models/enqueteModels.js";

export const EnqueteValidation = (req, res, next)=>{
    const enquete = req.body;

    if(!enquete.expireAt){
        const date = dayjs().add(30, 'day').format("YYYY-MM-DD HH:mm");
        enquete.expireAt = date;
    }

    const {error}= enqueteSchema.validate(enquete, { abortEarly: false });

    if(error){
        console.log(error);
        return res.sendStatus(422);
    };

    res.locals.enquete = enquete;
    next();
};
