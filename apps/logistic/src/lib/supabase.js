import { createSupabaseBrowserClient } from '@platform/shared/supabase'

export const supabase = createSupabaseBrowserClient({
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
})
