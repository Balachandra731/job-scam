# 📊 Job Scam Detector - Architecture Overview

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend (React)                             │
│                   http://localhost:3000                         │
├─────────────────────────────────────────────────────────────────┤
│  Pages:  Home | Login | Register | Scams | Report | Dashboard  │
│  │
│  ├─ Authentication State (Context API)
│  ├─ Protected Routes (ProtectedRoute)
│  ├─ Admin Routes (AdminRoute)
│  └─ API Service (Axios)
│
│ ◄─ HTTP/JSON ─────────────────────────────────────────────────►
│
├─────────────────────────────────────────────────────────────────┤
│                    Backend (Express.js)                         │
│                   http://localhost:5000                         │
├─────────────────────────────────────────────────────────────────┤
│  Routes:  /api/auth/...        /api/reports/...                │
│  │
│  ├─ Authentication Middleware (JWT)
│  ├─ Auth Controller (register, login, getMe)
│  ├─ Report Controller (CRUD operations)
│  ├─ Admin Middleware (admin verification)
│  └─ Error Handling
│
│ ◄─ MongoDB Protocol ───────────────────────────────────────────►
│
├─────────────────────────────────────────────────────────────────┤
│                  Database (MongoDB)                             │
│              mongodb://localhost:27017                          │
├─────────────────────────────────────────────────────────────────┤
│  Collections:
│  ├─ users (User documents)
│  └─ reports (Scam report documents)
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagram

### User Registration Flow
```
User Input Form
    ↓
Frontend: Register Component
    ↓
Validate Input
    ↓
Axios POST /api/auth/register
    ↓
Backend: authController.register()
    ↓
Validate Data
    ↓
Hash Password (bcryptjs)
    ↓
Save to MongoDB
    ↓
Generate JWT Token
    ↓
Return Token + User Data
    ↓
Frontend: Store in localStorage
    ↓
AuthContext Updated
    ↓
Redirect to Dashboard
```

### Report Submission Flow
```
User Fills Report Form
    ↓
Frontend: ReportPage Component
    ↓
Validate Input
    ↓
Axios POST /api/reports (with JWT token)
    ↓
Backend: Check Authorization
    ↓
Backend: reportController.createReport()
    ↓
Validate Report Data
    ↓
Check for Duplicate Company
    ↓
Save to MongoDB
    ↓
Return Report Data
    ↓
Frontend: Show Success Message
    ↓
Redirect to My Reports
```

### Admin Verification Flow
```
Admin Views Admin Panel
    ↓
Frontend: AdminPanel Component
    ↓
Axios GET /api/reports/admin/pending
    ↓
Backend: Check Admin Authorization
    ↓
Get Pending Reports from MongoDB
    ↓
Return Reports
    ↓
Frontend: Display in List
    ↓
Admin Selects & Verifies Report
    ↓
Axios PUT /api/reports/:id/verify
    ↓
Backend: Update Report Status
    ↓
MongoDB: Save Updated Report
    ↓
Frontend: Refresh List
```

---

## 📡 API Endpoint Map

```
Authentication Routes
├─ POST   /api/auth/register     → Create new user
├─ POST   /api/auth/login        → User login
└─ GET    /api/auth/me           → Get current user

Report Routes
├─ POST   /api/reports                    → Create report
├─ GET    /api/reports                    → Get all reports
├─ GET    /api/reports/:id                → Get specific report
├─ GET    /api/reports/search             → Search companies
├─ GET    /api/reports/user/my-reports    → User's reports
├─ GET    /api/reports/admin/pending      → Pending reports (admin)
├─ PUT    /api/reports/:id/verify         → Verify report (admin)
└─ PUT    /api/reports/:id/reject         → Reject report (admin)

Utility Routes
└─ GET    /api/health            → Server health check
```

---

## 🔐 Authentication Flow

```
Step 1: User Registration
┌─────────────────────┐
│ Frontend - Register │
│  Form Inputs:       │
│  - Name             │
│  - Email            │
│  - Password         │
└──────────┬──────────┘
           ↓
┌──────────────────────────────┐
│ Backend - authController      │
│ 1. Validate input             │
│ 2. Check email exists         │
│ 3. Hash password              │
│ 4. Save user                  │
│ 5. Generate JWT token         │
└──────────┬───────────────────┘
           ↓
┌──────────────────────────────┐
│ Frontend - Store & Redirect   │
│ 1. Save token in localStorage │
│ 2. Update AuthContext         │
│ 3. Redirect to dashboard      │
└──────────────────────────────┘

Step 2: Subsequent Requests
┌─────────────────────────────────────┐
│ Frontend - Add Auth Header          │
│ Authorization: Bearer <token>       │
└────────────┬──────────────────────┘
             ↓
┌──────────────────────────────┐
│ Backend - Auth Middleware    │
│ 1. Extract token             │
│ 2. Verify JWT signature      │
│ 3. Validate expiration       │
│ 4. Add user to req.user      │
└────────────┬─────────────────┘
             ↓
┌──────────────────────────────┐
│ Route Handler Proceeds        │
│ Access to req.user            │
└──────────────────────────────┘
```

---

## 🗄️ Database Schema Relationships

