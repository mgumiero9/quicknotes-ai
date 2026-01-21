# Quick Start Guide

Get the assessment environment running in 3 steps:

## For Evaluators

### 1. Add OpenAI API Key
```bash
# Edit .env and add your key
OPENAI_API_KEY=sk-your-key-here
```

### 2. Start Everything
```bash
docker-compose up
```

Wait ~60 seconds for services to initialize.

### 3. Verify
- **App**: http://localhost:3000
- **Supabase Studio**: http://localhost:3001

### Before Candidate Starts
```bash
# Reset all data
docker-compose down -v
docker-compose up
```

---

## For Candidates

### 1. Start the Application
```bash
docker-compose up
```

### 2. Create an Account
- Go to http://localhost:3000
- Click "Sign up"
- Use any email/password

### 3. Start Coding!
- See `README.md` for full instructions
- Check `app/page.tsx` for TODOs

---

## Useful Commands

```bash
# View app logs
docker-compose logs -f app

# Reset database (deletes all data!)
docker-compose down -v

# Stop everything
docker-compose down

# Restart just the app
docker-compose restart app
```

---

## Troubleshooting

**Port already in use?**
```bash
docker-compose down
# Wait 5 seconds
docker-compose up
```

**Database not working?**
```bash
docker-compose down -v
docker-compose up
```

**Services not starting?**
- Check Docker is running
- Wait 60 seconds after `docker-compose up`
- Run `docker-compose ps` to see status
