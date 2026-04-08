import { supabaseAdmin } from '../../config/supabase.js'

const TABLE = 'delivery_tracking'

export const deliveryService = {
  getByOrderId: async (orderId) => {
    const { data, error } = await supabaseAdmin
      .from(TABLE)
      .select('*')
      .eq('order_id', orderId)
      .order('updated_at', { ascending: false })

    if (error) {
      throw error
    }

    return data
  },

  upsertTracking: async ({ orderId, status, location, eta }) => {
    const { data, error } = await supabaseAdmin
      .from(TABLE)
      .upsert(
        {
          order_id: orderId,
          status,
          location,
          eta,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'order_id',
        },
      )
      .select('*')

    if (error) {
      throw error
    }

    return data
  },
}