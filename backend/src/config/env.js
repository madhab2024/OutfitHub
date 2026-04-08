import dotenv from 'dotenv'

dotenv.config()

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  apiPrefix: process.env.API_PREFIX || '/api',
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  razorpayKeyId: process.env.RAZORPAY_KEY_ID,
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET,
}

export const validateEnv = () => {
  const requiredKeys = [
    'supabaseUrl',
    'supabaseAnonKey',
    'supabaseServiceRoleKey',
    'razorpayKeyId',
    'razorpayKeySecret',
  ]

  const missing = requiredKeys.filter((key) => !env[key])
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}
