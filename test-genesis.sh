#!/bin/bash
# Test script for mindpath-genesis.sh

set -e

TEST_DIR="/tmp/mindpath-genesis-test-$$"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCRIPT_PATH="$SCRIPT_DIR/mindpath-genesis.sh"

echo "=== Testing Mindpath Genesis Script ==="
echo "Test directory: $TEST_DIR"
echo ""

# Create test directory
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

# Run the genesis script
echo "Running genesis script..."
bash "$SCRIPT_PATH" > /dev/null 2>&1

# Verify directory structure
echo "Verifying directory structure..."
test -d backend || { echo "FAIL: backend directory not created"; exit 1; }
test -d frontend || { echo "FAIL: frontend directory not created"; exit 1; }
test -f docker-compose.yml || { echo "FAIL: docker-compose.yml not created"; exit 1; }

# Verify backend files
echo "Verifying backend files..."
test -f backend/src/app.py || { echo "FAIL: backend/src/app.py not created"; exit 1; }
test -f backend/requirements.txt || { echo "FAIL: backend/requirements.txt not created"; exit 1; }
test -f backend/Dockerfile || { echo "FAIL: backend/Dockerfile not created"; exit 1; }

# Verify frontend files
echo "Verifying frontend files..."
test -f frontend/src/pages/index.js || { echo "FAIL: frontend/src/pages/index.js not created"; exit 1; }
test -f frontend/src/pages/_app.js || { echo "FAIL: frontend/src/pages/_app.js not created"; exit 1; }
test -f frontend/src/components/CoPilot.js || { echo "FAIL: frontend/src/components/CoPilot.js not created"; exit 1; }
test -f frontend/src/styles/globals.css || { echo "FAIL: frontend/src/styles/globals.css not created"; exit 1; }
test -f frontend/src/styles/Home.module.css || { echo "FAIL: frontend/src/styles/Home.module.css not created"; exit 1; }
test -f frontend/package.json || { echo "FAIL: frontend/package.json not created"; exit 1; }
test -f frontend/next.config.js || { echo "FAIL: frontend/next.config.js not created"; exit 1; }
test -f frontend/Dockerfile || { echo "FAIL: frontend/Dockerfile not created"; exit 1; }

# Verify critical content
echo "Verifying critical content..."

# Check socket event name in backend
grep -q "@socketio.on('pocc')" backend/src/app.py || { echo "FAIL: Socket event 'pocc' not found in backend"; exit 1; }

# Check environment variable usage in frontend
grep -q "process.env.NEXT_PUBLIC_BACKEND_URL" frontend/src/pages/index.js || { echo "FAIL: Environment variable not used in frontend"; exit 1; }

# Check that unused imports are not present
if grep -q "import time" backend/src/app.py; then
    echo "FAIL: Unused 'time' import found in backend"
    exit 1
fi

if grep -q "import json" backend/src/app.py; then
    echo "FAIL: Unused 'json' import found in backend"
    exit 1
fi

# Verify Python syntax
echo "Verifying Python syntax..."
python3 -m py_compile backend/src/app.py || { echo "FAIL: Python syntax error in app.py"; exit 1; }

# Verify JSON syntax
echo "Verifying JSON syntax..."
python3 -c "import json; json.load(open('frontend/package.json'))" || { echo "FAIL: Invalid JSON in package.json"; exit 1; }

# Verify docker-compose syntax
echo "Verifying docker-compose syntax..."
grep -q "version:" docker-compose.yml || { echo "FAIL: Invalid docker-compose.yml"; exit 1; }
grep -q "backend:" docker-compose.yml || { echo "FAIL: Backend service not in docker-compose.yml"; exit 1; }
grep -q "frontend:" docker-compose.yml || { echo "FAIL: Frontend service not in docker-compose.yml"; exit 1; }

echo ""
echo "=== All Tests Passed! ==="
echo ""

# Cleanup
cd /
rm -rf "$TEST_DIR"

exit 0
