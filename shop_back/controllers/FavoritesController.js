import {Products, ProductItems, Users, Favorites, Brands, Categories} from "../models";
import HttpError from "http-errors";

class FavoritesController {

    static toggleFavorites = async (req, res, next) => {
        try {

            const { userId } = req;
            const {productId}  = req.body;

            const favorite = await Favorites.findOne({
                where: {
                    userId,
                    productId,
                },
            });

            if (favorite) {
                await favorite.destroy();
                res.json({
                    status: 'ok',
                    message: 'Product removed from favorites',
                    isFavorite: false,
                });
            } else {
                await Favorites.create({
                    userId,
                    productId,
                });
                res.json({
                    status: 'ok',
                    message: 'Product added to favorites',
                    isFavorite: true,
                });
            }

            // res.json({
            //     status: 'ok',
            //     favorite,
            // })

        } catch (e) {
            next(e);
        }
    }

    static getWishlist = async (req, res, next) => {
        try {

            const { userId } = req;
            const { page = 1 } = req.query.query || {};

            let wishlist = await Favorites.findAll({
                where: {
                    userId,
                },

                include: [{
                    model: ProductItems,
                    as: 'favorite_product',
                    required: true,

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
                }],
                limit: 20,
                offset: (page - 1) * 20,
            });

            wishlist = wishlist.map(item => item.favorite_product);

            wishlist = wishlist.map((w) => {

                return {
                    ...w.toJSON(),
                    favorite: true,
                };
            });


            res.json({
                status: 'ok',
                wishlist,
            })

        } catch (e) {
            next(e);
        }
    }

}

export default FavoritesController;