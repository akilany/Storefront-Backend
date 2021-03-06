import { Request, Response, NextFunction } from 'express'
import handler from './handlerController'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import { UserStore } from '../models/userModel'
import DashboardStore from '../services/dashboard'

const store = new UserStore()
const dashboardStore = new DashboardStore()

const getUserOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id, status } = req.params
    const user = await store.show(id)

    if (!user) {
      return next(new AppError('User does not exist.', 401))
    }

    const data = await dashboardStore.userOrders(id, status)

    res.status(200).json({
      status: 'success',
      result: data.length,
      data,
      message: 'Orders Retrieved Successfully',
    })
  }
)

const changePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id: string | number = req.params.id
    const { oldPassword, newPassword, newPasswordConfirm } = req.body

    if (!oldPassword || !newPassword || !newPasswordConfirm) {
      return next(new AppError('Please provide correct inputs!', 400))
    }

    if (newPassword !== newPasswordConfirm) {
      return next(new AppError('Password Confirm is not the same!', 400))
    }

    const user = await store.updatePassword(id, oldPassword, newPassword)

    if (!user) {
      return next(
        new AppError(
          'Your current password is wrong or user does not exist.',
          401
        )
      )
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
      message: 'Password Changed Successfully',
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
  getUserOrders,
  changePassword,
}
