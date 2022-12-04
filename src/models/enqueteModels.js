import joi from "joi";


export const enqueteSchema = joi.object({
    title: joi.string().required().min(3),
    expireAt: joi.date().required().min(3),
});


