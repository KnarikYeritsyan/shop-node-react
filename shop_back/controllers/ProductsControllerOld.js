import fs from "fs";
import path from "path";
import {Products, Users} from "../models";

import HttpError from "http-errors";
import { Sequelize } from "sequelize";

class ProductsController {
    static createProducts = async (req, res, next) => {
        try {

            const { name, description, price, quantity, brandId, categoryId} = req.body;
            const { file } = req;

            const exists = await Products.findOne({
                where: { name }
            })
            if (exists) {
                throw HttpError(422, { errors: { product: 'Already Exists' } })
            }

            // validation

            const filePath = path.join(__dirname, '../public', file.filename)

            fs.renameSync(file.path, filePath);
            console.log(filePath)

            const product = await Products.create({
                name,
                description,
                price,
                quantity,
                brandId,
                categoryId,
                img: filePath
            })

            res.json({
                status: 'ok',
                product,
            })

        } catch (e) {
            next(e);
        }
    }

    static getProducts = async (req, res, next) => {
        try {

          const { page = 1, s = '', categoryId, brandId } = req.query;

            const where = {
                // status: 'active'
            };
            if (s) {
                where.$or = [
                    { name: { $like: `%${s}%` } },
                    // {categoryId: categoryId ? categoryId : null}
                ]
            }

            // validation

            const products = await Products.findAll({
                where,
                limit: 20,
                offset: (page - 1) * 20,
            });


            res.json({
                status: 'ok',
                products,
            })

        } catch (e) {
            next(e);
        }
    }
}

export default ProductsController;