import express from "express";
import OrdersController from "../controllers/OrdersController";
import authorization from "../middlewares/authorization";
import adminAuthorization from "../middlewares/adminAuthorization";
import {getOrderItemsSchema} from "../schema/orders";
import validate from "../middlewares/validate";

const router = express.Router();

router.post('/', authorization, OrdersController.createOrder);
router.get('/get', authorization, OrdersController.getByUserId);
router.get('/getAll', adminAuthorization, OrdersController.getAllOrders);
// router.get('/getItem:id', authorization, validate(getOrderItemsSchema), OrdersController.getOrderItems);
router.get('/getItem:id', authorization, OrdersController.getOrderItems);
router.put('/change:id', adminAuthorization, OrdersController.changeOrderStatus);
router.post('/payment', OrdersController.paypal);
router.get('/execute', OrdersController.executePayment);



//     static getByUserId = async (req, res, next) => {
//         try {
//
//             const userId = req.userId || '';
//             const { page = 1 } = req.query.query || {};
//             const limit = 10;
//
//             const orders = await Orders.findAll({
//                 where: {
//                     userId
//                 },
//                 limit,
//                 offset: (page - 1) * limit,
//             });
//
//             const total = await Orders.count();
//             // if (!order) {
//             //     return res.status(404).json({
//             //         message: "Order not found",
//             //     });
//             // }
//
//             res.json({
//                 orders,
//                 total,
//                 per_page: limit,
//                 status: 'ok',
//             });
//
//         } catch (e) {
//             next(e);
//         }
//     };

export default router;