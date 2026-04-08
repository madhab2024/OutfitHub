import { Router } from 'express'

import { authenticate } from '../../middleware/authMiddleware.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { getMe, signIn, signUp } from './auth.controller.js'

export const authRouter = Router()

authRouter.post('/signup', asyncHandler(signUp))
authRouter.post('/signin', asyncHandler(signIn))
authRouter.get('/me', authenticate, asyncHandler(getMe))