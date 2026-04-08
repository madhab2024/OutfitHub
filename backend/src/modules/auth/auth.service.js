import { createSupabaseBrowserClient } from '@platform/shared/supabase'

import { env } from '../../config/env.js'

const publicSupabase = createSupabaseBrowserClient({
  supabaseUrl: env.supabaseUrl,
  supabaseAnonKey: env.supabaseAnonKey,
})

export const authService = {
  signUp: async ({ email, password, role = 'customer' }) => {
    const { data, error } = await publicSupabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
        },
      },
    })

    if (error) {
      throw error
    }

    return data
  },

  signIn: async ({ email, password }) => {
    const { data, error } = await publicSupabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    }

    return data
  },

  getCurrentUser: async (accessToken) => {
    const { data, error } = await publicSupabase.auth.getUser(accessToken)

    if (error) {
      throw error
    }

    return data.user
  },
}