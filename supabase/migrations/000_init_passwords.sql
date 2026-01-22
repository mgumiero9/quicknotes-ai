-- ============================================
-- Initialize Supabase Role Passwords
-- ============================================
-- This script sets passwords for Supabase roles
-- Must run as supabase_admin (superuser)
-- ============================================

\connect - supabase_admin

-- Set password for authenticator role
ALTER ROLE authenticator WITH PASSWORD 'postgres';

-- Set password for supabase_auth_admin role
ALTER ROLE supabase_auth_admin WITH PASSWORD 'postgres';

-- Set password for supabase_storage_admin role
ALTER ROLE supabase_storage_admin WITH PASSWORD 'postgres';

-- Set password for anon role
ALTER ROLE anon WITH PASSWORD 'postgres';

-- Set password for authenticated role
ALTER ROLE authenticated WITH PASSWORD 'postgres';

-- Set password for service_role
ALTER ROLE service_role WITH PASSWORD 'postgres';

SELECT 'Supabase roles configured with passwords' as message;
