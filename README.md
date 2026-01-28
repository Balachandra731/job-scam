# Job Scam Detector - Full Stack Application

A comprehensive full-stack application to help users identify and report job scams. Built with React, Node.js, Express, and MongoDB.

## 🎯 Features

- **User Authentication**: Secure signup and login with JWT
- **Company Search**: Search for companies to check if they have scam reports
- **Report Scams**: Submit detailed reports about suspicious job postings
- **Verified Reports**: Browse verified scam reports from the community
- **Admin Panel**: Admins can verify, reject, or add notes to reports
- **Tracking**: Users can track all their submitted reports
- **Red Flags**: Categorized red flags to help identify scams

## 📁 Folder Structure

```
job-scam-app/
├── backend/                  # Node.js + Express backend
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route handlers
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth and other middleware
│   │   └── server.js        # Main server file
│   ├── package.json
│   └── .env.example
│
└── frontend/                 # React frontend
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/           # Page components
    │   ├── services/        # API calls
    │   ├── context/         # React Context
    │   ├── styles/          # CSS files
    │   ├── App.js
    │   └── index.js
    ├── public/
    ├── package.json
    └── .env.example
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud - MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
copy .env.example .env
```

4. Update `.env` with your MongoDB connection string:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-scam-detector
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

5. Start the backend server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
copy .env.example .env
```

4. Start the development server:
```bash
npm start
```

App will open at `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Reports
- `POST /api/reports` - Create new report (Protected)
- `GET /api/reports` - Get all verified reports
- `GET /api/reports/:id` - Get specific report
- `GET /api/reports/search?company=name` - Search company scams
- `GET /api/reports/user/my-reports` - Get user's reports (Protected)
- `GET /api/reports/admin/pending` - Get pending reports (Admin only)
- `PUT /api/reports/:id/verify` - Verify report (Admin only)
- `PUT /api/reports/:id/reject` - Reject report (Admin only)

## 🔐 Authentication

JWT tokens are used for authentication. Tokens are:
- Stored in localStorage on the client
- Sent in the Authorization header: `Bearer <token>`
- Valid for 7 days
- Required for protected routes

## 👨‍💼 User Roles

### Regular User
- View all verified scam reports
- Search companies
- Submit scam reports
- View their own reports

### Admin User
- Access admin panel
- View pending reports
- Verify or reject reports
- Add verification notes

## 📝 Report Fields

When submitting a report, users provide:
- **Company Name**: Name of the company
- **Job Title**: Title of the job posting
- **Description**: Detailed description of the scam
- **Red Flags**: Multiple choice selection of common red flags
- **Evidence Link**: Optional URL to the job posting or email

## 🎨 UI Components

- **Navbar**: Navigation with auth status
- **SearchBar**: Company search functionality
- **ReportCard**: Display individual scam reports
- **ProtectedRoute**: Route protection for authenticated users
- **AdminRoute**: Route protection for admin users

## 🔑 Key Technologies

**Backend:**
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- bcryptjs - Password hashing
- CORS - Cross-origin requests

**Frontend:**
- React - UI library
- React Router - Navigation
- Axios - HTTP client
- React Icons - Icons
- CSS - Styling

## 📦 Database Models

### User Model
```
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- isAdmin (Boolean, default: false)
- createdAt (Date)
```

### Report Model
```
- companyName (String, required)
- jobTitle (String, required)
- description (String, required)
- redFlags (Array of Strings)
- evidenceLink (String)
- reportedBy (ObjectId, ref: User)
- status (enum: pending, verified, rejected)
- verifiedBy (ObjectId, ref: User)
- verificationNotes (String)
- scamCount (Number, default: 1)
- createdAt (Date)
- updatedAt (Date)
```

## 🧪 Testing the Application

1. **Register a new account**
   - Go to `/register` page
   - Fill in name, email, password

2. **View scams**
   - Visit `/scams` to see all verified reports
   - Use search to find specific companies

3. **Submit a report**
   - Go to `/report` (requires login)
   - Fill in company details and description
   - Select red flags
   - Submit report

4. **Admin verification** (Admin account only)
   - Go to `/admin` panel
   - View pending reports
   - Verify or reject reports with notes

## 🛣️ Roadmap

- [ ] Email notifications
- [ ] Rating system for reports
- [ ] Advanced search filters
- [ ] Company detail pages
- [ ] User profiles
- [ ] Report statistics
- [ ] Two-factor authentication
- [ ] Social sharing

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@jobscamdetector.com or open an issue.
