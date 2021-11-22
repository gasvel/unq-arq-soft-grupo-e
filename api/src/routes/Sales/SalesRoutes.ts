import { Router } from "express";
import * as salesController from './SalesController'

const router = Router();

router.get('/sales', salesController.getSales);

router.get('/sale/:id', salesController.getSale);

router.post('/sales', salesController.createSale);

router.delete('/sales/:id', salesController.deleteSale);

router.put('/sales/:id', salesController.updateSale);

export default router