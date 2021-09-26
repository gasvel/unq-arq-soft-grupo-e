import { Router } from "express";
import * as productController from './ProductsController'

const router = Router();

router.get('/products', productController.getProducts);

router.get('/products/:owner', productController.getProductsFromOwner);

router.get('/product/:id', productController.getProduct);

router.post('/products', productController.createProduct);

router.delete('/products/:id', productController.deleteProduct);

router.put('/products/:id', productController.updateProduct);

export default router