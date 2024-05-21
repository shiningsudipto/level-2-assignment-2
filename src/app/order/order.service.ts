import { TOrder } from './order.interface'
import { OrderModel } from './order.model'

const createOrderIntoDb = async (order: TOrder) => {
  return await OrderModel.create(order)
}

const getAllOrdersFromDb = async () => {
  return await OrderModel.find()
}

const getOrdersByEmailFromDb = async (email: string) => {
  const result = await OrderModel.aggregate([
    {
      $match: { email: email },
    },
    {
      $project: {
        _id: 0,
        __v: 0,
      },
    },
  ])
  return result
}

export const OrderServices = {
  createOrderIntoDb,
  getAllOrdersFromDb,
  getOrdersByEmailFromDb,
}
