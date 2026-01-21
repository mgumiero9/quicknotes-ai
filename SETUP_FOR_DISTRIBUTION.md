# Setup for Distribution

Instructions for preparing this repository for candidate assessment.

---

## Initial Repository Setup

### 1. Initialize Git Repository

```bash
cd quicknotes-ai
git init
git add .
git commit -m "Initial commit: QuickNotes AI assessment"
```

### 2. Create Remote Repository

**Option A: GitHub (Private)**
```bash
# Create a private repo on GitHub, then:
git remote add origin https://github.com/your-org/quicknotes-ai-assessment.git
git branch -M main
git push -u origin main
```

**Option B: GitLab (Private)**
```bash
# Create a private repo on GitLab, then:
git remote add origin https://gitlab.com/your-org/quicknotes-ai-assessment.git
git branch -M main
git push -u origin main
```

**Option C: Bitbucket (Private)**
```bash
# Create a private repo on Bitbucket, then:
git remote add origin https://bitbucket.org/your-org/quicknotes-ai-assessment.git
git branch -M main
git push -u origin main
```

---

## Before Each Assessment

### 1. Clone Fresh Copy
```bash
git clone <repo-url> quicknotes-ai-candidate-[name]
cd quicknotes-ai-candidate-[name]
```

### 2. Add OpenAI API Key
```bash
# Edit .env file
nano .env

# Add your key
OPENAI_API_KEY=sk-your-actual-key-here
```

### 3. Test the Setup
```bash
docker-compose up
```

Verify:
- [ ] App loads at http://localhost:3000
- [ ] Can create account
- [ ] Login works
- [ ] Hardcoded notes display
- [ ] Supabase Studio accessible at http://localhost:3001

### 4. Reset for Candidate
```bash
docker-compose down -v
```

### 5. Share with Candidate

**Option A: Repository Access**
- Add candidate as collaborator with read access
- Send them the clone URL

**Option B: ZIP File**
```bash
# Create archive without .git folder
cd ..
tar -czf quicknotes-ai-assessment.tar.gz \
  --exclude='quicknotes-ai/.git' \
  --exclude='quicknotes-ai/node_modules' \
  quicknotes-ai/

# Or use zip
zip -r quicknotes-ai-assessment.zip quicknotes-ai/ \
  -x "quicknotes-ai/.git/*" \
  -x "quicknotes-ai/app/node_modules/*"
```

---

## Security Checklist

Before sharing with candidate:

- [ ] OpenAI API key has spending limit ($5-10 max)
- [ ] Repository is private (not public)
- [ ] Evaluator guide is included (or remove it if sharing via different channel)
- [ ] `.env` file contains your API key (if sharing pre-configured)
- [ ] `.git` folder is excluded if sending ZIP

---

## Multiple Assessments

### Option 1: Branches (Recommended)
```bash
# Create a branch per candidate
git checkout -b assessment/candidate-name-2024-01-15
# ... candidate works here ...
# After assessment, push branch for record-keeping
git push origin assessment/candidate-name-2024-01-15
```

### Option 2: Separate Repositories
```bash
# Fork/duplicate the main repo for each candidate
# Good for longer take-home assessments
```

### Option 3: Fresh Clones
```bash
# Just clone main branch each time
# Good for live sessions where you discard after
```

---

## Maintaining the Assessment

### Updating Dependencies

```bash
cd app
npm update
npm audit fix
```

Test thoroughly after updates!

### Updating Database Schema

1. Create new migration file:
   ```bash
   # supabase/migrations/002_your_change.sql
   ```

2. Test migration:
   ```bash
   docker-compose down -v
   docker-compose up
   ```

3. Verify in Supabase Studio

### Adding New Features/TODOs

1. Update `app/page.tsx` with new TODOs
2. Update `README.md` with new requirements
3. Update `SCORECARD.md` with new evaluation criteria
4. Test that feature is achievable in 75 minutes

---

## Backup & Version Control

### Recommended Approach

```bash
# Tag stable versions
git tag -a v1.0 -m "Assessment version 1.0 - January 2024"
git push origin v1.0

# Create a backup branch
git checkout -b backup/2024-01
git push origin backup/2024-01
```

### Backup Configuration

Recommended to backup:
- The repository (entire codebase)
- Candidate assessment results
- Filled scorecards
- Screen recordings (if applicable)

---

## Troubleshooting Common Setup Issues

### Docker Issues

**Problem**: Containers won't start
```bash
# Solution: Reset Docker
docker-compose down -v
docker system prune -a
docker-compose up
```

**Problem**: Port already in use
```bash
# Solution: Change ports in docker-compose.yml
# Or kill process using port
lsof -ti:3000 | xargs kill  # Mac/Linux
netstat -ano | findstr :3000  # Windows
```

### Database Issues

**Problem**: Migrations don't run
```bash
# Solution: Check migration file syntax
# Verify it's in supabase/migrations/
# File must end in .sql
# Must have proper SQL syntax
```

**Problem**: Can't connect to database
```bash
# Solution: Wait longer (60 seconds)
# Check logs: docker-compose logs db
# Verify healthcheck: docker-compose ps
```

### Application Issues

**Problem**: Next.js won't start
```bash
# Solution: Delete node_modules
docker-compose down
rm -rf app/node_modules
docker-compose up --build
```

**Problem**: TypeScript errors
```bash
# Solution: Rebuild
docker-compose down
docker-compose up --build
```

---

## Template Customization

To adapt this assessment for different roles:

### For Junior Roles
- Remove AI summarization requirement
- Focus on basic CRUD operations
- Extend time to 90 minutes
- Provide more code scaffolding

### For Senior Roles
- Add real-time collaboration requirement
- Require pagination implementation
- Add caching layer requirement
- Reduce time to 60 minutes

### For Specific Tech Stacks
- Replace OpenAI with different AI provider
- Replace Supabase with different backend
- Change UI library
- Add specific framework (e.g., tRPC, GraphQL)

---

## Legal & Compliance

### Candidate Code Ownership

Clarify in assessment brief:
- Code belongs to candidate or company?
- Can candidate use in portfolio?
- NDA required?

### Recording Consent

If recording sessions:
- Get explicit consent
- Inform candidate at start
- Document in scorecard

---

## Assessment Analytics

Track over time:
- Average completion time per feature
- Common failure points
- AI tool usage patterns
- Success rate by candidate level

Use this data to:
- Calibrate difficulty
- Update evaluation criteria
- Improve documentation

---

## Support

For technical issues with this setup:
- Check documentation files first
- Review Docker Compose logs
- Verify all services are healthy

For assessment process questions:
- See `EVALUATOR_GUIDE.md`
- Contact hiring team

---

**Last Updated**: January 2024
**Maintained By**: Mahway Technical Hiring Team
