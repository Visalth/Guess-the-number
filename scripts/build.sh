#!/usr/bin/env bash
# Build: copy the static site files into dist/ (the folder Vercel serves).
set -euo pipefail

rm -rf dist
mkdir -p dist
cp index.html style.css game.js script.js dist/

# Small build info file, useful to see which commit is live.
echo "{\"commit\": \"${GITHUB_SHA:-local}\", \"built_at\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"}" > dist/version.json

echo "Build OK. Files in dist/:"
ls dist
