-- ============================================
-- Seed Data for QuickNotes AI
-- ============================================
-- This creates a database function to add sample notes
-- for new users automatically
-- ============================================

-- Create a function to seed sample notes for a user
CREATE OR REPLACE FUNCTION public.seed_sample_notes_for_user(user_id_param UUID)
RETURNS void AS $$
BEGIN
    -- Check if user already has notes
    IF NOT EXISTS (SELECT 1 FROM public.notes WHERE user_id = user_id_param) THEN
        -- Insert sample notes
        INSERT INTO public.notes (user_id, title, content, created_at) VALUES
        (
            user_id_param,
            'Welcome to QuickNotes AI',
            'This is your first note! You can create, edit, and delete notes. Try the AI Summarize feature to get a summary of all your notes.',
            NOW() - INTERVAL '2 days'
        ),
        (
            user_id_param,
            'Meeting Notes - Project Kickoff',
            'Discussed project timeline and deliverables. Team agreed on weekly sprints. Next meeting scheduled for Friday at 2 PM. Action items: 1) Set up repository, 2) Create initial wireframes, 3) Schedule design review.',
            NOW() - INTERVAL '1 day'
        ),
        (
            user_id_param,
            'Ideas for New Features',
            'Consider adding: dark mode, markdown support, tagging system, and search functionality. Priority: search first. Dark mode could improve user experience significantly.',
            NOW() - INTERVAL '12 hours'
        ),
        (
            user_id_param,
            'Shopping List',
            'Groceries needed: milk, eggs, bread, coffee, fruits (apples, bananas), vegetables (carrots, broccoli), chicken, rice, pasta sauce.',
            NOW() - INTERVAL '6 hours'
        ),
        (
            user_id_param,
            'Book Recommendations',
            'Fiction: "The Midnight Library" by Matt Haig, "Project Hail Mary" by Andy Weir. Non-fiction: "Atomic Habits" by James Clear, "The Psychology of Money" by Morgan Housel.',
            NOW() - INTERVAL '3 hours'
        );

        RAISE NOTICE 'Sample notes created for user %', user_id_param;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger function to automatically seed notes for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Add sample notes for the new user after a short delay
    PERFORM public.seed_sample_notes_for_user(NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users to seed notes for new signups
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

SELECT 'Seed configured! New users will receive sample notes automatically upon signup.' as message;
