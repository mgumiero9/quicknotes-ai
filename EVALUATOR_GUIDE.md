# Evaluator Guide - QuickNotes AI Assessment

This guide is for **evaluators only**. Do not share this with candidates.

---

## Pre-Assessment Setup (15 minutes before session)

### 1. Prepare the Environment

1. **Clone/Download this repository**
   ```bash
   git clone <repo-url>
   cd quicknotes-ai
   ```

2. **Add your OpenAI API key**

   Edit `.env` file:
   ```env
   OPENAI_API_KEY=sk-your-actual-key-here
   ```

   **Important**: Set a spending limit on your OpenAI account
   - Go to https://platform.openai.com/account/billing/limits
   - Set max monthly limit to $5-10 to prevent abuse

3. **Test the setup**
   ```bash
   docker-compose up
   ```

   Wait ~60 seconds for all services to start, then verify:
   - App running: http://localhost:3000
   - Supabase Studio: http://localhost:3001
   - Can create account and login

4. **Reset for candidate**
   ```bash
   docker-compose down -v
   ```
   This clears all data so candidate starts fresh.

### 2. Share with Candidate

Provide the candidate with:
- [ ] Repository URL or ZIP file
- [ ] `.env` file with your OpenAI key already configured
- [ ] Link to this assessment (optional: record the session)

**Do NOT share**:
- ❌ This evaluator guide
- ❌ The original assessment document with evaluation criteria

---

## During the Assessment (75 minutes)

### Starting the Session (5 min)

1. **Brief the candidate** (use script from main assessment doc)
   - Explain they have 75 minutes
   - Ask them to share screen
   - Encourage thinking aloud
   - Confirm they can use AI tools (ChatGPT, Copilot, etc.)

2. **Answer clarifying questions** (see allowed responses in main doc)
   - Don't mention pagination, security, or error handling
   - Let them make their own decisions

3. **Start timer** when they begin coding

### Observation Checklist

Use this to track what the candidate does:

#### Green Signals (Senior+)
- [ ] Asks about edge cases before coding (e.g., "How many notes should I expect?")
- [ ] Mentions or implements pagination
- [ ] Adds loading states without being told
- [ ] Sanitizes or validates data before sending to OpenAI
- [ ] Implements error handling proactively
- [ ] Adds confirmation dialog for delete
- [ ] Uses TypeScript properly (not `any` everywhere)
- [ ] Commits code with meaningful messages
- [ ] Explains tradeoffs while coding

#### Yellow Signals (Mid-level)
- [ ] Completes core requirements
- [ ] Uses AI tools but understands output
- [ ] Some error handling, but inconsistent
- [ ] Code works but could be cleaner
- [ ] Asks good questions during briefing

#### Red Signals (Junior/Concerns)
- [ ] Copy-pastes AI output without understanding
- [ ] Can't explain their own code when asked
- [ ] No error handling at all
- [ ] Uses `SELECT *` with no pagination concern
- [ ] Passes raw user input directly to OpenAI
- [ ] Gets stuck for 15+ min on basic tasks
- [ ] No loading states or user feedback

### Time Checkpoints

**25 minutes in:**
- Should have completed OR be close to completing fetching notes from DB
- If stuck on basics, note this as concern

**50 minutes in:**
- Should have 2-3 core features done (fetch, create, delete)
- If still on first feature, they may not finish

**70 minutes in:**
- Give 5-minute warning
- Let them wrap up what they're working on

---

## Post-Coding Debrief (30 minutes)

### Part 1: Code Walkthrough (10 min)

**Opening question:**
> "Walk me through your implementation at a high level."

Listen for:
- Can they explain their architecture clearly?
- Do they understand what they built?
- Do they acknowledge any shortcuts or technical debt?

### Part 2: Architecture & Decisions (10 min)

Ask these questions based on what they implemented:

**Required questions:**
1. "Why did you structure the code this way?"
   - Looking for: architectural thinking, reasoning

2. "What would you change if you had more time?"
   - Looking for: self-awareness, prioritization

3. "How would this handle 10,000 notes?"
   - Looking for: scalability thinking, pagination awareness

4. "What happens if the OpenAI API is slow or down?"
   - Looking for: resilience, error handling, UX consideration

