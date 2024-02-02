/**
 * Get the public URL of the request.
 */
export function publicUrl(request: Request): URL {
  const requestUrl = new URL(request.url)

  const forwardedProto = request.headers.get("x-forwarded-proto")
  const forwardedHost =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host")

  if (forwardedHost) {
    if (forwardedProto && forwardedProto !== requestUrl.protocol.slice(0, -1)) {
      requestUrl.protocol = forwardedProto
    }
    if (forwardedHost !== requestUrl.host) {
      requestUrl.host = forwardedHost

      if (!forwardedHost.includes(":")) {
        requestUrl.port = ""
      }
    }
  }

  return requestUrl
}
