import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw Error("Supabase public url is empty, check .env vars");
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw Error("Supabase anon key is empty, check .env vars");
  }
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}