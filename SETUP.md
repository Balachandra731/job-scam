# SETUP & INSTALLATION GUIDE

## Quick Start

### 1. Install MongoDB

**Option A: Local MongoDB**
- Download from: https://www.mongodb.com/try/download/community
- Install and run the MongoDB service
- Default connection: `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud)**
- Create account at: https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string
- Update `.env` with your connection string

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env and update:
# - MONGODB_URI (your MongoDB connection)
# - JWT_SECRET (use any random string)

# Start development server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup (New Terminal)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Start React app
npm start
```

The frontend will open at `http://localhost:3000`

## Verification

1. Open browser to `http://localhost:3000`
2. Try registering a new account
3. Submit a scam report
4. Search for companies
5. Check admin panel (if admin user)

## Production Deployment

### Backend Deployment (Heroku example)
```bash
cd backend
heroku login
heroku create your-app-name
git push heroku main
```

### Frontend Deployment (Vercel example)
```bash
cd frontend
npm install -g vercel
vercel
```

## Environment Variables

### Backend .env
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-scam-detector
JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=development
```

### Frontend .env
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check connection string in .env
- Verify network access if using Atlas

**CORS Error:**
- Check backend CORS configuration
- Ensure frontend URL is allowed
- Clear browser cache

**Port Already in Use:**
- Change PORT in backend .env
- Update proxy in frontend package.json

## Database Seeding

To create an admin user, connect to MongoDB directly:

```javascript
use job-scam-detector

db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "hashed_password_here",
  isAdmin: true
})
```

Or use MongoDB Compass GUI for easier management.

## Debug Mode

### Backend
Add to server.js:
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

### Frontend
Check browser DevTools:
- F12 or Right-click → Inspect
- Network tab to see API calls
- Console tab for errors
