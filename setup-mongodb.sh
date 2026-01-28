#!/bin/bash
# MongoDB Installation and Setup Script

echo "🚨 Job Scam Detector - MongoDB Setup"
echo "===================================="

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "MongoDB not found. Installing..."
    
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo apt-get update
        sudo apt-get install -y mongodb-server
        sudo systemctl start mongodb
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # Mac
        brew tap mongodb/brew
        brew install mongodb-community
        brew services start mongodb-community
    fi
fi

echo "✅ MongoDB is ready!"
echo "Creating database and collections..."

# Connect to MongoDB and create initial data
mongosh << EOF
use job-scam-detector

// Create users collection
db.users.insertOne({
  name: "Test User",
  email: "test@example.com",
  password: "\$2a\$10\$abcdefghijklmnopqrstuvwxyz",
  isAdmin: false,
  createdAt: new Date()
})

// Create reports collection
db.reports.insertOne({
  companyName: "Example Scam Corp",
  jobTitle: "Senior Developer",
  description: "Posted unrealistic salary without any interview process",
  redFlags: ["Unrealistic salary", "No interview process"],
  evidenceLink: "https://example.com/job/123",
  reportedBy: ObjectId(),
  status: "verified",
  scamCount: 3,
  createdAt: new Date()
})

echo "✅ Database initialized!"
EOF
