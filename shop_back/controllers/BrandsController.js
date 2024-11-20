import {Brands, Categories} from "../models";
import HttpError from "http-errors";

import { Sequelize } from "sequelize";

class BrandsController {

    static createBrands = async (req, res, next) => {
        try {
            const { name } = req.body;

            //validation

            const exists = await Brands.findOne({
                where: { name }
            })
            if (exists) {
                throw HttpError(422, { errors: { brandName: 'Already Exists' } })
            }

            const brand = await Brands.create({
               name
            })

            res.json({
                status: 'ok',
                brand
            })

        } catch (e) {
            next(e);
        }

    }

    static getBrands = async (req, res, next) => {
        try {

            const brands = await Brands.findAll();

            res.json({
                status: 'ok',
                brands
            })

        } catch (e) {
            next(e);
        }

    }

    static deleteBrand = async (req, res, next) => {
        try {
            const id = req.params.id;

            //validation

            const brand = await Brands.findOne({
                where: { id }
            })
            if (!brand) {
                throw HttpError(422, { errors: { brand: 'Not Found' } })
            }

            const del = await Brands.destroy({
                where: { id }
            })

            res.json({
                status: 'ok',
                brand
            })

        } catch (e) {
            next(e);
        }

    }

    static updateBrand = async (req, res, next) => {
        try {
            const { name, id } = req.body;

            //validation

            const brand = await Brands.findOne({
                where: { id }
            })
            if (!brand) {
                throw HttpError(422, { errors: { brand: 'Not found' } })
            }

            brand.name = name;
            await brand.save();

            res.json({
                status: 'ok',
                brand
            })

        } catch (e) {
            next(e);
        }

    }


}

export default BrandsController;

