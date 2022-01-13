import { Request, Response, NextFunction } from 'express'
import handler from './handlerController'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import { ProductStore } from '../models/productModel'
import DashboardStore from '../services/dashboard'

const store = new ProductStore()
const dashboardStore = new DashboardStore()

const getByCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await dashboardStore.productsByCategory(req.params.category)

    if (!data) {
      return next(new AppError('No category found with that name', 404))
    }

    res.status(200).json({
      status: 'success',
      results: data.length,
      data,
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
  getByCategory,
}
