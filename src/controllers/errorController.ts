//@ts-nocheck
import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/appError'

const handleInvalidFieldsDB = (err) => {
  const message = `Invalid input value: ${err}. Please use correct value!`
  return new AppError(message, 400)
}

const handleUniqueFieldsDB = (err) => {
  const message = `Unique field value: ${err.detail}. Please use another value!`
  return new AppError(message, 400)
}

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401)

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401)

const sendError = (err, req: Request, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

export default (err, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.ENV === 'dev') {
    let error = err
    if (error.code === '23505') error = handleUniqueFieldsDB(error)
    if (error.code === '23502') error = handleInvalidFieldsDB(error)
    if (error.name === 'JsonWebTokenError') error = handleJWTError()
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError()
    sendError(error, req, res)
  }
}
