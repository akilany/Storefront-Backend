import express from 'express'
import productController from '../controllers/productController'
import authController from '../controllers/authController'

const router = express.Router()

router
  .route('/')
  .get(productController.getAll)
  .post(authController.protect, productController.createOne)

router
  .route('/:id')
  .get(productController.getOne)
  .patch(authController.protect, productController.updateOne)
  .delete(authController.protect, productController.deleteOne)

export default router
