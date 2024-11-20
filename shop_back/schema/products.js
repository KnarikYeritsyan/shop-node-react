import Joi from "joi";

export const getOneSchema = Joi.object({
    params: Joi.object({
        id: Joi.number().required(),
    }),

});

export const getAllSchema = Joi.object({
    query: Joi.object({
        page: Joi.number(),
        search: Joi.string(),
        category: Joi.number(),
        brand: Joi.number(),
        color: Joi.string(),
        minPrice: Joi.number().min(1),
        maxPrice: Joi.number(),

    }),

});


export const createProductsSchema = Joi.object({
    body: Joi.object({
        name: Joi.string().required(),
        desc: Joi.string().required(),
        price: Joi.number().required(),//TODO decimal
        qty: Joi.number(),
        brandId: Joi.number().required(),
        categoryId: Joi.number().required(),
        color: Joi.string().required(),
    }),

});

export const updateProductsSchema = Joi.object({
    body: Joi.object({
        formData: {
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            brandId: Joi.number().required(),
            categoryId: Joi.number().required(),
        },
        id: Joi.number().required()

    }).unknown()

});
