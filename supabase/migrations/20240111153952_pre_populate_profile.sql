set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_profile_and_workspace()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    username TEXT;
    display_name TEXT;
    image_url TEXT;
BEGIN
    -- Obtain profile details from the user data
    username := split_part(COALESCE(NEW.email, 'user' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 16)), '@', 1);
    display_name := COALESCE(NEW.raw_user_meta_data ->> 'name', '');
    image_url := COALESCE(NEW.raw_user_meta_data ->> 'picture', '');

    -- Create a profile for the new user
    INSERT INTO public.profiles(user_id, anthropic_api_key, azure_openai_35_turbo_id, azure_openai_45_turbo_id, azure_openai_45_vision_id, azure_openai_api_key, azure_openai_endpoint, google_gemini_api_key, has_onboarded, image_url, image_path, mistral_api_key, display_name, bio, openai_api_key, openai_organization_id, perplexity_api_key, profile_context, use_azure_openai, username)
    VALUES(
        NEW.id,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        FALSE,
        image_url,
        '',
        '',
        display_name,
        '',
        '',
        '',
        '',
        '',
        FALSE,
        username
    );

    -- Create the home workspace for the new user
    INSERT INTO public.workspaces(user_id, is_home, name, default_context_length, default_model, default_prompt, default_temperature, description, embeddings_provider, include_profile_context, include_workspace_instructions, instructions)
    VALUES(
        NEW.id,
        TRUE,
        'Home',
        4096,
        'gpt-4-1106-preview',
        'You are a friendly, helpful AI assistant.',
        0.5,
        'My home workspace.',
        'openai',
        TRUE,
        TRUE,
        ''
    );

    RETURN NEW;
END;
$function$
;


