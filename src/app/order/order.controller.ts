import { Request, Response } from 'express'
import { OrderServices } from './order.service'

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body
    const result = await OrderServices.createOrderIntoDb(order)
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
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

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query
    const result = await OrderServices.getAllOrdersFromDb(email as string)
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
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

export const OrderControllers = {
  createOrder,
  getAllOrders,
}
