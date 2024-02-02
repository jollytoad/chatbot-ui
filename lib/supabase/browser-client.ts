import { Database } from "@/supabase/types"
import { createBrowserClient } from "@supabase/ssr"

export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
    document.head
      .querySelector('meta[name="NEXT_PUBLIC_SUPABASE_URL"]')
      ?.getAttribute("content")!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    document.head
      .querySelector('meta[name="NEXT_PUBLIC_SUPABASE_ANON_KEY"]')
      ?.getAttribute("content")!
)
