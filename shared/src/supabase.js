import { createClient } from '@supabase/supabase-js'

export const createSupabaseBrowserClient = ({ supabaseUrl, supabaseAnonKey }) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anon key.')
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

export const createSupabaseServerClient = ({
  supabaseUrl,
  supabaseAnonKey,
  accessToken,
}) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anon key.')
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {},
    },
  })
}

export const createSupabaseServiceRoleClient = ({
  supabaseUrl,
  supabaseServiceRoleKey,
}) => {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing Supabase URL or service role key.')
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey)
}
