#!/bin/sh
set -e

# Search for staged files that match sensitive patterns
# Use -E for extended regex
# We anchor .env with $ to avoid matching .env.example
SECRETS=$(git diff --cached --name-only | grep -E "\.env$|\.pem$|id_rsa$|\.key$|\.p12$|\.pfx$" || true)

if [ -n "$SECRETS" ]; then
    echo "──────────────────────────────────────────────────────────"
    echo "❌ [SECURITY ERROR] Sensitive files detected in commit:"
    echo "$SECRETS"
    echo "──────────────────────────────────────────────────────────"
    echo "Please remove these files from the staging area before committing."
    exit 1
fi

exit 0