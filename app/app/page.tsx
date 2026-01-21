import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signout } from './login/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function NotesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // TODO: Feature 1 - Connect Notes to Database
  // Replace this hardcoded data with real data from Supabase
  // Fetch notes from the 'notes' table for the current user
  const hardcodedNotes = [
    {
      id: '1',
      title: 'Welcome to QuickNotes AI',
      content:
        'This is your first note! You can create, edit, and delete notes. Try the AI Summarize feature to get a summary of all your notes.',
      created_at: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      title: 'Meeting Notes - Project Kickoff',
      content:
        'Discussed project timeline and deliverables. Team agreed on weekly sprints. Next meeting scheduled for Friday at 2 PM.',
      created_at: '2024-01-16T14:30:00Z',
    },
    {
      id: '3',
      title: 'Ideas for New Features',
      content:
        'Consider adding: dark mode, markdown support, tagging system, and search functionality. Priority: search first.',
      created_at: '2024-01-17T09:15:00Z',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">QuickNotes AI</h1>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <form action={signout}>
            <Button variant="outline" type="submit">
              Sign Out
            </Button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">My Notes</h2>
          <div className="flex gap-3">
            {/* TODO: Feature 4 - AI Summarize
                Create a Server Action that:
                1. Fetches all user notes
                2. Sends to OpenAI API
                3. Returns and displays a summary */}
            <Button variant="secondary" disabled>
              AI Summarize (TODO)
            </Button>

            {/* TODO: Feature 2 - Create New Note
                Implement "+ New Note" button functionality
                Save to Supabase and update UI */}
            <Button>+ New Note (TODO)</Button>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hardcodedNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                  {/* TODO: Feature 3 - Delete Note
                      Remove from database and update UI */}
                  <Button variant="ghost" size="sm" disabled>
                    Delete (TODO)
                  </Button>
                </div>
                <CardDescription>
                  {new Date(note.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 line-clamp-4">
                  {note.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State (hidden when there are notes) */}
        {hardcodedNotes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No notes yet. Create your first note!</p>
            <Button>+ Create Note</Button>
          </div>
        )}
      </main>
    </div>
  )
}
