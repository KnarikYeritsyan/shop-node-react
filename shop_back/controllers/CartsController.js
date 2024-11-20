import {CartItems, Cart, Products, Brands, Categories, ProductItems, Users} from "../models";
import HttpError from "http-errors";

import { Sequelize } from "sequelize";

class Carts {

    static createCartItem = async (req, res, next) => {
        try {
            const { quantity = 1, productId } = req.body;
            const userId = req.userId;

            const cart = await Cart.findOne({
                where: {
                    userId
                }
            })

            const product = await ProductItems.findOne({
                where: { id: productId },
                include: {
                    model: Products,
                    as: 'product_item',
                    required: true,
                    }
            })

            const price = product.dataValues.product_item.dataValues.price
            if (!product) {
                throw HttpError(422, { errors: { product: 'Not found' } })
            }

            const exists = await CartItems.findOne({
                where: { cartId: cart.id, productId}
            })

            if (exists) {
                throw HttpError(422, { errors: { cartItems: 'Already Exists' } })

            }

            const cartItem = await CartItems.create({
                subTotalPrice: price * quantity,
                productId,
                quantity,
                price,
                cartId: cart.id
            });

            cart.totalQuantity += 1;
            cart.totalPrice += (price * quantity)

            await cart.save();

            res.json({
                status: 'ok',
                cartItem,
                cart
            })

        } catch (e) {
            next(e);
        }
    }

    static changeCartItem = async (req, res, next) => {
        try {
            const { quantity = 1, productId } = req.body;

            const userId = req.userId;

            const cart = await Cart.findOne({
                where: {
                    userId
                }
            })

            const product = await ProductItems.findOne({
                where: { id: productId },
                include: {
                    model: Products,
                    as: 'product_item',
                    required: true,
                }
            })

            const price = product.dataValues.product_item.dataValues.price

            if (!product) {
                throw HttpError(422, { errors: { product: 'Not found' } })
            }

            const cartItem = await CartItems.findOne({
                where: { cartId: cart.id, productId}
            })

            if (!cartItem) {
                throw HttpError(422, { errors: { cartItems: 'Not found' } })
            }

            let oldQuantity = cartItem.quantity

            cartItem.quantity = quantity;
            cartItem.subTotalPrice = price * quantity;
            await cartItem.save();
            cart.totalPrice += (price * quantity - price * oldQuantity)
            await cart.save();

            res.json({
                status: 'ok',
                cart,
                cartItem
            })

        } catch (e) {
            next(e);
        }
    }

    static deleteCartItem = async (req, res, next) => {
        try {

            const productId = req.params.id;

            const userId = req.userId;

            const cart = await Cart.findOne({
                where: {
                    userId
                }
            })

            const product = await ProductItems.findOne({
                where: { id: productId }
            })
            if (!product) {

                throw HttpError(422, { errors: { product: 'Not found' } })
            }

            const cartItem = await CartItems.findOne({
                where: { cartId: cart.id, productId}
            })

            const del = await CartItems.destroy({
                where: { cartId: cart.id, productId}
            })

            cart.totalQuantity -= 1;
            cart.totalPrice -= cartItem.price * cartItem.quantity

            await cart.save();

            res.json({
                status: 'ok',
                cart,
            })

        } catch (e) {
            next(e);
        }
    }

    static getCartData = async (req, res, next) => {
        try {

            const userId = req.userId;

            const cart = await Cart.findOne({
                where: {
                    userId
                }
            })

            const cartItems = await CartItems.findAll({
                where: {
                    cartId: cart.id
                },
                include: [{
                    model: ProductItems,
                    as: 'cartProduct',
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

                }]
            })

            res.json({
                status: 'ok',
                cart,
                cartItems
            })

        } catch (e) {
            next(e);
        }

    }

}

export default Carts;
