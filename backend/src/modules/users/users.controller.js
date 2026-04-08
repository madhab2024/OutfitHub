import { successResponse } from '@platform/shared/utils'

import { usersService } from './users.service.js'

export const getMyProfile = async (req, res) => {
  const profile = await usersService.getProfile(req.user.id)

  res.status(200).json(
    successResponse({
      message: 'Profile fetched.',
      data: profile,
    }),
  )
}

export const getAllUsers = async (_req, res) => {
  const users = await usersService.listUsers()

  res.status(200).json(
    successResponse({
      message: 'Users list fetched.',
      data: users,
    }),
  )
}