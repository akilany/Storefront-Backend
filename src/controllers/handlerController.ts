//@ts-nocheck
import { Request, Response, NextFunction } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'

const index = (store) =>
  catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const data = await store.index()

      // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        results: data.length,
        data,
      })
    }
  )

const show = (store) =>
  catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const data = await store.show(req.params.id)

      if (!data) {
        return next(new AppError('No document found with that ID', 404))
      }

      res.status(200).json({
        status: 'success',
        data,
        message: 'Document Retrieved Successfully',
      })
    }
  )

const createOne = (store) =>
  catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const data = await store.create(req.body)

      res.status(201).json({
        status: 'success',
        data,
        message: 'Document Created Successfully',
      })
    }
  )

const updateOne = (store) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data = await store.update(req.params.id, req.body)

    if (!data) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data,
      message: 'Document Updated Successfully',
    })
  })

const deleteOne = (store) =>
  catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const data = await store.delete(req.params.id)

      if (!data) {
        return next(new AppError('No document found with that ID', 404))
      }

      res.status(200).json({
        status: 'success',
        data,
        message: 'Document Deleted Successfully',
      })
    }
  )

export default { index, show, createOne, updateOne, deleteOne }
