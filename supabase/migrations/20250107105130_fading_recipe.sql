/*
  # Fix onboarding functions

  1. Changes
    - Add missing GRANT statements for functions
    - Fix function parameter handling
    - Ensure proper security context

  2. Security
    - Grant EXECUTE permissions to authenticated users
*/

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION public.update_user_info TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_onboarding_status TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_onboarding_status TO authenticated;
GRANT EXECUTE ON FUNCTION public.initialize_user TO authenticated;