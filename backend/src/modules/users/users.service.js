import { supabaseAdmin } from '../../config/supabase.js'

export const usersService = {
  getProfile: async (userId) => {
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId)

    if (error) {
      throw error
    }

    return data.user
  },

  listUsers: async () => {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers()

    if (error) {
      throw error
    }

    return data.users
  },
}