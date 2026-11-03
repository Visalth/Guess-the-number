#!/usr/bin/env bash
# Health check: is the deployed site up and serving the game?
# Usage: bash scripts/healthcheck.sh <url> [log_file]
# Writes one line per attempt to the log file. Exit 0 = UP, exit 1 = DOWN.
set -uo pipefail

URL="${1:-${APP_URL:-}}"
LOG_FILE="${2:-health.log}"
RETRIES=3
WAIT=5

if [ -z "$URL" ]; then
  echo "Usage: $0 <url> [log_file]"
  exit 2
fi

log() {
  echo "$(date -u '+%Y-%m-%d %H:%M:%S UTC') | $1" | tee -a "$LOG_FILE"
}

for i in $(seq 1 "$RETRIES"); do
  BODY_FILE="$(mktemp)"
  RESULT="$(curl -s -o "$BODY_FILE" -w '%{http_code} %{time_total}' --max-time 10 "$URL")"
  CODE="${RESULT%% *}"
  TIME="${RESULT##* }"

  # UP only if HTTP 200 AND the page really contains our game.
  if [ "$CODE" = "200" ] && grep -q "Guess My Number" "$BODY_FILE"; then
    rm -f "$BODY_FILE"
    log "UP   | $URL | HTTP $CODE | ${TIME}s | attempt $i/$RETRIES"
    exit 0
  fi

  rm -f "$BODY_FILE"
  log "FAIL | $URL | HTTP $CODE | ${TIME}s | attempt $i/$RETRIES"
  [ "$i" -lt "$RETRIES" ] && sleep "$WAIT"
done

log "DOWN | $URL | all $RETRIES attempts failed"
exit 1
