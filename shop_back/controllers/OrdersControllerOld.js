import {Cart, CartItems, Orders} from "../models";
import HttpError from "http-errors";

class OrdersController {
    // Create Order
    static createOrder = async (req, res, next) => {
        try {

            const {formData, cart, cartList} = req.body;
            // const {totalPrice, country,city, address} = req.body;
            const userId = req.userId;

            // console.log(req.body)


            const order = await Orders.create({
                userId,
                orderItems: cartList,
                totalPrice: cart.totalPrice,
                country: formData.country,
                city: formData.city,
                address: formData.address

            });


            const carts = await Cart.findOne({
                where: {
                    userId
                },
            });
            console.log('cartId',carts.id)

            const del = await CartItems.destroy(
                {where: { cartId: carts.id }
                })

            carts.totalQuantity = 0;
            carts.totalPrice = 0;
            await carts.save();

            res.json({
                order,
                status: 'ok',
            })

        } catch (e) {
            next(e);
        }
    };


    // Get all Orders
    static getAllOrders = async (req, res, next) => {
        try {
            const orders = await Orders.findAll({
                include: [
                    {
                        model: Users,
                        as: 'order_user',
                    },
                    {
                        model: ProductItems,
                        as: 'order_productItem',
                    },
                ],
            });

            return res.status(200).json({
                orders,
                message: "Orders fetched successfully",
            });
        } catch (error) {
            return res.status(500).json({
                error,
                message: "Failed to fetch orders",
            });
        }
    };



// Get an Order by ID
    static getByUserId = async (req, res, next) => {
        try {

            const userId = req.userId || '';

            const orders = await Orders.findAll({
                where: {
                    userId
                },
            });

            // if (!order) {
            //     return res.status(404).json({
            //         message: "Order not found",
            //     });
            // }

            res.json({
                orders,
                status: 'ok',
            });

        } catch (e) {
            next(e);
        }
    };

    // Update an Order by ID
    static updateOrder = async (req, res, next) => {
        try {
            const order = await Orders.update({
                userId: req.body.userId,
                productItemId: req.body.productItemId,
                quantity: req.body.quantity,
                totalPrice: req.body.totalPrice,
                status: req.body.status,
            }, {
                where: {
                    id: req.params.id,
                },
            });

            if (!order[0]) {
                return res.status(404).json({
                    message: "Order not found",
                });
            }

            return res.status(200).json({
                message: "Order updated successfully",
            });
        } catch (error) {
            next(e);
        }
    }

}

export default OrdersController;







