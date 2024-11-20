import express from "express";
import ProductsController from "../controllers/ProductsController";
import multer from 'multer';
import HttpError from "http-errors";
import {v4 as uuidV4} from 'uuid';
import path from "path";
import os from "os";
import adminAuthorization from "../middlewares/adminAuthorization";
import authorization from "../middlewares/authorization";
import authorizationAllowAll from "../middlewares/authorizationAllowAll";
import {createProductsSchema, getOneSchema, updateProductsSchema} from "../schema/products";
import validate from "../middlewares/validate";

const router = express.Router();

const upload = multer({
    storage:multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, os.tmpdir())
            // cb(null, path.join(__dirname, '../public'))
        },
        filename: function (req, file, cb) {
            // console.log(file);
            if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)) {
                cb(HttpError(422, 'Invalid file type'));
                return;
            }
            cb(null, uuidV4() + '_' + file.originalname)
        }
    })
})

router.post('/create', adminAuthorization, upload.single('img'),
    validate(createProductsSchema), ProductsController.createProducts);
router.put('/update', adminAuthorization, validate(updateProductsSchema), ProductsController.updateProducts);
router.delete('/delete/:id', ProductsController.deleteProducts);
router.get('/colors', ProductsController.getColors);

router.get('/getAll', authorizationAllowAll, ProductsController.getAll);
// router.get('/getAll', authorization, ProductsController.getAll);

router.get('/get', ProductsController.getProducts);
router.get('/getItem:id', ProductsController.getProductItem);
router.get('/get:id', authorizationAllowAll, validate(getOneSchema), ProductsController.getOne);

router.post('/createItem/:id', upload.single('img'), ProductsController.createProductItem);
router.put('/updateItem/:id', upload.single('img'), ProductsController.updateProductItem);
router.delete('/deleteItem/:id', ProductsController.deleteProductItem);


export default router;

