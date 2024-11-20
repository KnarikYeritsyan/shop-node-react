import express from "express";

import CategoriesController from "../controllers/CategoriesController";
import adminAuthorization from "../middlewares/adminAuthorization";

const router = express.Router();

router.post('/create', adminAuthorization, CategoriesController.createCategories);
router.put('/update', adminAuthorization, CategoriesController.updateCategory);
router.get('/get', CategoriesController.getCategories);
router.delete('/delete/:id', adminAuthorization, CategoriesController.deleteCategory);

export default router;