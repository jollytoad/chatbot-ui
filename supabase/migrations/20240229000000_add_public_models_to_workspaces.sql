-- FUNCTIONS --

CREATE OR REPLACE FUNCTION add_public_model_to_all_workspaces()
RETURNS TRIGGER
LANGUAGE 'plpgsql'
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO model_workspaces (model_id, workspace_id, user_id)
  SELECT
    NEW.id,
    w.id,
    w.user_id
  FROM
    workspaces w
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION add_public_models_to_new_workspace()
RETURNS TRIGGER
LANGUAGE 'plpgsql'
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO model_workspaces (model_id, workspace_id, user_id)
  SELECT
    m.id,
    NEW.id,
    NEW.user_id
  FROM
    models m
  WHERE
    m.sharing = 'public'
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$;

-- TRIGGERS --

CREATE TRIGGER add_public_model_to_all_workspaces
AFTER INSERT OR UPDATE OF sharing ON models
FOR EACH ROW
WHEN (NEW.sharing = 'public')
EXECUTE PROCEDURE add_public_model_to_all_workspaces();

CREATE TRIGGER add_public_models_to_new_workspace
AFTER INSERT ON workspaces
FOR EACH ROW
EXECUTE PROCEDURE add_public_models_to_new_workspace();
