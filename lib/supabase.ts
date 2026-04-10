import { createClient } from '@supabase/supabase-js'

// Estas variáveis buscam os dados do arquivo .env.local que vamos configurar
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Atenção: Supabase URL ou Anon Key não configurados no arquivo .env.local')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)