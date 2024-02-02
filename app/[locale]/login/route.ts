import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { Provider } from "@supabase/supabase-js"
import { publicUrl } from "@/lib/public-url"

export const runtime = "edge"

export async function GET(request: Request) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: process.env.AUTH_PROVIDER! as Provider,
    options: {
      redirectTo: new URL("/auth/callback?next=%2Fchat", publicUrl(request))
        .href
    }
  })

  if (error) {
    console.error(error)
    return NextResponse.error()
  }

  return NextResponse.redirect(data.url)
}
