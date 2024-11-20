import {Cart, CartItems, Orders, OrderItems, ProductItems, Users} from "../models";
import HttpError from "http-errors";
// import { Sequelize } from "sequelize";
import { Transaction } from "sequelize";
import sequelize from "../services/sequelize";
import paypal from 'paypal-rest-sdk';

const { CLIENT_ID, APP_SECRET } = process.env;


paypal.configure({
    'mode': 'sandbox',
    'client_id': CLIENT_ID,
    'client_secret': APP_SECRET
});


//const paypal = require('paypal-rest-sdk');
// const models = require('../models'); // assuming your Sequelize models are in a models directory
//
// paypal.configure({
//   'mode': 'sandbox', // change to 'live' for production
//   'client_id': 'your_client_id_here',
//   'client_secret': 'your_client_secret_here'
// });
//
// const createPayment = async (req, res) => {
//   const { amount } = req.body; // amount of the payment
//   const { id: userId } = req.user; // assuming you have user authentication and req.user contains the user's ID
//
//   const order = await models.Order.create({
//     userId,
//     amount,
//     status: 'pending'
//   }); // create a new order in your database
//
//   const create_payment_json = {
//     'intent': 'sale',
//     'payer': {
//       'payment_method': 'paypal'
//     },
//     'redirect_urls': {
//       'return_url': 'http://localhost:3000/success',
//       'cancel_url': 'http://localhost:3000/cancel'
//     },
//     'transactions': [{
//       'item_list': {
//         'items': [{
//           'name': 'Order #' + order.id,
//           'sku': '001',
//           'price': amount.toFixed(2),
//           'currency': 'USD',
//           'quantity': 1
//         }]
//       },
//       'amount': {
//         'currency': 'USD',
//         'total': amount.toFixed(2)
//       },
//       'description': 'Order #' + order.id
//     }]
//   };
//
//   paypal.payment.create(create_payment_json, function(error, payment) {
//     if (error) {
//       console.log(error);
//     } else {
//       for (let i = 0; i < payment.links.length; i++) {
//         if (payment.links[i].rel === 'approval_url') {
//           res.redirect(payment.links[i].href);
//         }
//       }
//     }
//   });
// };
//
// const executePayment = async (req, res) => {
//   const { paymentId, payerId } = req.query;
//
//   paypal.payment.execute(paymentId, { payer_id: payerId }, async function(error, payment) {
//     if (error) {
//       console.log(error);
//     } else {
//       const order = await models.Order.findOne({
//         where: { id: payment.transactions[0].description.split('#')[1] } // extract order ID from transaction description
//       });
//
//       order.update({ status: 'completed' }); // mark the order as completed in your database
//
//       res.redirect('/success');
//     }
//   });
// };
//
// module.exports = { createPayment, executePayment };


