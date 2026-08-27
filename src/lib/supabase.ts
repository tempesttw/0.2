import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export type Member = {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  cpf: string;
  plan: 'mensal' | 'trimestral' | 'anual';
  status: string;
  created_at: string;
};
