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
    if (email && result) {
      return res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      })
    } else if (!email && result) {
      return res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      })
    }
    return res.status(404).json({
      success: false,
      message: 'No orders found.',
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    })
  }
}

export const OrderControllers = {
  createOrder,
  getAllOrders,
}
