# QuickNotes AI - Assessment Repository

**Format**: 2-hour live coding session with 3 phases
**Duration**: 15 min briefing + 75 min execution + 30 min debrief
**Submission**: Fork → Implement → PR + recording

---

## For Candidates

**Start here**: [README.md](README.md)

This contains everything you need:
- What the 3 phases are
- What the 4 required features are
- How to set up and run the project
- How to record and submit your work

**Quick reference**: [QUICK_START.md](QUICK_START.md)

---

## Assessment Format

### Phase 1: Briefing (15 min)
- Evaluator explains the project
- Ask clarifying questions
- Fork repo and start Docker

### Phase 2: Execution (75 min) - ALONE, Recording
- Record your screen with Loom
- Think out loud while coding
- Implement 4 required features
- **STRICT TIME LIMIT: 75 minutes**

### Phase 3: Debrief (30 min)
- Evaluator reviews your code and recording
- Discuss implementation decisions
- Technical Q&A

---

## What You'll Build

4 required features (75 minutes):

1. **Connect to Database** - Replace hardcoded notes with real data from Supabase
2. **Create Note** - Implement "+ New Note" functionality
3. **Delete Note** - Implement "Delete" button functionality
4. **AI Summarize** - Integrate OpenAI to summarize all user notes

---

## Project Structure

```
quicknotes-ai/
│
├── app/                          # Next.js Application
│   ├── app/
│   │   ├── page.tsx             # Main notes page (YOUR STARTING POINT)
│   │   ├── login/               # Auth (already working)
│   │   └── ...
│   ├── components/ui/           # shadcn/ui components
│   ├── lib/supabase/            # Supabase clients
│   └── ...
│
├── supabase/
│   ├── migrations/              # Database schema (auto-runs)
│   └── seed/                    # Test data (optional)
│
├── docker-compose.yml           # Full stack setup
├── .env                         # Environment variables (pre-configured)
├── README.md                    # Main instructions
└── QUICK_START.md              # Quick reference
```

---

## What's Pre-Built

You receive a working foundation:
- ✅ Next.js 14 + TypeScript
- ✅ Supabase auth (login/signup works)
- ✅ Database with RLS policies
- ✅ UI components (shadcn/ui)
- ✅ Docker setup (one command)
- ✅ Static notes page (3 hardcoded notes)

Focus your time on implementing the 4 features.

---

## Evaluation Criteria

You'll be evaluated on:

1. **Functionality** (40%) - Do the 4 features work correctly?
2. **Code Quality** (25%) - Clean, organized, well-structured code?
3. **Problem Solving** (20%) - How do you approach and solve challenges?
4. **Communication** (15%) - Can you explain your thinking clearly?

---

## Recording Requirements

**Critical**: You MUST record during Phase 2.

**Required:**
- ✅ Screen recording (full screen or IDE)
- ✅ Audio recording (thinking out loud)
- ✅ 75 minutes of coding

**Recommended tool:** Loom (https://www.loom.com)

**Why:** Shows your problem-solving process, debugging approach, and communication skills.

---

## Technical Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI**: shadcn/ui components
- **Backend**: Next.js Server Actions
- **Database**: PostgreSQL via Supabase
- **Auth**: Supabase Auth
- **AI**: OpenAI API (pre-configured)
- **Infrastructure**: Docker Compose

---

## Quick Start

```bash
# 1. Fork the repo (evaluator will share link)

# 2. Clone YOUR fork
git clone https://github.com/YOUR-USERNAME/quicknotes-ai.git
cd quicknotes-ai

# 3. Create branch
git checkout -b feature/implementation

# 4. Start everything
docker-compose up

# 5. Verify
# App: http://localhost:3000
# Supabase: http://localhost:3001
```

---

## File Guide

| File | Purpose |
|------|---------|
| `README.md` | Complete candidate instructions |
| `QUICK_START.md` | Quick reference guide |
| `INDEX.md` | This file - project overview |
| `app/app/page.tsx` | **YOUR STARTING POINT** - has TODOs |
| `.env` | Environment variables (pre-configured) |

---

## Need Help?

- Read the [README.md](README.md) for complete instructions
- Check [QUICK_START.md](QUICK_START.md) for fast reference
- Review TODO comments in `app/app/page.tsx`
- Ask questions during the briefing phase

---

**Good luck! Focus on solving the 4 features methodically and communicating your thought process.** 🚀
