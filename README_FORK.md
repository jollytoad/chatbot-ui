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
- Add an explicit `/logout` route
- Check 'x-forwarded-*' headers for original public URL

## Deployment to Supabase

### Create Supabase project

- Name
- Database password (will be required later when linking to the project)
- Region

### Configure auth

- Disable email provider
- Enable and configure an OAuth provider (can do this later if necessary)

### Push database schema

```sh
supabase login
```

Obtain your Supabase project `Reference ID` from the `Project Settings` > `General` page.

```sh
supabase link --project-ref <project-id>
```

You'll be asked for the database password you set when creating the project.

Now push the database schema...

```sh
supabase db push
```

### Add secrets to the Vault

In the Supabase UI...

From `Project Settings` > `API`...

- Copy `Project URL` & the `service_role` API key.

In `Project Settings` > `Vault` page, using `Add new secret` create the secrets:

- `project_url`
- `service_role_key`

using the values copied from the `API` page above.

(You may also need to create an encryption key the first you create a secret)

## Deployment to Vercel

_TODO_

Follow original [instructions](./README.md#3-set-up-frontend-with-vercel) for now.

You'll also need to add an additional environment variable:

- `AUTH_PROVIDER` - with the identifier of the provider selected in Supabase (eg. `google`)

Once deployed, you'll need to go back to Supabase UI and in `Authentication` > `URL Configuration`,
set `Site URL` to match your Vercel app URL.

## Build Docker container

```sh
docker build -t chatbot-ui-org-docker .
```

and to run locally:

```sh
docker run -p 3000:3000 chatbot-ui-org-docker
```

## Deployment to Kubernetes

_TODO_?
