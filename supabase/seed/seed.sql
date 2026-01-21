-- ============================================
-- Seed Data for QuickNotes AI
-- ============================================
-- This script creates a test user and sample notes
-- Execute this in Supabase Studio SQL Editor if you want test data
--
-- Test User Credentials:
-- Email: test@example.com
-- Password: password123
-- ============================================

-- Note: Creating users via SQL is not recommended in production
-- This is only for development/testing purposes

-- Insert a test user (you'll need to sign up normally through the app)
-- The following notes will work for any authenticated user

-- Sample notes (replace 'YOUR_USER_ID' with actual user ID from auth.users)
-- You can find your user ID after signing up by running:
-- SELECT id FROM auth.users WHERE email = 'your-email@example.com';

-- Example: After signup, run this query replacing the user_id:
/*
INSERT INTO public.notes (user_id, title, content, created_at) VALUES
(
    'YOUR_USER_ID_HERE',
    'Welcome to QuickNotes AI',
    'This is your first note! You can create, edit, and delete notes. Try the AI Summarize feature to get a summary of all your notes.',
    NOW() - INTERVAL '2 days'
),
(
    'YOUR_USER_ID_HERE',
    'Meeting Notes - Project Kickoff',
    'Discussed project timeline and deliverables. Team agreed on weekly sprints. Next meeting scheduled for Friday at 2 PM. Action items: 1) Set up repository, 2) Create initial wireframes, 3) Schedule design review.',
    NOW() - INTERVAL '1 day'
),
(
    'YOUR_USER_ID_HERE',
    'Ideas for New Features',
    'Consider adding: dark mode, markdown support, tagging system, and search functionality. Priority: search first. Dark mode could improve user experience significantly.',
    NOW() - INTERVAL '12 hours'
),
(
    'YOUR_USER_ID_HERE',
    'Shopping List',
    'Groceries needed: milk, eggs, bread, coffee, fruits (apples, bananas), vegetables (carrots, broccoli), chicken, rice, pasta sauce.',
    NOW() - INTERVAL '6 hours'
),
(
    'YOUR_USER_ID_HERE',
    'Book Recommendations',
    'Fiction: "The Midnight Library" by Matt Haig, "Project Hail Mary" by Andy Weir. Non-fiction: "Atomic Habits" by James Clear, "The Psychology of Money" by Morgan Housel.',
    NOW() - INTERVAL '3 hours'
);
*/

-- Instructions:
-- 1. Sign up through the app first
-- 2. Go to Supabase Studio (http://localhost:3001)
-- 3. Navigate to SQL Editor
-- 4. Run: SELECT id FROM auth.users WHERE email = 'your-email@example.com';
-- 5. Copy your user ID
-- 6. Uncomment the INSERT statement above
-- 7. Replace 'YOUR_USER_ID_HERE' with your actual user ID
-- 8. Execute the query

SELECT 'Seed file loaded. Follow instructions in comments to add test data.' as message;
