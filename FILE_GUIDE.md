# 🚨 Job Scam Detector - Complete Project Structure

## 📂 Project Overview

This is a full-stack web application built with:
- **Frontend**: React with React Router
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT

Total Files: 40+
Lines of Code: 3000+

---

## 📁 Complete File Structure

```
job-scam-app/
│
├── 📄 README.md                 ← Main documentation
├── 📄 QUICKSTART.md            ← Quick start guide
├── 📄 SETUP.md                 ← Detailed setup instructions
├── 📄 API_DOCS.md              ← API documentation
├── 📄 setup-windows.bat        ← Windows setup script
├── 📄 setup-mongodb.sh         ← MongoDB setup script
├── 📄 FILE_GUIDE.md            ← This file
│
├── 📁 backend/                 ← Express.js Backend
│   ├── 📄 package.json         ← Dependencies
│   ├── 📄 .env.example         ← Environment template
│   ├── 📄 .gitignore           ← Git ignore rules
│   │
│   └── 📁 src/
│       ├── 📄 server.js        ← Main server entry point
│       │
│       ├── 📁 config/
│       │   └── database.js     ← MongoDB connection
│       │
│       ├── 📁 models/
│       │   ├── User.js         ← User schema & auth
│       │   └── Report.js       ← Scam report schema
│       │
│       ├── 📁 controllers/
│       │   ├── authController.js    ← Auth logic
│       │   └── reportController.js  ← Report logic
│       │
│       ├── 📁 routes/
│       │   ├── authRoutes.js   ← Auth endpoints
│       │   └── reportRoutes.js ← Report endpoints
│       │
│       └── 📁 middleware/
│           └── auth.js         ← JWT authentication
│
└── 📁 frontend/                ← React Frontend
    ├── 📄 package.json         ← Dependencies
    ├── 📄 .env.example         ← Environment template
    ├── 📄 .gitignore           ← Git ignore rules
    │
    ├── 📁 public/
    │   └── index.html          ← HTML template
    │
    └── 📁 src/
        ├── 📄 App.js           ← Main app component
        ├── 📄 App.css          ← App styles
        ├── 📄 index.js         ← React entry point
        ├── 📄 index.css        ← Global styles
        │
        ├── 📁 pages/
        │   ├── Home.js         ← Landing page
        │   ├── Login.js        ← Login page
        │   ├── Register.js     ← Sign up page
        │   ├── ScamsPage.js    ← View scams page
        │   ├── ReportPage.js   ← Report scam page
        │   ├── Dashboard.js    ← User dashboard
        │   └── AdminPanel.js   ← Admin verification
        │
        ├── 📁 components/
        │   ├── Navbar.js       ← Navigation bar
        │   ├── SearchBar.js    ← Company search
        │   ├── ReportCard.js   ← Report display
        │   └── ProtectedRoute.js ← Route protection
        │
        ├── 📁 context/
        │   └── AuthContext.js  ← Authentication state
        │
        ├── 📁 services/
        │   └── api.js          ← API calls (axios)
        │
        └── 📁 styles/
            ├── Navbar.css
            ├── SearchBar.css
            ├── Auth.css
            ├── ReportCard.css
            ├── ScamsPage.css
            ├── ReportForm.css
            ├── Dashboard.css
            ├── AdminPanel.css
            └── Home.css
```

---

## 🔑 Key Features

### 1. **Authentication System**
- User registration with validation
- Secure password hashing (bcryptjs)
- JWT token-based authentication
- 7-day token expiration
- Protected routes

### 2. **Scam Reporting**
- Submit detailed scam reports
- Select red flags from predefined list
- Track report status (pending/verified/rejected)
- View report history

### 3. **Search & Browse**
- Search companies by name
- View all verified scam reports
- See report details and statistics
- Filter by company name

### 4. **Admin Features**
- Verify pending reports
- Reject false reports with notes
- Add verification comments
- Track all reports

### 5. **User Dashboard**
- View personal reports
- Track report status
- See admin notes
- Submit new reports

---

## 🚀 Quick Start Commands

### Backend
```bash
cd backend
npm install
npm run dev          # Starts on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm start            # Opens http://localhost:3000
```

