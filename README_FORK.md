# Chatbot UI - the 'Organization' Fork

The open-source AI chat app for ~everyone~ organizations.

<img src="./public/readme/screenshot.png" alt="Chatbot UI" width="600">

This is a fork of the excellent [Chatbot-UI](https://github.com/mckaywrigley/chatbot-ui).

## What's different in this fork?

- Use OAuth/OIDC authentication provider, as declared in the `AUTH_PROVIDER` env var
- Removed email/password signup/login page
- Pre-populate profile details from raw user auth data
- Allow profile name to be readonly
- Skip API keys in setup - relying on pre-configured env var keys instead
- Obtain `project_url` & `service_role_key` from the `Vault` instead of hardcoding
