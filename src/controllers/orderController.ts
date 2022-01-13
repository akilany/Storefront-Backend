import { Request, Response, NextFunction } from 'express'
import handler from './handlerController'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import { OrderStore } from '../models/orderModel'
import DashboardStore from '../services/dashboard'

const store = new OrderStore()
const dashboardStore = new DashboardStore()

const getOrderProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const order = await store.show(req.params.id)

    if (!order) {
      return next(new AppError('No orders found with that ID', 404))
    }

    const data = await dashboardStore.orderProducts(req.params.id)

    res.status(200).json({
      status: 'success',
      results: data.length,
      data,
    })
  }
)

const addProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const order = await store.show(req.params.id)
    if (!order) {
      return next(new AppError('No order found with that ID', 404))
    }

    if (order.status !== 'active') {
      return next(
        new AppError(
          `Could not add product ${req.body.product_id} to order ${req.params.id} because order status is ${order.status}`,
          400
        )
      )
    }

    const data = await dashboardStore.addProduct(
      req.params.id,
      req.body.quantity,
      req.body.product_id
    )

    res.status(200).json({
      status: 'success',
      data,
      message: `Product ${req.body.product_id} added to order ${req.params.id} successfully`,
    })
  }
)

const getAll = handler.index(store)
const getOne = handler.show(store)
const createOne = handler.createOne(store)
const updateOne = handler.updateOne(store)
const deleteOne = handler.deleteOne(store)

export default {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  getOrderProducts,
  addProduct,
}