```
┌──────────────────────────┐
│        Users             │
├──────────────────────────┤
│ _id (ObjectId)           │
│ name (String)            │
│ email (String, unique)   │
│ password (String)        │
│ isAdmin (Boolean)        │
│ createdAt (Date)         │
└──────────┬───────────────┘
           │
           │ Referenced in Reports
           │ (reportedBy, verifiedBy)
           │
           ↓
┌──────────────────────────┐
│      Reports             │
├──────────────────────────┤
│ _id (ObjectId)           │
│ companyName (String)     │
│ jobTitle (String)        │
│ description (String)     │
│ redFlags (Array)         │
│ evidenceLink (String)    │
│ reportedBy (ObjectId)*   │
│ status (String)          │
│ verifiedBy (ObjectId)*   │
│ verificationNotes (Str)  │
│ scamCount (Number)       │
│ createdAt (Date)         │
└──────────────────────────┘

* References User._id
```

---

## 🎨 Component Hierarchy

```
App
├─ AuthProvider (Context)
│  ├─ Navbar
│  │  ├─ Nav Links
│  │  └─ Auth Display
│  │
│  └─ Routes
│     ├─ Public Routes
│     │  ├─ Home
│     │  │  ├─ SearchBar
│     │  │  └─ Features
│     │  ├─ Login
│     │  ├─ Register
│     │  └─ ScamsPage
│     │     ├─ SearchBar
│     │     └─ ReportCard (list)
│     │
│     ├─ Protected Routes
│     │  ├─ ReportPage
│     │  │  └─ Form
│     │  └─ Dashboard
│     │     └─ ReportCard (list)
│     │
│     └─ Admin Routes
│        └─ AdminPanel
│           ├─ Reports List
│           └─ Report Details
```

---

## 🔄 State Management Flow

```
User Input (Form)
      ↓
React Component State
      ↓
Validation
      ↓
API Call (Axios)
      ↓
      ├─ Success ─→ Update AuthContext ─→ localStorage
      │                    ↓
      │            Re-render Components
      │
      └─ Error  ─→ Error State ─→ Display Message
```

---

## 📊 Request/Response Cycle

### Successful Request
```
Frontend Request:
POST /api/reports
Headers: {
  "Authorization": "Bearer token...",
  "Content-Type": "application/json"
}
Body: {
  "companyName": "...",
  "jobTitle": "...",
  ...
}

Backend Processing:
1. Check Authorization header
2. Verify JWT token
3. Extract user ID
4. Validate request body
5. Query MongoDB
6. Process data
7. Save to database

Backend Response (201):
{
  "success": true,
  "message": "Report submitted",
  "report": {
    "_id": "...",
    "companyName": "...",
    ...
  }
}

Frontend:
1. Receive response
2. Update component state
3. Show success message
4. Redirect to next page
```

### Failed Request
```
Backend Response (400):
{
  "success": false,
  "message": "Invalid input"
}

Frontend:
1. Receive error
2. Set error state
3. Display error message
4. Keep user on form
```

---

## 🔑 Key Middleware Stack

### Backend Middleware Order
```
Request comes in
    ↓
1. express.json() - Parse JSON
    ↓
2. cors() - Handle CORS
    ↓
3. express.urlencoded() - Parse forms
    ↓
4. Route Specific Middleware
    ├─ Public Routes (no auth needed)
    ├─ Protected Routes (auth middleware)
    │  ├─ Extract token
    │  ├─ Verify JWT
    │  ├─ Attach user to req
    │  └─ Continue to controller
    └─ Admin Routes (auth + admin check)
       ├─ Auth middleware
       ├─ Admin check middleware
       └─ Continue to controller
    ↓
Controller/Handler
    ↓
Response
```

---

## 📱 Frontend Routing Logic

```
User Accesses URL
    ↓
React Router Matches Route
    ↓
Check Route Type:
├─ Public Route
│  └─ Render component directly
│
├─ Protected Route
│  ├─ Check isAuthenticated
│  ├─ YES → Render component
│  └─ NO → Redirect to /login
│
└─ Admin Route
   ├─ Check isAuthenticated
   ├─ NO → Redirect to /login
   └─ YES
      ├─ Check isAdmin
      ├─ YES → Render component
      └─ NO → Redirect to /dashboard
```

---

## 🚀 Deployment Architecture

```
Development:
┌──────────────────┐
│ localhost:3000   │
│ (React Dev)      │
└────────┬─────────┘
         ↓
┌──────────────────┐
│ localhost:5000   │
│ (Express Dev)    │
└────────┬─────────┘
         ↓
┌──────────────────┐
│ MongoDB Local    │
└──────────────────┘

Production:
┌──────────────────┐
│ Vercel/Netlify   │
│ (React Build)    │
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Heroku/Railway   │
│ (Express Server) │
└────────┬─────────┘
         ↓
┌──────────────────┐
│ MongoDB Atlas    │
│ (Cloud DB)       │
└──────────────────┘
```

---

## 🔒 Security Layers

```
Client Side Security:
├─ Input Validation
├─ Protected Routes
├─ Token Storage (localStorage)
└─ Error Handling

Server Side Security:
├─ Request Validation
├─ JWT Verification
├─ Password Hashing
├─ CORS Protection
├─ Authorization Checks
└─ Error Message Sanitization

Database Security:
├─ Mongoose Schema Validation
├─ Unique Indexes (email)
├─ Password Hashing
└─ No Sensitive Data Exposure
```

---

## 📈 Performance Optimizations

```
Frontend:
├─ React Router for SPA
├─ Context API for state
├─ Lazy loading with routes
├─ CSS for styling (no JS overhead)
└─ Responsive images

Backend:
├─ Stateless design
├─ Database indexes
├─ CORS enabled
├─ Error handling
└─ Token caching possible

Database:
├─ Indexes on email, companyName
├─ Proper data types
├─ Pagination ready
└─ Query optimization
```

---

This architecture ensures:
✅ Scalability
✅ Security
✅ Maintainability
✅ Performance
✅ User Experience
