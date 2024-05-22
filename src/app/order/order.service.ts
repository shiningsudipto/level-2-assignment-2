import { ProductModel } from '../product/product.model'
import { TOrder } from './order.interface'
import { OrderModel } from './order.model'

const createOrderIntoDb = async (order: TOrder) => {
  const productId = order?.productId
  const orderQuantity = order?.quantity

  // Checking product id matching or not
  const productExists = await ProductModel.findById(productId)

  // Check if the product has enough quantity
  if (productExists.inventory.quantity < orderQuantity) {
    // Handle the case where there is not enough quantity
    throw new Error('Insufficient quantity available in inventory')
  }

  // If productId exist in product, create the order
  if (productExists) {
    await ProductModel.updateOne(
      { _id: productId },
      { $inc: { 'inventory.quantity': -order.quantity } },
    )
    const updatedProduct = await ProductModel.findById(productId)
    if (updatedProduct.inventory.quantity == 0) {
      await ProductModel.updateOne(
        { _id: productId },
        { $set: { 'inventory.inStock': false } },
      )
    }
    // creating order
    const result = await OrderModel.create(order)
    return result
  } else {
    // Handle the case where productId doesn't exist
    throw new Error('Order not found')
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
