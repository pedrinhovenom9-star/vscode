import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ghkojjklfjckxnbhoztr.supabase.co/'
const supabaseKey = 'sb_publishable_mfgEKBx9ExW6ePJZg0TU5g_pk96c4wS'

export const supabase = createClient(supabaseUrl, supabaseKey)