-- Add unique constraint to user_id in user_onboarding table
ALTER TABLE user_onboarding 
ADD CONSTRAINT user_onboarding_user_id_key UNIQUE (user_id);

-- Add trigger to automatically create onboarding record when user is created
CREATE OR REPLACE FUNCTION create_onboarding_record()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_onboarding (
    user_id,
    user_info_completed,
    cv_uploaded,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    false,
    false,
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_onboarding_after_user_insert
  AFTER INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION create_onboarding_record();