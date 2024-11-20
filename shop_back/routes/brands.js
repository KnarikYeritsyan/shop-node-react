import express from "express";

import BrandsController from "../controllers/BrandsController";

const router = express.Router();

router.post('/create', BrandsController.createBrands);
router.put('/update', BrandsController.updateBrand);
router.get('/get', BrandsController.getBrands);
router.delete('/delete/:id', BrandsController.deleteBrand);

export default router;