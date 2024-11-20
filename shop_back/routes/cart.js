import express from "express";
import Carts from "../controllers/CartsController";
import authorization from "../middlewares/authorization";
import {changeCartItemSchema, createCartItemSchema, deleteCartItemSchema} from "../schema/carts";
import validate from "../middlewares/validate";


const router = express.Router();

router.post('/', authorization, validate(createCartItemSchema), Carts.createCartItem);
router.post('/change', authorization, validate(changeCartItemSchema), Carts.changeCartItem);
router.get('/get', authorization,  Carts.getCartData);
router.delete('/delete/:id', validate(deleteCartItemSchema), authorization, Carts.deleteCartItem);

export default router;