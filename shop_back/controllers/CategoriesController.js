import {CartItems, Categories} from "../models";
import HttpError from "http-errors";
import { Sequelize } from "sequelize";

class CategoriesController {

    static createCategories = async (req, res, next) => {
        try {

            const { name } = req.body;

            const exists = await Categories.findOne({
                where: { name }
            })
            if (exists) {
                throw HttpError(422, { errors: { categoryName: 'Already Exists' } })
            }

            const category = await Categories.create({
                name
            })

            res.json({
                status: 'ok',
                category
            })

        } catch (e) {
            next(e);
        }

    }

    static getCategories = async (req, res, next) => {
        try {

            const categories = await Categories.findAll();

            res.json({
                status: 'ok',
                categories
            })

        } catch (e) {
            next(e);
        }

    }

    static deleteCategory = async (req, res, next) => {
        try {

            const id = req.params.id;

            const category = await Categories.findOne({
                where: { id }
            });

            if (!category) {
                throw HttpError(422, { errors: { category: 'Not Found' } })
            }

            const del = await Categories.destroy({
                where: { id }
            })

            res.json({
                status: 'ok',
                category
            })

        } catch (e) {
            next(e);
        }

    }

    static updateCategory = async (req, res, next) => {
        try {

            const { name, id } = req.body;

            const category = await Categories.findOne({
                where: { id }
            })
            if (!category) {
                throw HttpError(422, { errors: { category: 'Not found' } })
            }

            category.name = name;
            await category.save();

            res.json({
                status: 'ok',
                category
            })

        } catch (e) {
            next(e);
        }

    }

}

export default CategoriesController;