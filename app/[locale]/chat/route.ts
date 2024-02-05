import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { publicUrl } from "@/lib/public-url"
import { NextResponse } from "next/server"

export const runtime = "edge"

export async function GET(request: Request) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const session = (await supabase.auth.getSession()).data.session

  if (session) {
    const { data: homeWorkspace, error } = await supabase
      .from("workspaces")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("is_home", true)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.redirect(
      new URL(`/${homeWorkspace.id}/chat`, publicUrl(request))
    )
  } else {
    return NextResponse.redirect(new URL("/", publicUrl(request)))
  }
}
