import express from 'express'
import userController from '../controllers/userController'
import authController from '../controllers/authController'

const router = express.Router()

router.post('/login', authController.login)
router.post('/signup', authController.signup)

router.use(authController.protect)
router.route('/').get(userController.getAll).post(userController.createOne)

router
  .route('/:id')
  .get(userController.getOne)
  .patch(userController.updateOne)
  .delete(userController.deleteOne)

router.get('/:id/orders/:status', userController.getUserOrders)
router.patch('/:id/change-password', userController.changePassword)

export default router
