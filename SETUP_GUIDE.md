# 🚀 Complete Setup & Run Guide

## Step-by-Step Instructions to Run Your Full-Stack Book Platform

### ✅ Prerequisites Check

Before starting, ensure you have:
- [ ] **Node.js** v16+ installed ([Download](https://nodejs.org/))
- [ ] **MongoDB** installed locally ([Download](https://www.mongodb.com/try/download/community))
  - OR MongoDB Atlas account (free tier available)
- [ ] **npm** or **yarn** package manager
- [ ] A terminal/command prompt

---

## 🛠️ Installation & Setup

### Step 1: Install Dependencies

**Install Frontend Dependencies:**
```bash
npm install
```

**Install Backend Dependencies:**
```bash
cd server
npm install
cd ..
```

### Step 2: Environment Configuration

✅ **Frontend `.env` file is already created** at project root with:
```env
VITE_API_URL=http://localhost:5000/api
```

✅ **Backend `server/.env` file is already created** with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/book-platform
JWT_SECRET=book-platform-secret-key-change-in-production-12345
NODE_ENV=development
```

**If using MongoDB Atlas** (instead of local MongoDB):
1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Update `MONGODB_URI` in `server/.env` to your Atlas connection string

---

## 🚀 Running the Application

### Option A: Run Everything (Recommended)

You'll need **3 terminal windows**:

**Terminal 1 - MongoDB:**
```bash
# Start MongoDB (skip if using Atlas)
mongod
```

**Terminal 2 - Backend Server:**
```bash
cd server
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running on port 5000
```

**Terminal 3 - Frontend:**
```bash
# From the root directory
npm run dev
```

You should see:
```
VITE v5.4.8  ready in 225 ms
➜  Local:   http://localhost:5173/
```

### Option B: Using npm scripts

Create these scripts in root `package.json` (optional):
```json
"scripts": {
  "start:backend": "cd server && npm run dev",
  "start:frontend": "npm run dev",
  "dev": "concurrently \"npm run start:backend\" \"npm run start:frontend\""
}
```

---

## 🎯 Access the Application

Once everything is running:

1. **Open your browser**
2. Navigate to: **http://localhost:5173**
3. You'll be redirected to the **Login page**

---

## 👤 Create Your First Account

### Register a New User

1. Click "**Register here**" link
2. Fill in:
   - **Full Name**: Your name
   - **Email**: your@email.com
   - **Password**: At least 6 characters
   - **Confirm Password**: Same password
3. Click "**Create Account**"
4. You'll be automatically logged in and redirected to Dashboard

### Or Test with API

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 🧪 Testing the Backend API

### Health Check
```bash
curl http://localhost:5000/api/health
```

Expected: `{"status":"ok","message":"Server is running"}`

### Get Books
```bash
curl http://localhost:5000/api/books
```

### Login Test
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 📊 Features Now Working

✅ **User Authentication**
- Register new account
- Login with email/password
- JWT token-based auth
- Automatic session persistence
- Logout functionality

✅ **Dashboard**
- Displays user's reading challenge
- Shows currently reading books with progress
- Real-time progress tracking
- Dynamic data from backend

✅ **Protected Routes**
- All pages require authentication
- Automatic redirect to login if not authenticated
- Token validation on page load

✅ **User Profile**
- Display user info in header
- User avatar (initial letter)
- Dropdown menu with logout

---

## 🔍 Troubleshooting

### MongoDB Connection Issues

**Error**: `MongooseError: Could not connect to any servers`

**Solutions**:
1. Make sure MongoDB is running: `mongod`
2. Check if port 27017 is available
3. Try restarting MongoDB service
4. Or use MongoDB Atlas instead

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solutions**:
1. Change PORT in `server/.env` to a different port (e.g., 5001)
2. Or kill the process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -ti:5000 | xargs kill -9
   ```

### Frontend Can't Connect to Backend

**Error**: CORS or Network errors in browser console

**Solutions**:
1. Verify backend is running on port 5000
2. Check `.env` file has correct `VITE_API_URL`
3. Restart frontend dev server after .env changes

### Authentication Not Working

**Solutions**:
1. Clear browser localStorage: `localStorage.clear()` in console
2. Check JWT_SECRET is set in `server/.env`
3. Verify MongoDB is running and accessible

---

## 📦 Project Structure

```
book-platform/
├── src/                        # Frontend
│   ├── components/
│   │   ├── ui/                # Reusable components
│   │   ├── layout/            # Header, Footer
│   │   └── features/          # Feature components
│   ├── pages/                 # Page components
│   │   ├── Login.tsx          # ✨ NEW
│   │   ├── Register.tsx       # ✨ NEW
│   │   └── Dashboard.tsx      # Updated with real data
│   ├── services/              # ✨ NEW: API services
│   ├── hooks/                 # ✨ NEW: Custom hooks
│   ├── contexts/              # App state management
│   └── types/                 # TypeScript types
│
├── server/                     # ✨ NEW: Backend
│   ├── src/
│   │   ├── models/            # Database models
│   │   ├── controllers/       # API logic
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Auth middleware
│   │   └── server.js          # Express server
│   ├── .env                   # Backend config
│   └── package.json
│
├── .env                       # Frontend config
└── package.json               # Frontend dependencies
```

---

## 🎓 What You Can Do Now

### As a User
1. **Register/Login** - Create an account and login
2. **View Dashboard** - See your personalized dashboard
3. **Track Reading** - View currently reading books (will show data from backend)
4. **Reading Challenge** - Track your yearly reading goal
5. **Navigate** - Access My Books, Browse, Community pages
6. **Logout** - Click your avatar and logout

### As a Developer
1. **Add Books** - Use the API to add books
2. **Create Reviews** - Implement review forms
3. **Update Progress** - Track reading progress
4. **Social Features** - Implement follow system
5. **Search** - Add book search functionality
6. **Extend Features** - Add more pages and features

---

## 🔗 API Endpoints Available

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Books
- `GET /api/books` - Get all books
- `GET /api/books/search?q=query` - Search books
- `GET /api/books/:id` - Get book details
- `POST /api/books` - Create book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Reading Progress
- `GET /api/reading/progress` - Get progress
- `POST /api/reading/progress` - Update progress
- `DELETE /api/reading/progress/:bookId` - Remove progress

### Reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review
- `POST /api/reviews/:id/like` - Like review

### Users & Social
- `GET /api/users/:id` - Get user profile
- `POST /api/users/:id/follow` - Follow user
- `GET /api/users/feed` - Get activity feed

---

## 📝 Next Steps

1. **Test the login/register flow**
2. **Add some books via API**
3. **Implement book browsing UI**
4. **Add review forms**
5. **Implement search functionality**
6. **Add more social features**

---

## 💡 Tips

- Use **MongoDB Compass** for GUI database management
- Use **Postman** or **Thunder Client** for API testing
- Check browser **DevTools Console** for frontend errors
- Check **terminal** for backend errors
- Use **React DevTools** extension for React debugging

---

## 🆘 Need Help?

- Backend API docs: `server/README.md`
- Main README: `README.md`
- Quick start: `QUICKSTART.md`

---

**Your Full-Stack Book Platform is Ready!** 🎉

Happy coding! 📚✨
