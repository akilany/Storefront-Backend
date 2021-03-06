import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import { User, UserStore } from '../models/userModel'

const store = new UserStore()
const jwtCookieExpiresIn = process.env
  .JWT_COOKIE_EXPIRES_IN as unknown as number

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

const createSendToken = (
  user: User,
  statusCode: number,
  req: Request,
  res: Response
) => {
  const token = signToken(user.id as string)

  // Send JWT cookie
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + jwtCookieExpiresIn * 24 * 60 * 60 * 1000),
    httpOnly: true,
  })

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  })
}

const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token
    // 1) Getting token and check if it's true
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in! Please log in to get access.',
      })
    }

    // 2) Verification token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload

    // 3) Check if user still exists
    const user = await store.show(decoded.id)
    if (!user)
      return res.status(401).json({
        status: 'fail',
        message: 'This user does no longer exist.',
      })

    next()
  }
)

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400))
    }

    const user = await store.auth(email, password)
    if (!user) {
      return next(new AppError('Invalid email or password', 401))
    }

    createSendToken(user, 200, req, res)
  }
)

const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { first_name, last_name, email, password } = req.body
    if (!first_name || !last_name || !email || !password) {
      return next(
        new AppError(
          'Please provide your first_name, last_name, email and password!',
          400
        )
      )
    }

    const user = await store.create({ first_name, last_name, email, password })

    createSendToken(user, 201, req, res)
  }
)

export default {
  protect,
  login,
  signup,
}
