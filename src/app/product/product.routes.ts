import express from 'express'
import { productControllers } from './product.controller'

const router = express.Router()

router.post('/products', productControllers.createProduct)

export const ProductRoutes = router
