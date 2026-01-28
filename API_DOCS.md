# API DOCUMENTATION

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

Response: 201
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "123...",
    "name": "John Doe",
    "email": "john@example.com",
    "isAdmin": false
  }
}
```

### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "123...",
    "name": "John Doe",
    "email": "john@example.com",
    "isAdmin": false
  }
}
```

### Get Current User
```
GET /auth/me
Headers: Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "user": {
    "_id": "123...",
    "name": "John Doe",
    "email": "john@example.com",
    "isAdmin": false,
    "createdAt": "2024-01-28T10:00:00Z"
  }
}
```

---

## Report Endpoints

### Create Report
```
POST /reports
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "companyName": "Fake Corp",
  "jobTitle": "Software Engineer",
  "description": "Posted a job with unrealistic salary and no interview process",
  "redFlags": ["Unrealistic salary", "No interview process"],
  "evidenceLink": "https://example.com/job/123"
}

Response: 201
{
  "success": true,
  "message": "Report submitted successfully",
  "report": {
    "_id": "456...",
    "companyName": "Fake Corp",
    "jobTitle": "Software Engineer",
    "description": "...",
    "redFlags": [...],
    "status": "pending",
    "scamCount": 1,
    "reportedBy": {...},
    "createdAt": "2024-01-28T10:00:00Z"
  }
}
```

### Get All Reports
```
GET /reports
GET /reports?company=Google

Response: 200
{
  "success": true,
  "count": 5,
  "reports": [
    {
      "_id": "456...",
      "companyName": "Fake Corp",
      "jobTitle": "Software Engineer",
      "description": "...",
      "status": "verified",
      "scamCount": 3,
      "reportedBy": {...},
      "verifiedBy": {...},
      "createdAt": "2024-01-28T10:00:00Z"
    }
  ]
}
```

### Search Company
```
GET /reports/search?company=Google

Response: 200
{
  "success": true,
  "count": 2,
  "reports": [...],
  "message": "No scam reports found for this company"
}
```

### Get Specific Report
```
GET /reports/:id

Response: 200
{
  "success": true,
  "report": {...}
}
```

### Get My Reports (Protected)
```
GET /reports/user/my-reports
Headers: Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "count": 3,
  "reports": [...]
}
```

### Get Pending Reports (Admin Only)
```
GET /reports/admin/pending
Headers: Authorization: Bearer <admin_token>

Response: 200
{
  "success": true,
  "count": 5,
  "reports": [...]
}
```

### Verify Report (Admin Only)
```
PUT /reports/:id/verify
Headers: Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "verificationNotes": "Report verified. Multiple complaints received."
}

Response: 200
{
  "success": true,
  "message": "Report verified successfully",
  "report": {...}
}
```

### Reject Report (Admin Only)
```
PUT /reports/:id/reject
Headers: Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "verificationNotes": "Insufficient evidence provided."
}

Response: 200
{
  "success": true,
  "message": "Report rejected",
  "report": {...}
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide company name, job title, and description"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No authorization token provided"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Admin access required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Report not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Error message here"
}
```

---

## Red Flag Options
- No interview process
- Unrealistic salary
- Upfront payment required
- Poor communication
- Fake job posting
- Identity theft attempts
- Spelling/grammar errors
- Unknown company

---

## Status Values
- `pending` - Awaiting admin verification
- `verified` - Confirmed scam report
- `rejected` - Report rejected by admin

---

## Example cURL Commands

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123","confirmPassword":"pass123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'
```

### Create Report
```bash
curl -X POST http://localhost:5000/api/reports \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"companyName":"Test","jobTitle":"Dev","description":"Suspicious posting with long description","redFlags":["Unrealistic salary"]}'
```

### Search Company
```bash
curl -X GET "http://localhost:5000/api/reports/search?company=Google"
```
