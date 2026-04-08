import { parsePagination } from '@platform/shared/utils'

import { supabaseAdmin } from '../../config/supabase.js'

const TABLE = 'orders'

export const ordersService = {
  createOrder: async (payload, user) => {
    const orderPayload = {
      ...payload,
      customer_id: user.id,
      status: payload.status || 'pending',
    }

    const { data, error } = await supabaseAdmin
      .from(TABLE)
      .insert(orderPayload)
      .select('*')
      .single()

    if (error) {
      throw error
    }

    return data
  },

  listOrders: async ({ page, limit }, user) => {
    const { offset, limit: safeLimit } = parsePagination({ page, limit })

    let query = supabaseAdmin
      .from(TABLE)
      .select('*', { count: 'exact' })
      .range(offset, offset + safeLimit - 1)
      .order('created_at', { ascending: false })

    if (user.role === 'customer') {
      query = query.eq('customer_id', user.id)
    }

    const { data, count, error } = await query

    if (error) {
      throw error
    }

    return { items: data, total: count || 0 }
  },

  updateOrderStatus: async (id, status) => {
    const { data, error } = await supabaseAdmin
      .from(TABLE)
      .update({ status })
      .eq('id', id)
      .select('*')
      .single()

    if (error) {
      throw error
    }

    return data
  },
}