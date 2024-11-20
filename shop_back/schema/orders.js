import Joi from "joi";

export const getOrderItemsSchema = Joi.object({
    params: Joi.object({
        id: Joi.number().required(),
    }),

});