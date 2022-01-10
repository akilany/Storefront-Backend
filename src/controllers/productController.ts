import { Request, Response, NextFunction } from 'express'
import handler from './handlerController'
import { ProductStore } from '../models/productModel'

const store = new ProductStore()

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
}
