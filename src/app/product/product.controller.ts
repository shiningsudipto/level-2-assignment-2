import { Request, Response } from 'express'
import { productServices } from './product.service'

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body
    const result = await productServices.createProductIntoDb(product)
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query
    console.log(searchTerm)
    const result = await productServices.getProductsFromDb(searchTerm as string)
    res.status(200).json({
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await productServices.getProductByIdFromDb(productId)
    if (!result) {
      res.status(200).json({
        success: false,
        message: 'Product Not Found',
        data: null,
      })
    }
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}

const updateProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const product = req.body
    const result = await productServices.updateProductFromDbById(
      productId,
      product,
    )
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}

const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await productServices.deleteProductByIdFromDb(productId)
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}

export const productControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
}
