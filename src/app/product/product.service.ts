import { TProduct } from './product.interface'
import { ProductModel } from './product.model'

const createProductIntoDb = async (product: TProduct) => {
  const result = await ProductModel.create(product)
  return result
}

const getProductsFromDb = async () => {
  return await ProductModel.find()
}

const getProductByIdFromDb = async (id: string) => {
  const result = await ProductModel.findById({ _id: id })
  return result
}

const updateProductFromDbById = async (id: string, product: TProduct) => {
  const result = await ProductModel.findByIdAndUpdate(id, product, {
    new: true,
  })
  return result
}

export const productServices = {
  createProductIntoDb,
  getProductsFromDb,
  getProductByIdFromDb,
  updateProductFromDbById,
}
