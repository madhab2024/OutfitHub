import { successResponse } from '@platform/shared/utils'

import { authService } from './auth.service.js'

export const signUp = async (req, res) => {
  const { email, password, role } = req.body
  const data = await authService.signUp({ email, password, role })

  res.status(201).json(
    successResponse({
      message: 'Signup successful.',
      data,
    }),
  )
}

export const signIn = async (req, res) => {
  const { email, password } = req.body
  const data = await authService.signIn({ email, password })

  res.status(200).json(
    successResponse({
      message: 'Signin successful.',
      data,
    }),
  )
}

export const getMe = async (req, res) => {
  const user = await authService.getCurrentUser(req.user.accessToken)

  res.status(200).json(
    successResponse({
      message: 'Current user fetched.',
      data: user,
    }),
  )
}