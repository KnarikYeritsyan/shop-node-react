import fs from "fs";
import path from "path";
import {ProductItems, Products, Brands, Categories, Ratings, Favorites} from "../models";
import sequelize from "../services/sequelize";
import HttpError from "http-errors";
import { Sequelize } from "sequelize";
import filters from "../services/filterProduct";


class ProductsController {

    static getProducts = async (req, res, next) => {
        try {

            const { page = 1, search = '', brandId, categoryId } = req.query.query || {};

            // validation

            let where = {};
            if (search) {
                where =  { name: { $like: `%${search}%` } }
            }

            const products = await Products.findAll({
                where,
                include: [
                    {
                        model: Brands,
                        as: 'product_brand',
                        required: true,
                        where: brandId,
                    }, {
                        model: Categories,
                        as: 'product_category',
                        required: true,
                        where: categoryId,
                    },
                ],
                limit: 20,
                offset: (page - 1) * 20,
            });

            const total = await Products.count();

            res.json({
                status: 'ok',
                products,
                total
            })

        } catch (e) {
            next(e);
        }
    }

    static createProducts = async (req, res, next) => {
        try {

            const { name, desc, price, qty, brandId, categoryId, color} = req.body;
            const { file } = req;

            // validation

            const exists = await Products.findOne({
                where: { name, categoryId, brandId }
            })

            if (exists) {
                throw HttpError(422, { errors: { product: 'Already Exists' } })
            }

            const newProduct = await Products.create({
                name,
                description: desc,
                price,
                brandId,
                categoryId,
            })

            const filePath = path.join(__dirname, '../public', file.filename);
            fs.renameSync(file.path, filePath);

            const product = await ProductItems.create({
                quantity: qty,
                img: file.filename,
                color,
                productId: newProduct.id
            })

            res.json({
                status: 'ok',
                product,
            })

        } catch (e) {
            next(e);
        }
    }

    static updateProducts = async (req, res, next) => {
        try {

            const { id } = req.body
            const { name, description, price, brandId, categoryId } = req.body.formData;

            // validation

            const newProduct = await Products.update(
                {
                    name,
                    description,
                    price,
                    brandId,
                    categoryId,
                }, {
                    where: { id }
                })

            res.json({
                status: 'ok',
                newProduct,
            })

        } catch (e) {
            next(e);
        }
    }

    static deleteProducts = async (req, res, next) => {
        try {

            const id = req.params.id;
            // validation

            const product = await Products.findOne({
                where: { id }
            })

            if (!product) {
                throw HttpError(422, { errors: { product: 'Product not found' } })
            }

            const del = await Products.destroy(
                {where: { id }
                })

            res.json({
                status: 'ok',
            })

        } catch (e) {
            next(e);
        }
    }

    static getProductItem = async (req, res, next) => {
        try {

            const { id } = req.params;

            // validation

            const products = await ProductItems.findAll({
                where: {
                    productId: id ,
                },
                include: [{
                    model: Products,
                    as: 'product_item',
                    required: true,

                    include: [
                        {
                            model: Brands,
                            as: 'product_brand',
                            required: true,
                        }, {
                            model: Categories,
                            as: 'product_category',
                            required: true,
                        }
                    ]

                }]

            });

            res.json({
                status: 'ok',
                products,

            })

        } catch (e) {
            next(e);
        }
    }

    static createProductItem = async (req, res, next) => {
        try {

            const { id } = req.params;
            const { quantity, color } = req.body;
            const { file } = req;

            // validation

            const exists = await Products.findOne({
                where: { id }
            })

            if (!exists) {
                throw HttpError(422, { errors: { product: 'Product not found' } })
            }


            const filePath = path.join(__dirname, '../public', file.filename)
            fs.renameSync(file.path, filePath);

            const product = await ProductItems.create({
                quantity: quantity,
                img: file.filename,
                color,
                productId: id
            })

            res.json({
                status: 'ok',
                product,
            })

        } catch (e) {
            next(e);
        }
    }

    static updateProductItem = async (req, res, next) => {
        try {

            const { id } = req.params;

            const { quantity, color, id: productId} = req.body;
            const { file } = req;

            // validation

            const exists = await Products.findOne({
                where: { id }
            })

            if (!exists) {
                throw HttpError(422, { errors: { product: 'Product not found' } })
            }

            const filePath = path.join(__dirname, '../public', file.filename)
            fs.renameSync(file.path, filePath);

            const product = await ProductItems.update({
                quantity,
                img: file.filename,
                color,
                productId: id
            },{
                where: { id: productId }
            })

            res.json({
                status: 'ok',
                product,
            })

        } catch (e) {
            next(e);
        }
    }

    static deleteProductItem = async (req, res, next) => {
        try {

            const { id } = req.params;

            // validation

            const del = await ProductItems.destroy(
                {where: { id }
                })

            res.json({
                status: 'ok',
                del,
            })

        } catch (e) {
            next(e);
        }
    }

