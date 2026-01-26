#!/bin/bash
# ============================================
# QuickNotes AI - Database Migration Runner
# ============================================
# This script waits for the database and auth service
# to be ready, then runs the application migrations
# ============================================

set -e

echo "=== QuickNotes Migration Runner ==="
echo "Waiting for database to be ready..."

# Wait for PostgreSQL to be ready
until PGPASSWORD=$POSTGRES_PASSWORD psql -h db -U postgres -c '\q' 2>/dev/null; do
  echo "Postgres is unavailable - sleeping 2s"
  sleep 2
done

echo "PostgreSQL is ready!"

# Wait for auth.users table to exist (created by Supabase Auth service)
echo "Waiting for auth.users table (Supabase Auth initialization)..."
until PGPASSWORD=$POSTGRES_PASSWORD psql -h db -U postgres -d postgres -c "SELECT 1 FROM auth.users LIMIT 1" 2>/dev/null; do
  echo "auth.users not ready - sleeping 3s"
  sleep 3
done

echo "Supabase Auth is initialized!"

# Check if migrations have already been run
echo "Checking if migrations have already been applied..."
NOTES_EXISTS=$(PGPASSWORD=$POSTGRES_PASSWORD psql -h db -U postgres -d postgres -tAc "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'notes');")

if [ "$NOTES_EXISTS" = "t" ]; then
  echo "Migrations already applied (notes table exists). Skipping."
  exit 0
fi

echo "Running migrations..."

# Run 001_init.sql
echo "Running 001_init.sql..."
PGPASSWORD=$POSTGRES_PASSWORD psql -h db -U postgres -d postgres -f /migrations/001_init.sql

# Run 002_seed.sql
echo "Running 002_seed.sql..."
PGPASSWORD=$POSTGRES_PASSWORD psql -h db -U postgres -d postgres -f /migrations/002_seed.sql

echo "=== Migrations completed successfully! ==="