**Conditional questions** (ask if they did/didn't do something):
- If they added pagination: "Why did you choose to add pagination?"
- If they didn't add pagination: "I noticed you didn't add pagination. Why not?"
- If they added loading states: "Why are loading states important?"
- If they didn't handle errors: "What could go wrong with this API call?"

### Part 3: Security & Edge Cases (8 min)

**Critical questions:**
1. "What if a user's note contains their credit card number or SSN?"
   - Looking for: PII awareness, data sensitivity

2. "Could a malicious user manipulate the AI through their notes?"
   - Looking for: prompt injection awareness

3. "What happens if someone tries to delete a note that doesn't exist?"
   - Looking for: defensive coding

4. "How do you prevent one user from seeing another user's notes?"
   - Looking for: understanding of RLS, auth basics

### Part 4: AI Tool Usage (5 min)

If they used Copilot/ChatGPT:

1. "I saw you used [tool]. How do you decide what suggestions to accept?"
   - Looking for: critical thinking, not blind acceptance

2. "Was there anything the AI suggested that you rejected? Why?"
   - Looking for: judgment, code review skills

3. "If the AI gave you wrong code, how would you know?"
   - Looking for: debugging ability, testing mindset

### Part 5: Hypotheticals (5 min)

Pick 1-2 based on time:

1. "If we needed to add real-time collaboration to this app, how would you approach it?"
   - Looking for: system design thinking, websockets knowledge

2. "How would you add offline support for this app?"
   - Looking for: PWA knowledge, caching strategies

3. "What if we wanted to support voice notes?"
   - Looking for: API knowledge, adaptability

---

## Scoring

Use the rubric from the main assessment document:

### Quick Scoring Guide

**Category: Code Quality (1-5)**
- 5: Clean, well-organized, proper TypeScript, good naming
- 3: Functional but messy, some `any`, inconsistent
- 1: Spaghetti code, doesn't follow patterns

**Category: Problem Solving (1-5)**
- 5: Solves independently, asks smart questions, debugs well
- 3: Gets stuck sometimes, needs hints, eventually figures it out
- 1: Cannot progress without direct help

**Category: AI Literacy (1-5)**
- 5: Uses AI as accelerator, reviews output, explains everything
- 3: Uses AI but sometimes accepts bad code, can explain when asked
- 1: Completely dependent, cannot function without AI

**Category: Security Awareness (1-5)**
- 5: Proactively mentions security, sanitizes inputs, considers auth
- 3: Basic awareness, misses some issues
- 1: No security awareness, ships vulnerable code

**Category: Communication (1-5)**
- 5: Thinks aloud clearly, explains tradeoffs, asks great questions
- 3: Adequate communication, sometimes unclear
- 1: Cannot articulate thoughts, poor communication

### Final Decision

**Average 4.0-5.0**: 🟢 **GREEN** - Strong hire
- Move to final interview
- High confidence in technical ability

**Average 3.0-3.9**: 🟡 **YELLOW** - Potential hire
- Schedule calibration call
- Moderate confidence, needs discussion

**Average 1.0-2.9**: 🔴 **RED** - Not ready
- Reject
- Insufficient technical skills for role

---

## English Proficiency Evaluation

Run through the English assessment rubric from the main document during the debrief.

### Quick Test Questions

**Comprehension Test:**
> "If you had to rewrite this from scratch knowing what you know now, what would you do differently and why?"

**Fluency Test:**
> "Walk me through your thought process when you were debugging that issue with [specific problem they faced]."

**Vocabulary Test:**
> "How would you explain what an API is to a non-technical person?"

### Scoring
- C2: Native-like, can work with any client
- C1: Advanced, great for most US clients
- B2: Upper intermediate, async-heavy roles only
- B1 or below: Not ready for English-required roles

---

## Common Candidate Questions & How to Answer

| Question | Answer |
|----------|--------|
| "Should I add pagination?" | "Use your judgment based on what you think is right." |
| "How many notes should I expect?" | "Assume a typical user. What does that mean to you?" |
| "Should I add loading states?" | "That's up to you. What do you think?" |
| "What if the OpenAI call fails?" | "Handle it however you think is best." |
| "Can I use ChatGPT/Copilot?" | "Yes, use any tools you normally would." |
| "Should I use gpt-3.5 or gpt-4?" | "Either is fine. gpt-3.5-turbo works well and is cheaper." |

---

## Troubleshooting

### Candidate Can't Start Docker

```bash
# Make sure Docker is running
docker --version
docker-compose --version

# If ports are in use
docker-compose down
lsof -ti:3000 | xargs kill  # Mac/Linux
# or change ports in docker-compose.yml
```

### Database Not Working

```bash
# Reset everything
docker-compose down -v
docker-compose up

# Check logs
docker-compose logs db
```

### Candidate Can't Connect to Supabase

- Wait 60 seconds after `docker-compose up`
- Check `docker-compose ps` - all services should be "healthy" or "running"
- Verify URL is `http://localhost:8000` in code

---

## After the Assessment

1. **Fill out the scorecard** (from main assessment doc)
2. **Write detailed notes** on strengths and concerns
3. **Make recommendation** (Green/Yellow/Red)
4. **Share feedback** with hiring team within 24 hours

---

## Assessment Checklist

### Before Session
- [ ] Docker Compose tested and working
- [ ] OpenAI API key added to `.env`
- [ ] Spending limit set on OpenAI account
- [ ] Repository ready to share
- [ ] Scorecard printed or open
- [ ] Screen recording software ready (optional)
- [ ] Calendar blocked for 2+ hours

### During Session
- [ ] Briefed candidate on format and time limit
- [ ] Started timer
- [ ] Took notes on observations
- [ ] Noted green/yellow/red signals
- [ ] Asked debrief questions
- [ ] Evaluated English proficiency

### After Session
- [ ] Filled out scorecard
- [ ] Made final recommendation
- [ ] Shared feedback with team

---

**Good luck with the assessment!**