    static getAll = async (req, res, next) => {
        try {

            const { page = 1, search = '', category, brand, color, minPrice, maxPrice } = req.query.query || {};
            const limit = 12;
            const userId = req.userId || '';

            // validation

            const f = filters.filter(search, minPrice, maxPrice);

            let categoryId;
            if (category) {
                categoryId = { id: category }
            }

            let brandId;
            if (brand) {
                brandId = { id: brand }
            }

            let col;
            if (color) {
                col = { color, status: 'active' };
            } else {
                col = { status: 'active' };
            }

            let { count, rows: products } = await ProductItems.findAndCountAll({
                where:  col,

                include: [{
                    model: Products,
                    as: 'product_item',
                    required: true,
                    // order: [['price', 'ASC']],
                    where: f,

                    include: [
                        {
                            model: Brands,
                            as: 'product_brand',
                            required: true,
                            where: brandId,
                        }, {
                            model: Categories,
                            as: 'product_category',
                            required: true,
                            where: categoryId,
                        }
                    ],

                }],

                limit,
                offset: (page - 1) * limit,
            });


            const total = await ProductItems.count();

            const wishlist = await Favorites.findAll({
                where: {userId},
                attributes: ['productId'],
            });
            const productIds = wishlist.map((w) => w.productId);
            products = products.map((p) => {
                const inFavorite = productIds.includes(p.id);
                return {
                    ...p.toJSON(),
                    favorite: inFavorite,
                };
            });


            console.log('userId', userId)

            res.json({
                status: 'ok',
                products,
                total: count,
                per_page: limit
            })

        } catch (e) {
            next(e);
        }
    }


    // static getAll = async (req, res, next) => {
    //     try {
    //
    //       const { page = 1, search = '', category, brand, color, minPrice, maxPrice } = req.query.query || {};
    //
    //         // validation
    //
    //         const f = filters.filter(search, minPrice, maxPrice);
    //
    //         let categoryId;
    //         if (category) {
    //             categoryId = { id: category }
    //         }
    //
    //         let brandId;
    //         if (brand) {
    //             brandId = { id: brand }
    //         }
    //
    //         let col;
    //         if (color) {
    //             col = { color, status: 'active' };
    //         } else {
    //             col = { status: 'active' };
    //         }
    //
    //         const products = await Products.findAll({
    //
    //             where: f,
    //
    //             include: [
    //                {
    //                     model: Brands,
    //                     as: 'product_brand',
    //                     required: true,
    //                     where: brandId,
    //                 }, {
    //                     model: Categories,
    //                     as: 'product_category',
    //                     required: true,
    //                     where: categoryId,
    //                 },
    //
    //                 {
    //                     model: ProductItems,
    //                     as: 'item_product',
    //                     required: true,
    //                     where:  col,
    //                     // limit: 1,
    //                 },
    //             ],
    //             limit: 20,
    //             offset: (page - 1) * 20,
    //         });
    //
    //         const total = await Products.count();
    //
    //         res.json({
    //             status: 'ok',
    //             products,
    //             total,
    //         })
    //
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    static getColors = async (req, res, next) => {
        try {

            let colors = await ProductItems.findAll({
                attributes: [[sequelize.fn('DISTINCT', sequelize.col('color')), 'color']]
            });

            res.json({
                status: 'ok',
                colors
            })

        } catch (e) {
            next(e);
        }
    }

    static getOne = async (req, res, next) => {
        try {

          const { id } = req.params;
          const userId = req.userId || '';

          // validation
            let product = await ProductItems.findOne({
                where: { id },
                include: [{
                    model: Products,
                    as: 'product_item',
                    required: true,

                    include: [
                        {
                            model: Brands,
                            as: 'product_brand',
                            required: true,
                        }, {
                            model: Categories,
                            as: 'product_category',
                            required: true,
                        }
                    ]
                }]
            });

            const wishlist = await Favorites.findOne({
                where: {userId, productId: product.id},

            });

            product = {
                ...product.toJSON(),
                favorite: !!wishlist,
            };

            const products = await ProductItems.findAll({
                where: {
                    productId: product.productId ,
                    id: {$ne: product.id}
                },
                include: [{
                    model: Products,
                    as: 'product_item',
                    required: true,

                    include: [
                        {
                            model: Brands,
                            as: 'product_brand',
                            required: true,
                        }, {
                            model: Categories,
                            as: 'product_category',
                            required: true,
                        }
                    ]
                }]
            });

            const rating = await Ratings.findOne({
                where: { productId: product.productId, userId }
            })

            res.json({
                status: 'ok',
                product,
                products,
                rating
            })

        } catch (e) {
            next(e);
        }
    }
}

export default ProductsController;

