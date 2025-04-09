#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Initialize git repository
echo "Initializing git repository..."
git init
git add .
git commit -m "Initial commit"

# Create reference directory
echo "Creating reference directory..."
mkdir -p reference
cd reference
git clone https://github.com/nosferatu500/react-sortable-tree.git
cd ..

echo "Setup complete! You can now start developing."
echo "Run 'npm run dev' to start the development server." 