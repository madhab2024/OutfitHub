import {
  createSupabaseServerClient,
  createSupabaseServiceRoleClient,
} from '@platform/shared/supabase'
import { env } from './env.js'

export const supabaseAdmin = createSupabaseServiceRoleClient({
  supabaseUrl: env.supabaseUrl,
  supabaseServiceRoleKey: env.supabaseServiceRoleKey,
})

export const getSupabaseForToken = (accessToken) =>
  createSupabaseServerClient({
    supabaseUrl: env.supabaseUrl,
    supabaseAnonKey: env.supabaseAnonKey,
    accessToken,
  })
