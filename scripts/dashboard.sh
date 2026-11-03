#!/usr/bin/env bash
# Bonus: turn health.log into a simple HTML status page (status.html).
# Usage: bash scripts/dashboard.sh [log_file] [output_file]
set -euo pipefail

LOG_FILE="${1:-health.log}"
OUT="${2:-status.html}"

[ -f "$LOG_FILE" ] || { echo "No $LOG_FILE found"; exit 1; }

LAST="$(tail -n 1 "$LOG_FILE")"
if echo "$LAST" | grep -q "| UP"; then
  STATUS="UP"; COLOR="#60b347"
else
  STATUS="DOWN"; COLOR="#c0392b"
fi
TOTAL="$(grep -cE '\| (UP|DOWN) ' "$LOG_FILE" || true)"
UPS="$(grep -c '| UP ' "$LOG_FILE" || true)"
UPTIME=0
[ "$TOTAL" -gt 0 ] && UPTIME=$(( UPS * 100 / TOTAL ))

{
  echo "<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Status</title>"
  echo "<style>body{font-family:monospace;background:#222;color:#eee;padding:2rem}"
  echo ".badge{display:inline-block;padding:1rem 2rem;font-size:2rem;background:$COLOR}"
  echo "table{margin-top:2rem;border-collapse:collapse}td{padding:4px 12px;border-bottom:1px solid #444}</style></head><body>"
  echo "<h1>Guess the Number - Status</h1>"
  echo "<div class='badge'>$STATUS</div>"
  echo "<p>Uptime (from log): ${UPTIME}% of ${TOTAL} checks</p>"
  echo "<table>"
  tail -n 20 "$LOG_FILE" | tac | while IFS= read -r line; do
    echo "<tr><td>${line//|/</td><td>}</td></tr>"
  done
  echo "</table></body></html>"
} > "$OUT"

echo "Dashboard written to $OUT (status: $STATUS)"
