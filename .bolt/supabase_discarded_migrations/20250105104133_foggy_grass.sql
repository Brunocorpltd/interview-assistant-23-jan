-- Create a stored procedure to handle new user creation
CREATE OR REPLACE FUNCTION create_new_user(
  user_id UUID,
  user_email TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert into users table
  INSERT INTO users (
    id,
    email,
    created_at,
    updated_at
  ) VALUES (
    user_id,
    user_email,
    NOW(),
    NOW()
  );

  -- Create onboarding record
  INSERT INTO user_onboarding (
    user_id,
    user_info_completed,
    cv_uploaded,
    created_at,
    updated_at
  ) VALUES (
    user_id,
    false,
    false,
    NOW(),
    NOW()
  );
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION create_new_user(UUID, TEXT) TO authenticated;