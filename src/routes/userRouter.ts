import express from 'express'
import userController from '../controllers/userController'
import authController from '../controllers/authController'

const router = express.Router()

router.post('/login', authController.login)
router.post('/signup', authController.signup)
router.patch('/:id/change-password', userController.changePassword)

router
  .route('/')
  .get(authController.protect, userController.getAll)
  .post(authController.protect, userController.createOne)

router
  .route('/:id')
  .get(authController.protect, userController.getOne)
  .patch(authController.protect, userController.updateOne)
  .delete(authController.protect, userController.deleteOne)

export default router
