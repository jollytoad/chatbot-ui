import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { Provider } from "@supabase/supabase-js"

export const runtime = "edge"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  console.log("login", requestUrl.href)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: process.env.AUTH_PROVIDER! as Provider,
    options: {
      redirectTo: requestUrl.origin + "/auth/callback"
    }
  })

  if (error) {
    console.log(error)
    return NextResponse.error()
  }

  return NextResponse.redirect(data.url)
}