---

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  isAdmin: Boolean,
  createdAt: Date
}
```

### Reports Collection
```javascript
{
  _id: ObjectId,
  companyName: String,
  jobTitle: String,
  description: String,
  redFlags: [String],
  evidenceLink: String,
  reportedBy: ObjectId (ref: User),
  status: String (pending|verified|rejected),
  verifiedBy: ObjectId (ref: User),
  verificationNotes: String,
  scamCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔗 API Routes Overview

### Auth Routes (`/api/auth`)
- `POST /register` - Create new user
- `POST /login` - User login
- `GET /me` - Get current user (protected)

### Report Routes (`/api/reports`)
- `POST /` - Create report (protected)
- `GET /` - Get all verified reports
- `GET /search` - Search companies
- `GET /user/my-reports` - User's reports (protected)
- `GET /admin/pending` - Pending reports (admin)
- `PUT /:id/verify` - Verify report (admin)
- `PUT /:id/reject` - Reject report (admin)

---

## 🎯 User Workflows

### Workflow 1: New User
1. Register → Login → Search for company → Submit report → View status

### Workflow 2: Admin Verification
1. Login (admin) → Go to Admin Panel → View pending reports → Verify/Reject

### Workflow 3: Searching Scams
1. Visit site → Search company → View verified reports

---

## 🛠️ Technology Stack

### Backend
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables
- **nodemon** - Development tool

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Icons** - Icon library
- **CSS** - Styling

---

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-scam-detector
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🧪 Testing Checklist

- [ ] Register new user
- [ ] Login with credentials
- [ ] Search for company
- [ ] Submit scam report
- [ ] View all reports
- [ ] View my reports
- [ ] Logout
- [ ] Login as admin
- [ ] Verify a report
- [ ] Reject a report
- [ ] Check admin notes appear

---

## 📦 Dependencies

### Backend (13 packages)
```
express: ^4.18.2
mongoose: ^7.0.0
bcryptjs: ^2.4.3
jsonwebtoken: ^9.0.0
dotenv: ^16.0.3
cors: ^2.8.5
validator: ^13.7.0
nodemon: ^2.0.20
```

### Frontend (5 packages)
```
react: ^18.2.0
react-dom: ^18.2.0
react-router-dom: ^6.8.0
axios: ^1.3.0
react-icons: ^4.7.1
react-scripts: 5.0.1
```

---

## 🔒 Security Features

1. **Password Hashing** - bcryptjs with salt rounds
2. **JWT Tokens** - Secure token-based auth
3. **Protected Routes** - Frontend and backend
4. **Input Validation** - Server-side validation
5. **CORS Protection** - Cross-origin requests
6. **Error Handling** - Secure error messages

---

## 🎨 UI Features

- Responsive design (mobile, tablet, desktop)
- Clean and modern interface
- Gradient backgrounds
- Smooth transitions
- Icons with react-icons
- Cards and grid layouts
- Form validation
- Error messages
- Success notifications

---

## 📱 Page Routes

| Route | Access | Purpose |
|-------|--------|---------|
| `/` | Public | Landing page with info |
| `/login` | Public | User login |
| `/register` | Public | User registration |
| `/scams` | Public | View all scams |
| `/report` | Protected | Submit a report |
| `/my-reports` | Protected | View user's reports |
| `/dashboard` | Protected | User dashboard |
| `/admin` | Admin Only | Admin verification panel |

---

## 💾 Data Flow

```
User (Frontend)
    ↓
React Component
    ↓
Axios API Call
    ↓
Express Route
    ↓
Controller/Auth Middleware
    ↓
Mongoose Model
    ↓
MongoDB Database
    ↓
Response → Frontend → UI Update
```

---

## 🚀 Production Deployment

### Backend (Heroku)
```bash
heroku create app-name
git push heroku main
```

### Frontend (Vercel)
```bash
vercel deploy
```

### Environment Setup
- Update API_URL in frontend .env
- Use production MongoDB URI
- Set strong JWT_SECRET
- Enable HTTPS

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Start MongoDB service |
| Port already in use | Change PORT in .env |
| CORS error | Check backend CORS settings |
| Token expired | Re-login to get new token |
| Module not found | Run `npm install` |

---

## 📚 Documentation Files

1. **README.md** - Overview and features
2. **QUICKSTART.md** - 5-minute setup
3. **SETUP.md** - Detailed installation
4. **API_DOCS.md** - API reference
5. **FILE_GUIDE.md** - This file

---

## 🎓 Learning Resources

- Express.js: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- React: https://react.dev
- JWT: https://jwt.io
- Mongoose: https://mongoosejs.com

---

## 🤝 Contributing

Feel free to fork, modify, and improve the project!

---

## 📧 Support

For issues or questions, check the documentation files or review the code comments.

---

**Happy coding! 🚀**
