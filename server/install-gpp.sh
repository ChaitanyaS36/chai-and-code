#!/bin/bash
# Script to install g++ compiler
# This is used during Render deployment

echo "🔧 Installing g++ compiler..."

# Update package list
apt-get update -qq

# Install build-essential which includes g++
apt-get install -y build-essential

# Verify installation
g++ --version

echo "✅ g++ installation complete"
