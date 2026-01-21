# QuickNotes AI - Assessment Repository Index

This repository contains everything needed to conduct technical assessments for full-stack developers.

---

## 📄 Documentation Files

### For Candidates
- **`README.md`** - Main instructions for candidates (START HERE)
- **`QUICK_START.md`** - Fast setup guide
- **`.env.example`** - Environment variables template

### For Evaluators
- **`EVALUATOR_GUIDE.md`** - Complete guide for running the assessment
- **`SCORECARD.md`** - Scoring template to fill during assessment
- **`QUICK_START.md`** - Fast setup guide (same for both)

---

## 🏗️ Project Structure

```
quicknotes-ai/
│
├── app/                          # Next.js Application
│   ├── app/                      # Next.js App Router pages
│   │   ├── page.tsx             # Main notes page (with TODOs)
│   │   ├── login/               # Auth pages
│   │   ├── layout.tsx           # Root layout
│   │   └── globals.css          # Global styles
│   │
│   ├── components/
│   │   └── ui/                  # shadcn/ui components
│   │
│   ├── lib/
│   │   ├── supabase/            # Supabase clients
│   │   │   ├── client.ts        # Client-side
│   │   │   ├── server.ts        # Server-side
│   │   │   └── types.ts         # TypeScript types
│   │   └── utils.ts             # Utility functions
│   │
│   ├── package.json             # Dependencies
│   ├── Dockerfile               # Docker config for Next.js
│   └── middleware.ts            # Session management
│
├── supabase/                     # Database
│   ├── migrations/
│   │   └── 001_init.sql         # Database schema + RLS
│   └── seed/
│       └── seed.sql             # Optional test data
│
├── .docker/                      # Docker configs
│   └── kong.yml                 # Kong API Gateway config
│
├── docker-compose.yml            # Multi-container setup
├── .env                          # Environment variables (git-ignored)
├── .env.example                  # Template for .env
└── .gitignore                    # Git ignore rules
```

---

## 🚀 Quick Setup

### For Evaluators (Before Assessment)
1. Clone this repository
2. Edit `.env` and add OpenAI API key
3. Run `docker-compose up`
4. Verify everything works at http://localhost:3000
5. Run `docker-compose down -v` to reset before candidate starts

### For Candidates (During Assessment)
1. Receive repository from evaluator
2. Run `docker-compose up`
3. Go to http://localhost:3000
4. Create an account
5. Start implementing features!

---

## ⚙️ What's Already Implemented

- ✅ Next.js 14 with App Router
- ✅ TypeScript configured
- ✅ Tailwind CSS + shadcn/ui
- ✅ Supabase auth (login/signup working)
- ✅ Database schema with RLS policies
- ✅ Basic UI layout
- ✅ Static notes page (hardcoded data)

---

## 🎯 What Candidates Must Build

### Core Requirements (75 minutes)
1. **Fetch notes from database** - Replace hardcoded data
2. **Create new note** - Add create functionality
3. **Delete note** - Add delete functionality
4. **AI Summarize** - Integrate OpenAI to summarize all notes

### Stretch Goals (If time permits)
- Search/filter notes
- Edit existing notes
- Error handling
- Loading states

---

## 📊 Evaluation Criteria

Candidates are scored on:
1. **Code Quality** - Clean, organized, well-typed code
2. **Problem Solving** - Independent thinking and debugging
3. **AI Literacy** - Effective use of AI tools with understanding
4. **Security Awareness** - Input validation, data sensitivity
5. **Communication** - Explaining decisions and tradeoffs

See `SCORECARD.md` for detailed rubric.

---

## 🔧 Technical Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes / Server Actions
- **Database**: PostgreSQL (via Supabase)
- **Auth**: Supabase Auth
- **AI**: OpenAI API (gpt-3.5-turbo or gpt-4)
- **Infrastructure**: Docker Compose

---

## 📞 Support & Troubleshooting

### Common Issues

**Services not starting:**
```bash
docker-compose down -v
docker-compose up
```

**Port conflicts:**
- Edit `docker-compose.yml` to change ports
- Or stop services using ports 3000, 3001, 5432, 8000

**Database issues:**
- Wait 60 seconds after startup
- Check logs: `docker-compose logs db`

**OpenAI errors:**
- Verify API key in `.env`
- Check account has credits
- Ensure no extra spaces in key

---

## 📝 Assessment Timeline

| Time | Activity |
|------|----------|
| 0-15 min | Briefing & questions |
| 15-90 min | Coding (75 min) |
| 90-120 min | Debrief & discussion (30 min) |

**Total: 2 hours**

---

## 📂 File Manifest

### Documentation
- `INDEX.md` - This file
- `README.md` - Candidate instructions
- `EVALUATOR_GUIDE.md` - Evaluator manual
- `SCORECARD.md` - Assessment scorecard
- `QUICK_START.md` - Fast setup guide

### Configuration
- `docker-compose.yml` - Container orchestration
- `.env` - Environment variables (not in git)
- `.env.example` - Template
- `.gitignore` - Git ignore rules

### Application
- `app/` - Next.js application
- `supabase/` - Database migrations and seeds
- `.docker/` - Docker-specific configs

---

## 🎓 For Evaluators

See `EVALUATOR_GUIDE.md` for:
- Pre-assessment checklist
- Observation guide
- Debrief questions
- Scoring rubric
- English proficiency evaluation

---

## 📋 License

This is proprietary assessment material for Mahway internal use only.

**Do not distribute publicly.**

---

**Questions?** Contact the Mahway technical hiring team.
