import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
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
