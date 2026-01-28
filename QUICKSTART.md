# QUICK START GUIDE

## 🚀 Start the Application in 5 Minutes

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:** (Open new terminal)
```bash
cd frontend
npm install
```

### Step 2: Setup Environment Files

**Backend .env:**
```bash
cd backend
# Copy the .env.example
# On Windows:
copy .env.example .env
# On Mac/Linux:
cp .env.example .env

# Edit .env and set:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-scam-detector
JWT_SECRET=test_secret_key_12345
NODE_ENV=development
```

**Frontend .env:**
```bash
cd frontend
# Copy the .env.example
copy .env.example .env
# Leave the default values as is
```

### Step 3: Ensure MongoDB is Running

**Option A: Local MongoDB**
```bash
# Windows - in PowerShell as Administrator:
net start MongoDB

# Mac/Linux:
brew services start mongodb-community
```

**Option B: Use MongoDB Atlas (Cloud)**
- Skip this if you don't have MongoDB locally
- Update MONGODB_URI in backend/.env with your Atlas connection string

### Step 4: Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Output: Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# Opens http://localhost:3000 automatically
```

### Step 5: Test the Application

1. Open http://localhost:3000
2. Click "Sign Up" and create an account
3. Search for a company (e.g., "Google")
4. Report a job scam
5. View your reports in "My Reports"

## 📋 Default Test User

You can login with:
```
Email: test@example.com
Password: test123
```

## 🔧 Make an Account as Admin

1. Login to your backend console
2. Open MongoDB (using Compass or command line)
3. Find your user document
4. Change `isAdmin: false` to `isAdmin: true`
5. Refresh the application
6. Admin panel will appear in navbar

## 🧪 Test the Admin Features

1. Login as admin user
2. Go to Admin Panel from navbar
3. View pending reports
4. Click a report to verify or reject
5. Add verification notes if needed

## 📱 Frontend Routes

- `/` - Home page
- `/login` - Login page
- `/register` - Sign up page
- `/scams` - View all scams
- `/report` - Submit a scam report
- `/my-reports` - View your reports
- `/admin` - Admin panel (admin only)

## 🔑 API Endpoints

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## 🐛 Troubleshooting

**Port 3000 or 5000 already in use?**
```bash
# Find process using port
lsof -i :3000
# Kill process
kill -9 <PID>
```

**MongoDB connection error?**
- Check if MongoDB is running
- Verify MONGODB_URI in .env
- Check network connectivity (for Atlas)

**CORS error?**
- Ensure backend is running on 5000
- Check frontend .env has correct API URL
- Clear browser cache

**npm ERR! code ERESOLVE?**
```bash
# Use legacy dependency resolution
npm install --legacy-peer-deps
```

## 📚 Learn More

- Backend: See `SETUP.md` for detailed setup
- API: See `API_DOCS.md` for complete API documentation
- Full Info: See `README.md` for comprehensive guide

## 💡 Pro Tips

1. Use MongoDB Compass GUI for easy database management
2. Use Postman for API testing
3. Check browser DevTools Console for client errors
4. Check terminal for backend errors
5. Use `npm run dev` for backend (auto-restart on changes)

## 🎯 What's Working

✅ User registration and login
✅ JWT authentication
✅ Submit scam reports
✅ View all reports
✅ Search by company
✅ Admin verification panel
✅ Responsive design
✅ Error handling
✅ Protected routes

## 📝 Next Steps

1. Verify MongoDB is running
2. Create .env files
3. Run `npm install` in both folders
4. Start backend: `npm run dev` in backend folder
5. Start frontend: `npm start` in frontend folder
6. Open http://localhost:3000

**Enjoy using Job Scam Detector! 🚨**
