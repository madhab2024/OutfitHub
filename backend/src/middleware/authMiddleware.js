import { getSupabaseForToken } from '../config/supabase.js'
import { ApiError } from '../utils/apiError.js'

export const authenticate = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization || ''
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.replace('Bearer ', '')
      : null

    if (!token) {
      throw new ApiError('Access token is required.', 401)
    }

    const supabase = getSupabaseForToken(token)
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      throw new ApiError('Invalid or expired token.', 401, error?.message)
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.user_metadata?.role || 'customer',
      accessToken: token,
    }

    next()
  } catch (error) {
    next(error)
  }
}
