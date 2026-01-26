# Quick Start Guide

## Assessment Format

**2-hour live session with 3 phases:**

1. **Briefing** (15 min) - Evaluator explains, you ask questions
2. **Execution** (75 min) - ALONE, recording yourself coding
3. **Debrief** (30 min) - Discuss your implementation

---

## Before the Session

Checklist:
- [ ] Docker installed and running
- [ ] Recording software ready (Loom recommended)
- [ ] Microphone working
- [ ] Quiet environment
- [ ] Close distractions (Slack, email, etc.)

---

## Phase 1: Briefing (15 min)

Listen to evaluator, ask questions, then:

```bash
# 1. Fork the repo on GitHub (evaluator provides link)

# 2. Clone YOUR fork
git clone https://github.com/YOUR-USERNAME/quicknotes-ai.git
cd quicknotes-ai

# 3. Create working branch
git checkout -b feature/implementation

# 4. Start Docker
./setup.sh
# Or manually: docker compose up
```

**IMPORTANT:** Keep this terminal open! You'll see logs from all services here.

Wait ~60 seconds, then verify:
- App: http://localhost:3000
- Supabase: http://localhost:3001
- **Create an account - you'll get 5 sample notes automatically!**

---

## Phase 2: Execution (75 min)

When evaluator says "START":

### Step 1: Start Recording
- Launch Loom (or Zoom/QuickTime)
- Start screen + audio recording
- Say the current time out loud

### Step 2: Code
- Open `app/app/page.tsx` - has TODO comments
- Implement the 4 required features:
  1. Connect notes to database
  2. Create new note
  3. Delete note
  4. AI summarize
- **Think out loud** the entire time

### Step 3: Submit (at 75 min)
```bash
# STOP CODING
git add .
git commit -m "Complete assessment: [list completed features]"
git push origin feature/implementation
```

- Stop recording
- Upload video (Loom/YouTube unlisted)
- Create PR in YOUR fork
- Send evaluator:
  - PR link
  - Recording link

---

## Phase 3: Debrief (30 min)

Discuss your implementation with evaluator.

---

## Quick Commands

```bash
# View all logs in real-time (RECOMMENDED - run this in a separate terminal)
docker compose up

# Or run in background and view specific logs
docker compose up -d
docker compose logs -f app           # Next.js app logs
docker compose logs -f db            # Database logs
docker compose logs -f auth          # Auth service logs

# Restart app after code changes
docker compose restart app

# Stop everything
docker compose down

# Fresh start (deletes ALL data)
docker compose down -v && docker compose up

# Check service health
docker compose ps
```

---

## Troubleshooting

**Can't see what's happening / No logs visible:**
- Make sure you run `docker compose up` (without `-d`)
- The `-d` flag runs in background and hides logs
- To see logs: `docker compose logs -f app`

**Docker won't start:**
```bash
docker compose down -v
docker compose up
```

**Port already in use:**
```bash
lsof -ti:3000 | xargs kill  # Mac/Linux
```

**Services not ready / Can't connect:**
- Wait 60 seconds after startup
- Check health: `docker compose ps` (all should be "healthy")
- View logs: `docker compose logs db` or `docker compose logs auth`

**Can't register/login:**
- Check auth logs: `docker compose logs auth`
- Restart auth: `docker compose restart auth`
- Verify database is healthy: `docker compose ps db`

**No sample notes after signup:**
- Sample notes are created automatically via database trigger
- Check database logs: `docker compose logs db`
- Verify in Supabase Studio (http://localhost:3001): Run `SELECT * FROM public.notes;`

**Can't record:**
- Loom (easiest): https://www.loom.com
- Zoom: Start meeting → Share screen → Record
- QuickTime (Mac): File → New Screen Recording

---

## Key Tips

**Do:**
- ✅ Think out loud constantly
- ✅ Start with basic implementations
- ✅ Test as you go
- ✅ Commit frequently
- ✅ Watch the clock

**Don't:**
- ❌ Work in silence
- ❌ Spend too long on one feature
- ❌ Over-polish the UI
- ❌ Go past 75 minutes
- ❌ Forget to record

---

**Full instructions:** [README.md](README.md)
