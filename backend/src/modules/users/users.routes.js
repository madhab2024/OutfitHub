import { Router } from 'express'

import { authenticate } from '../../middleware/authMiddleware.js'
import { authorizeRoles } from '../../middleware/roleMiddleware.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { getAllUsers, getMyProfile } from './users.controller.js'

export const userRouter = Router()

userRouter.get('/profile', authenticate, asyncHandler(getMyProfile))
userRouter.get(
  '/',
  authenticate,
  authorizeRoles('admin'),
  asyncHandler(getAllUsers),
)