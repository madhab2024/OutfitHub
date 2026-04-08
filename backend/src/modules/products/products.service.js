import { parsePagination } from '@platform/shared/utils'

import { supabaseAdmin } from '../../config/supabase.js'

const TABLE = 'products'

export const productsService = {
  listProducts: async ({ page, limit, search }) => {
    const { offset, limit: safeLimit } = parsePagination({ page, limit })

    let query = supabaseAdmin
      .from(TABLE)
      .select('*', { count: 'exact' })
      .range(offset, offset + safeLimit - 1)
      .order('created_at', { ascending: false })

    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    const { data, count, error } = await query

    if (error) {
      throw error
    }

    return { items: data, total: count || 0 }
  },

  getProductById: async (id) => {
    const { data, error } = await supabaseAdmin
      .from(TABLE)
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw error
    }

    return data
  },

  createProduct: async (payload) => {
    const { data, error } = await supabaseAdmin
      .from(TABLE)
      .insert(payload)
      .select('*')
      .single()

    if (error) {
      throw error
    }

    return data
  },

  updateProduct: async (id, payload) => {
    const { data, error } = await supabaseAdmin
      .from(TABLE)
      .update(payload)
      .eq('id', id)
      .select('*')
      .single()

    if (error) {
      throw error
    }

    return data
  },

  deleteProduct: async (id) => {
    const { error } = await supabaseAdmin.from(TABLE).delete().eq('id', id)

    if (error) {
      throw error
    }

    return true
  },
}