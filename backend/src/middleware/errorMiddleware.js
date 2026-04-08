import { errorResponse } from '@platform/shared/utils'

export const notFoundHandler = (_req, res) => {
  res.status(404).json(
    errorResponse({
      message: 'Route not found.',
    }),
  )
}

export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || 500

  res.status(statusCode).json(
    errorResponse({
      message: error.message || 'Internal server error.',
      details: error.details || null,
    }),
  )
}