class OrdersController {
    // Create Order
    // static createOrder = async (req, res, next) => {
    //     // try {
    //     //
    //     //     const {formData, cart, cartList} = req.body;
    //     //     const userId = req.userId;
    //     //
    //     //
    //     //     const { orderItems } = req.body;
    //     //     const order = await Orders.create({
    //     //         userId,
    //     //         totalPrice: cart.totalPrice,
    //     //         country: formData.country,
    //     //         city: formData.city,
    //     //         address: formData.address,
    //     //         postalCode: formData.postalCode,
    //     //     }, { transaction });
    //     //
    //     //
    //     //     const createdOrderItems = cartList.map(async cartList => {
    //     //         const {productId, quantity} = cartList;
    //     //         const productItem = await ProductItems.findByPk(productId, { transaction });
    //     //         if (!productItem) {
    //     //             // throw new Error(`Product item with id ${productId} not found`);
    //     //             throw HttpError(403, { errors: { product: `Product item with id ${productId} not found` } });
    //     //         }
    //     //
    //     //         if (productItem.quantity < quantity) {
    //     //             // throw new Error(`Not enough quantity for product item with id ${productId}`);
    //     //             throw HttpError(403, { errors: { product: `Not enough quantity for product item with id ${productId}` } });
    //     //
    //     //         }
    //     //         await productItem.decrement('quantity', { by: quantity, transaction });
    //     //         if (productItem.quantity === 0) {
    //     //             productItem.status = 'inactive';
    //     //             await productItem.save({ transaction });
    //     //         }
    //     //         return OrderItems.create({
    //     //             ...cartList,
    //     //             orderId: order.id
    //     //         }, { transaction });
    //     //     });
    //     //
    //     //     await Promise.all(createdOrderItems);
    //     //
    //     //
    //     //     const carts = await Cart.findOne({
    //     //         where: {
    //     //             userId
    //     //         },
    //     //     });
    //     //
    //     //     const del = await CartItems.destroy(
    //     //         {where: { cartId: carts.id }
    //     //         })
    //     //
    //     //     carts.totalQuantity = 0;
    //     //     carts.totalPrice = 0;
    //     //     await carts.save();
    //     //
    //     //     await transaction.commit();
    //     //
    //     //
    //     //     res.json({
    //     //         // order,
    //     //         status: 'ok',
    //     //     })
    //     //
    //     // }
    //
    //     try {
    //
    //         const {formData, cart, cartList} = req.body;
    //         const userId = req.userId;
    //
    //
    //         const { orderItems } = req.body;
    //         const order = await Orders.create({
    //             userId,
    //             totalPrice: cart.totalPrice,
    //             country: formData.country,
    //             city: formData.city,
    //             address: formData.address,
    //             postalCode: formData.postalCode,
    //         });
    //
    //         console.log(order)
    //
    //
    //         const createdOrderItems = cartList.map(async cartList => {
    //             const {productId, quantity} = cartList;
    //             const productItem = await ProductItems.findByPk(productId);
    //             if (!productItem) {
    //                 // throw new Error(`Product item with id ${productId} not found`);
    //                 throw HttpError(403, { errors: { product: `Product item with id ${productId} not found` } });
    //             }
    //
    //             if (productItem.quantity < quantity) {
    //                 // throw new Error(`Not enough quantity for product item with id ${productId}`);
    //                 throw HttpError(403, { errors: { product: `Not enough quantity for product item with id ${productId}` } });
    //
    //             }
    //             await productItem.decrement('quantity', { by: quantity});
    //             if (productItem.quantity === 0) {
    //                 productItem.status = 'inactive';
    //                 await productItem.save();
    //             }
    //             return OrderItems.create({
    //                 name: cartList.cartProduct.product_item.name,
    //                 price: cartList.price,
    //                 quantity: cartList.quantity,
    //                 orderId: order.dataValues.id
    //             });
    //         });
    //
    //         await Promise.all(createdOrderItems);
    //
    //
    //         const carts = await Cart.findOne({
    //             where: {
    //                 userId
    //             },
    //         });
    //
    //         const del = await CartItems.destroy(
    //             {where: { cartId: carts.id }
    //             })
    //
    //         carts.totalQuantity = 0;
    //         carts.totalPrice = 0;
    //         await carts.save();
    //
    //         res.json({
    //             order,
    //             status: 'ok',
    //         })
    //
    //     } catch (e) {
    //         // await transaction.rollback();
    //         next(e);
    //     }
    // };


