import { ProductModel } from '../product/product.model'
import { TOrder } from './order.interface'
import { OrderModel } from './order.model'

const createOrderIntoDb = async (order: TOrder) => {
  try {
    const productId = order?.productId
    const orderQuantity = order?.quantity

    // Check if the product exists
    const productExists = await ProductModel.findById(productId)
    if (!productExists) {
      throw new Error('Product not found')
    }

    // Check if the product has enough quantity
    if (productExists.inventory.quantity < orderQuantity) {
      throw new Error('Insufficient quantity available in inventory')
    }

    // Update the product's inventory
    await ProductModel.updateOne(
      { _id: productId },
      { $inc: { 'inventory.quantity': -orderQuantity } },
    )

    const updatedProduct = await ProductModel.findById(productId)
    if (!updatedProduct) {
      throw new Error('Product not found')
    }
    // If inventory is zero, update inStock status
    if (updatedProduct.inventory.quantity === 0) {
      await ProductModel.updateOne(
        { _id: productId },
        { $set: { 'inventory.inStock': false } },
      )
    }

    // Create the order
    const result = await OrderModel.create(order)
    return result
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const getAllOrdersFromDb = async (email: string) => {
  if (email) {
    const result = await OrderModel.aggregate([
      {
        $match: { email: email },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ])
    return result
  } else {
    return await OrderModel.find()
  }
}

export const OrderServices = {
  createOrderIntoDb,
  getAllOrdersFromDb,
}
