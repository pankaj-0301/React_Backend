import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xhkzhhbjqvevngswirur.supabase.co'; // Same as in React Native
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhoa3poaGJqcXZldm5nc3dpcnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMDEzNjgsImV4cCI6MjA1NzY3NzM2OH0.lztvDv8VUHotHTayQJhUr2VVOOKuTqMZ9kWemeDz4PQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
