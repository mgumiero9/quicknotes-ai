# QuickNotes AI - Technical Assessment

Welcome! This is a **2-hour live coding assessment** where you'll complete a partially built note-taking application with AI capabilities.

---

## Assessment Format

This assessment has **3 phases**:

### Phase 1: Briefing (15 minutes)
- Evaluator explains the project and answers your questions
- Fork the repository and set up your environment

### Phase 2: Execution (75 minutes) - RECORDING YOURSELF
- **You'll be ALONE** (evaluator not present)
- **Record your screen and audio** (Loom recommended)
- **Think out loud** - Explain your reasoning as you code
- Implement the 4 required features
- **STRICT TIME LIMIT: 75 minutes**

### Phase 3: Debrief (30 minutes)
- Evaluator will have reviewed your code and recording
- Discuss your implementation decisions and approach
- Technical Q&A

---

## What You'll Build

### Already Implemented

The foundation is ready:
- ✅ Next.js 14 with App Router and TypeScript
- ✅ Authentication (login/signup working)
- ✅ PostgreSQL database with Supabase
- ✅ UI components (Tailwind CSS + shadcn/ui)
- ✅ Docker setup (one command to run)
- ✅ Static notes page with hardcoded data

### Your Tasks - 4 Required Features

You **MUST** implement these features:

#### 1. Connect Notes to Database
- Replace hardcoded notes in `app/app/page.tsx` with real data from Supabase
- Fetch notes for the logged-in user only
- Display in the existing card layout

#### 2. Create New Note
- Implement the "+ New Note" button
- Allow users to create notes with title and content
- Save to Supabase and update the UI

#### 3. Delete Note
- Implement the "Delete" button on each note card
- Remove from database and update the UI

#### 4. AI Summarize Feature
- Implement the "AI Summarize" button
- Fetch all user notes and send to OpenAI
- Generate a summary of all notes
- Display the result

---

## Getting Started

### Setup (During Briefing Phase)

1. **Fork the repository** (evaluator will share the link)

2. **Clone your fork**:
```bash
git clone https://github.com/YOUR-USERNAME/quicknotes-ai.git
cd quicknotes-ai
```

3. **Create your working branch**:
```bash
git checkout -b feature/implementation
```

4. **Start the application**:
```bash
docker-compose up
```

Wait ~60 seconds for services to start.

5. **Verify everything works**:
- App: http://localhost:3000
- Supabase Studio: http://localhost:3001
- Create an account and login

### During Execution Phase (75 minutes)

**When evaluator says "START":**

1. **START YOUR RECORDING** (Loom, Zoom, or similar)
2. Say the current time out loud
3. Open `app/app/page.tsx` - this file contains TODO comments
4. Begin implementing the 4 features
5. **Think out loud** constantly - explain what you're doing and why

**When time is up (75 minutes):**

1. **STOP CODING** immediately
2. Commit your work:
```bash
git add .
git commit -m "Complete assessment: [list features completed]"
git push origin feature/implementation
```
3. **STOP YOUR RECORDING**
4. Upload video (Loom/YouTube unlisted)
5. Create Pull Request in YOUR fork
6. Send evaluator:
   - PR link
   - Recording link

---

## Recording Requirements

### You MUST Record

- ✅ Screen recording (full screen or IDE only)
- ✅ Audio recording (microphone on)
- ✅ **Think out loud** the entire time

### What We're Evaluating

- Problem-solving approach
- Debugging process
- Decision-making
- Communication skills
- Code quality

### Before Starting

- [ ] Recording software ready (Loom: https://www.loom.com)
- [ ] Microphone working
- [ ] Test record 10 seconds to verify

---

## Project Structure

```
app/
├── app/
│   ├── page.tsx              # ← START HERE (has TODOs)
│   ├── login/
│   │   ├── page.tsx          # Auth working
│   │   └── actions.ts        # Server actions example
│   └── ...
├── components/ui/            # shadcn/ui components
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # Client-side Supabase
│   │   ├── server.ts         # Server-side Supabase
│   │   └── types.ts
│   └── utils.ts
└── middleware.ts
```

---

## Database Schema

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

Row Level Security (RLS) is configured - users can only access their own notes.

---

## Technical Resources

- **Supabase Client (Server)**: `import { createClient } from '@/lib/supabase/server'`
- **OpenAI**: Already configured via `OPENAI_API_KEY` environment variable
- **UI Components**: Available in `components/ui/`
- **Database Studio**: http://localhost:3001 to view your data in real-time

### Useful Commands

```bash
# View logs
docker-compose logs -f app

# Restart app
docker-compose restart app

# Stop everything
docker-compose down

# Fresh start (deletes data)
docker-compose down -v && docker-compose up
```

---

## Evaluation Criteria

You'll be evaluated on:

1. **Functionality** (40%) - Do the features work correctly?
2. **Code Quality** (25%) - Clean, organized, well-structured code?
3. **Problem Solving** (20%) - How do you approach and solve challenges?
4. **Communication** (15%) - Can you explain your thinking clearly?

**Important**: We care more about **HOW** you solve problems than getting everything perfect.

---

## Tips for Success

### Time Management
- Don't get stuck on one feature for too long
- Start with basic implementations first
- Test as you go
- Commit frequently

### Communication
- **Think out loud constantly** - "I'm going to...", "This should...", "The error is..."
- Explain your decisions: "I'm using a Server Action because..."
- Narrate what you're debugging: "Let me check the console..."

### If You Get Stuck
- Read error messages carefully
- Check how auth is implemented (good reference)
- Review the TODO comments in the code
- Google and AI assistants (ChatGPT/Copilot) are allowed - just explain your usage

### What to Avoid
- ❌ Working in silence
- ❌ Spending too much time on UI polish
- ❌ Going over the 75-minute limit
- ❌ Forgetting to commit and push
- ❌ Forgetting to share your recording

---

## Troubleshooting

### Docker won't start
```bash
docker-compose down -v
docker-compose up
```

### Port already in use
```bash
lsof -ti:3000 | xargs kill  # Mac/Linux
```

### Database not connecting
- Wait 60 seconds after startup
- Check: `docker-compose ps` (all should be "healthy")

### Can't record
- Loom (easiest): https://www.loom.com
- Zoom: Start meeting → Share screen → Record
- QuickTime (Mac): File → New Screen Recording

---

## Ready to Start?

When the evaluator says **"Begin your 75 minutes"**:

1. ✅ Start recording
2. ✅ Say current time out loud
3. ✅ Open `app/app/page.tsx`
4. ✅ Read the TODO comments
5. ✅ Start with Feature 1
6. ✅ Think out loud
7. ✅ Code methodically

**Good luck! Show us how you think and solve problems.** 🚀
