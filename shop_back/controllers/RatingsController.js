import HttpError from "http-errors";
import {ProductItems, Products, Ratings} from "../models";
import { Sequelize } from "sequelize";

class Rating {

    static rating = async (req, res, next) => {
        try {
            const { productId, rate } = req.body;
            const userId = req.userId;

            const exists = await Ratings.findOne({
                where: { productId, userId }
            })

            const product = await Products.findOne({
                where: { id: productId }
            })

            if (exists) {
                exists.rate = rate;
                await exists.save();
            } else {
                const rating = await Ratings.create({
                    productId,
                    userId,
                    rate,
                })

                product.numRating += 1;
            }

            const ratings = await Ratings.findAll({
                where: { productId }
            })

            let percent = 0;
            ratings.forEach(r => (
                percent+= r.rate
            ))

            percent /= ratings.length;
            product.rating = percent;
            await product.save();

            res.json({
                status: 'ok',
                // rating,
            })

        } catch (e) {
            next(e);
        }

    }

}

export default Rating;
