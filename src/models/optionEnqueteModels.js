import joi from "joi";


export const optionEnqueteSchema = joi.object({
    title: joi.string().required().min(3),
    pollId: joi.string().required().min(3),
});

