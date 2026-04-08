import { ApiError } from '../utils/apiError.js'

export const authorizeRoles = (...allowedRoles) => (req, _res, next) => {
  if (!req.user) {
    return next(new ApiError('Unauthorized.', 401))
  }

  if (!allowedRoles.includes(req.user.role)) {
    return next(new ApiError('Forbidden. You do not have permission.', 403))
  }

  return next()
}