    static paypal = async (req, res, next) => {

        try {

            const { amount, id } = req.body;
            const description = 'Payment for your order';

            const create_payment_json = {
                intent: 'sale',
                payer: {
                    payment_method: 'paypal'
                },
                redirect_urls: {
                    return_url: 'http://localhost:3000/orders',
                    cancel_url: 'http://localhost:3000/order/id'
                },
                transactions: [{
                    item_list: {
                        items: [{
                            name: description,
                            sku: '001',
                            price: amount,
                            currency: 'USD',
                            quantity: 1
                        }]
                    },
                    amount: {
                        currency: 'USD',
                        total: amount
                    },
                    description: id
                }]
            };

            console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    next(error);
                    // throw HttpError(403, { errors: { payment: 'error' } });

                } else {
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {

                            res.json({
                                url: payment.links[i].href,
                                status: 'ok',
                            })
                            return;
                            // res.send(payment.links[i].href);
                            console.log(payment.links[i])
                        }
                    }
                }
            });

            console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')

            // res.json({
            //     status: 'fail',
            // })


        }catch (e) {

            next(e);
        }

    };



    static executePayment = async (req, res, next) => {

        try {

            const { paymentId, PayerID } = req.query.query || {};

            console.log( paymentId, PayerID, req.query)

            console.log('waiiiiiiiiiiiiiiiiiiiiiiiiiiit')

            paypal.payment.execute(paymentId, { payer_id: PayerID }, async function(error, payment) {
                if (error) {
                    console.log(error);
                } else {

                    console.log('paymeeeeeeeeent', payment.transactions[0].description)
                    const order = await Orders.findOne({
                        // where: { id: payment.transactions[0].description.split('#')[1] }
                        where: { id: payment.transactions[0].description }
                    });

                    // order.update({ status: 'completed' });
                    // order.status = 'completed'
                    order.paymentStatus = true;

                    console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')

                    await order.save();

                    console.log(order.status)

                    // res.redirect('/success');
                }
            });

            console.log('trueeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')

            res.json({
                status: 'ok',
            })


        }catch (e) {
            console.log('falseeeeeeeeeeeeeeeeeeeeeeeeeee')
            next(e);
        }

    };


    static createOrder = async (req, res, next) => {

        const transaction = await sequelize.transaction();
        try {

            const {formData, cart, cartList} = req.body;
            const userId = req.userId;

            const order = await Orders.create({
                userId,
                totalPrice: cart.totalPrice,
                country: formData.country,
                city: formData.city,
                address: formData.address,
                postalCode: formData.postalCode,
                paymentMethod: formData.paymentMethod,
            }, { transaction });


            const createdOrderItems = cartList.map(async cartList => {
                const {productId, quantity} = cartList;
                const productItem = await ProductItems.findByPk(productId, { transaction });
                if (!productItem) {
                    throw HttpError(403, { errors: { product: `Product item with id ${productId} not found` } });
                }

                if (productItem.quantity < quantity) {
                    throw HttpError(403, { errors: { product: `Not enough quantity for product item with id ${productId}` } });

                }

                productItem.status = (productItem.quantity - quantity > 0) ? 'active' : 'inactive';
                productItem.quantity -= quantity;
                await productItem.save({ transaction });

                return OrderItems.create({
                    name: cartList.cartProduct.product_item.name,
                    price: cartList.price,
                    quantity: cartList.quantity,
                    orderId: order.dataValues.id
                }, { transaction });
            });

            await Promise.all(createdOrderItems);

            const carts = await Cart.findOne({
                where: {
                    userId
                },
            });

            const del = await CartItems.destroy(
                {where: { cartId: carts.id }
                })

            carts.totalQuantity = 0;
            carts.totalPrice = 0;
            await carts.save();
            await transaction.commit();

            res.json({
                order,
                status: 'ok',
            })

        }catch (e) {
            await transaction.rollback();
            next(e);
        }

    };


    static getByUserId = async (req, res, next) => {
        try {

            const userId = req.userId || '';
            const { page = 1 } = req.query.query || {};
            const limit = 10;

            const orders = await Orders.findAll({
                where: {
                    userId
                },
                limit,
                offset: (page - 1) * limit,
            });

            const total = await Orders.count({
                where: {
                    userId
                }
            });

            // if (!order) {
            //     return res.status(404).json({
            //         message: "Order not found",
            //     });
            // }

            res.json({
                orders,
                total,
                per_page: limit,
                status: 'ok',
            });

        } catch (e) {
            next(e);
        }
    };


    static getAllOrders = async (req, res, next) => {
        try {
            const { page = 1 } = req.query.query || {};
            const limit = 6;

            const orders = await Orders.findAll({
                limit,
                offset: (page - 1) * limit,
            });

            const total = await Orders.count();

            res.json({
                orders,
                total,
                per_page: limit,
                status: 'ok',
            });

            console.log(req.query.query.page)

        } catch (e) {
            next(e);
        }
    };

    static getOrderItems = async (req, res, next) => {
        try {

            const userId = req.userId || '';
            const { id } = req.params;


            const orderItems = await Orders.findOne({
                // where: { id },
                where: { id, userId, status: 'pending' },

                include: [
                    {
                        model: OrderItems,
                        as: 'order_item',
                        required: true,
                    },

                    {
                        model: Users,
                        as: 'order_user',
                        required: true,
                    }
                ]
            })

            if (!orderItems) {
                throw HttpError(403, { errors: { order: `Order not found` }});
            }

            res.json({
                orderItems,
                status: 'ok',
            });

        } catch (e) {
            next(e);
        }
    };

    static changeOrderStatus = async (req, res, next) => {
        try {

            const { id } = req.params;

            const order = await Orders.findOne({
                where: { id },
            });

            if (!order) {
                throw HttpError(403, { errors: { order: `Order not found` }});
            }

            order.status = 'completed';
            await order.save();

            res.json({
                order,
                status: 'ok',
            });

        } catch (e) {
            next(e);
        }
    };

}

export default OrdersController;







