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

const deleteProductByIdFromDb = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id)
  return result
}

const searchProductFromDb = async (searchTerm: string) => {
  //   const result = await ProductModel.aggregate([
  //     { $match: { $text: { $search: searchTerm } } },
  //   ])
  //   return result

  const regex = new RegExp(searchTerm, 'i') // 'i' flag for case-insensitive search

  // Use the regex in the MongoDB query to find matching products
  const result = await ProductModel.find({ title: { $regex: regex } })

  return result
}

export const productServices = {
  createProductIntoDb,
  getProductsFromDb,
  getProductByIdFromDb,
  updateProductFromDbById,
  deleteProductByIdFromDb,
  searchProductFromDb,
}
