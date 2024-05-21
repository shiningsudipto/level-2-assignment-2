import express from 'express'
import { productControllers } from './product.controller'

const router = express.Router()

router.post('/products', productControllers.createProduct)
router.get('/products', productControllers.getAllProducts)
router.get('/products/:productId', productControllers.getProductById)
router.put('/products/:productId', productControllers.updateProductById)
router.delete('/products/:productId', productControllers.deleteProductById)

export const ProductRoutes = router
