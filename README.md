# QuickNotes AI - Technical Assessment

Welcome to the QuickNotes AI technical assessment! This is a **partially built** note-taking application with AI capabilities. Your task is to complete the missing functionality.

## Time Allocation: 75 minutes

Please manage your time wisely. The core requirements should take priority over stretch goals.

---

## What's Already Implemented

We've set up the foundation for you:

- ✅ **Next.js 14** with App Router and TypeScript
- ✅ **Authentication** with Supabase (login/signup working)
- ✅ **Database schema** with `notes` table and Row Level Security (RLS)
- ✅ **UI components** using Tailwind CSS and shadcn/ui
- ✅ **Basic layout** with header and navigation
- ✅ **Static notes page** showing 3 hardcoded notes

---

## Your Tasks

### Core Requirements (Must Complete)

These are the **required** features you must implement:

1. **Connect Notes to Database**
   - Replace the hardcoded notes in `app/page.tsx` with real data from Supabase
   - Fetch notes for the currently logged-in user
   - Display notes in the same card layout

2. **Create New Note**
   - Add functionality to the "+ New Note" button
   - Can be a modal dialog or inline form (your choice)
   - Save new notes to Supabase
   - Refresh the page or update the UI to show the new note

3. **Delete Note**
   - Add functionality to the "Delete" button on each note card
   - Remove the note from Supabase
   - Update the UI to reflect the deletion

4. **AI Summarize Feature**
   - Implement the "AI Summarize" button
   - Fetch all user notes and send them to OpenAI API
   - Generate a summary paragraph combining all notes
   - Display the summary to the user (your choice of UI)

### Stretch Goals (If Time Permits)

If you finish early, consider implementing:

- 🎯 Search or filter notes
- 🎯 Edit existing notes (inline or modal)
- 🎯 Better error handling and user feedback
- 🎯 Loading states and optimistic updates
- 🎯 Input validation

---

## Getting Started

### Prerequisites

- Docker and Docker Compose installed
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Setup Instructions

1. **Clone the repository** (or extract the provided archive)

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Add your OpenAI API key**

   Edit `.env` and replace `your_openai_api_key_here` with your actual key:
   ```env
   OPENAI_API_KEY=sk-...
   ```

4. **Start the application**
   ```bash
   docker-compose up
   ```

   This single command will:
   - Start Supabase (PostgreSQL, Auth, API)
   - Start the Next.js development server
   - Run database migrations
   - Set up everything you need

5. **Access the application**
   - **App**: http://localhost:3000
   - **Supabase Studio** (database viewer): http://localhost:3001

6. **Create an account**
   - Go to http://localhost:3000
   - Click "Sign up" and create a test account
   - You'll be redirected to the notes page

---

## Project Structure

```
app/
├── app/
│   ├── page.tsx              # Main notes page (TODO: fetch real data)
│   ├── login/
│   │   ├── page.tsx          # Login/signup page (✅ working)
│   │   └── actions.ts        # Auth actions (✅ working)
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   └── ui/                   # shadcn/ui components (✅ ready to use)
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── textarea.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # Client-side Supabase client
│   │   └── server.ts         # Server-side Supabase client
│   └── utils.ts              # Utility functions
└── middleware.ts             # Session management

supabase/
├── migrations/
│   └── 001_init.sql          # Database schema (✅ auto-run)
└── seed/
    └── seed.sql              # Optional test data

docker-compose.yml            # Docker configuration
.env.example                  # Environment template
```

---

## Helpful Resources

### Database Schema

The `notes` table has the following structure:

```sql
notes (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Supabase Client Usage

**Fetching notes:**
```typescript
const supabase = await createClient()
const { data: notes } = await supabase
  .from('notes')
  .select('*')
  .order('created_at', { ascending: false })
```

**Creating a note:**
```typescript
const { data, error } = await supabase
  .from('notes')
  .insert({
    user_id: user.id,
    title: 'Note title',
    content: 'Note content'
  })
  .select()
  .single()
```

**Deleting a note:**
```typescript
const { error } = await supabase
  .from('notes')
  .delete()
  .eq('id', noteId)
```

### OpenAI API Usage

**Example summarization:**
```typescript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const response = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'system',
      content: 'You are a helpful assistant that summarizes notes.'
    },
    {
      role: 'user',
      content: `Summarize these notes: ${notesText}`
    }
  ]
})

const summary = response.choices[0].message.content
```

### Next.js Server Actions

You can use Server Actions for form submissions and mutations:

```typescript
'use server'

export async function createNote(formData: FormData) {
  const supabase = await createClient()
  // ... your logic
}
```

---

## Testing Your Implementation

### Manual Testing Checklist

- [ ] Can create a new note and see it in the list
- [ ] Can delete a note and see it removed from the list
- [ ] Notes persist after page refresh
- [ ] AI Summarize generates a meaningful summary
- [ ] Only my notes are visible (not other users' notes)
- [ ] Auth works (logout and login again)

### Using Supabase Studio

1. Go to http://localhost:3001
2. Navigate to "Table Editor" → "notes"
3. View, edit, or delete notes directly
4. Check that RLS policies are working (you should only see your notes)

---

## Important Considerations

As you implement the features, think about:

- **Security**: Are you validating user input? Could malicious data be injected?
- **Error Handling**: What happens if the database is unavailable? If OpenAI fails?
- **User Experience**: Are there loading states? Confirmation dialogs for destructive actions?
- **Scalability**: What if a user has 1000 notes? Should you paginate?
- **Privacy**: What if notes contain sensitive data (PII)? Should you sanitize before sending to AI?

---

## Getting Help

### Common Issues

**Port already in use:**
```bash
docker-compose down
docker-compose up
```

**Database not initialized:**
```bash
docker-compose down -v  # WARNING: This deletes all data
docker-compose up
```

**Can't connect to Supabase:**
- Check that all containers are running: `docker-compose ps`
- Wait 30 seconds after startup for services to be ready

**OpenAI API errors:**
- Verify your API key in `.env`
- Check you have credits: https://platform.openai.com/account/usage
- Ensure no extra spaces in the key

### Useful Commands

```bash
# View logs
docker-compose logs -f app

# Restart just the app
docker-compose restart app

# Stop everything
docker-compose down

# Reset database (deletes all data)
docker-compose down -v
docker-compose up
```

---

## Evaluation Criteria

You will be evaluated on:

1. **Functionality** - Does it work as specified?
2. **Code Quality** - Is the code clean, organized, and well-typed?
3. **Problem Solving** - How do you approach challenges?
4. **Security Awareness** - Do you consider security implications?
5. **Communication** - Can you explain your decisions?

---

## Questions?

During the briefing, feel free to ask clarifying questions about:
- Requirements or expected behavior
- Technology usage or best practices
- Anything that's unclear

**Good luck! We're excited to see what you build.** 🚀
