import express from 'express'
import orderController from '../controllers/orderController'
import authController from '../controllers/authController'

const router = express.Router()

router.use(authController.protect)
router.route('/').get(orderController.getAll).post(orderController.createOne)

router
  .route('/:id')
  .get(orderController.getOne)
  .delete(orderController.deleteOne)

router
  .route('/:id/products')
  .get(orderController.getOrderProducts)
  .post(orderController.addProduct)

export default router
