#!/bin/bash
# =============================================================================
# QuickNotes AI - Setup Script
# =============================================================================
# Run this script to set up the project for the first time.
# Usage: ./setup.sh
# =============================================================================

set -e

echo "=========================================="
echo "  QuickNotes AI - Setup"
echo "=========================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker is not installed."
    echo "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "ERROR: Docker is not running."
    echo "Please start Docker Desktop and try again."
    exit 1
fi

echo "[OK] Docker is installed and running"

# Check for .env file
if [ ! -f .env ]; then
    echo ""
    echo "WARNING: .env file not found."
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo ""
    echo "IMPORTANT: Please edit .env and add your OPENAI_API_KEY"
    echo "Get your key from: https://platform.openai.com/api-keys"
    echo ""
    read -p "Press Enter after you've added your API key..."
fi

echo "[OK] .env file exists"

# Verify OPENAI_API_KEY is set
if grep -q "sk-your-actual-openai-key-here" .env 2>/dev/null; then
    echo ""
    echo "WARNING: OPENAI_API_KEY is still set to the placeholder value."
    echo "Please edit .env and add your real OpenAI API key."
    echo ""
    read -p "Press Enter after you've updated the API key..."
fi

echo ""
echo "=========================================="
echo "  Starting Docker services..."
echo "=========================================="
echo ""
echo "This will take about 60 seconds on first run."
echo "Keep this terminal open to see logs."
echo ""

# Start Docker
docker compose up

echo ""
echo "=========================================="
echo "  Setup complete!"
echo "=========================================="
echo ""
echo "Access the app at: http://localhost:3000"
echo "Supabase Studio at: http://localhost:3001"
echo ""
echo "Create an account to get started!"
echo ""
