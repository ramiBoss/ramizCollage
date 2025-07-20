#!/bin/bash

# 🎨 Unified Visual Apps Launcher
# Quick script to open the unified app in your default browser

echo "🎨 Launching Unified Visual Apps Collection..."
echo "🚀 Opening in default browser..."

# Get the absolute path to the HTML file
APP_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/index.html"

# Open in default browser (works on macOS, Linux, and Windows with WSL)
if command -v open &> /dev/null; then
    # macOS
    open "$APP_PATH"
elif command -v xdg-open &> /dev/null; then
    # Linux
    xdg-open "$APP_PATH"
elif command -v start &> /dev/null; then
    # Windows
    start "$APP_PATH"
else
    echo "❌ Could not detect system browser opener"
    echo "📁 Please manually open: $APP_PATH"
    exit 1
fi

echo "✅ App should now be opening in your browser!"
echo "🎮 Use number keys 1-4 to switch between apps"
echo "🏠 Press 'H' to return to home page"
echo "⏯️  Press Space to pause/resume current app"

# Keep the script running for a moment to show the messages
sleep 2
