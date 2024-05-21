import { TOrder } from './order.interface'
import { OrderModel } from './order.model'

const createOrderIntoDb = async (order: TOrder) => {
  return await OrderModel.create(order)
}

const getAllOrdersFromDb = async () => {
  return await OrderModel.find()
}

export const OrderServices = {
  createOrderIntoDb,
  getAllOrdersFromDb,
}
