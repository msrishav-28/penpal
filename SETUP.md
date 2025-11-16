# 🚀 Setup & Installation Guide

## Prerequisites

- **Node.js** 16+ and npm
- **MongoDB** (local or Atlas)
- **Git** for cloning

---

## Quick Start (5 Minutes)

```bash
# 1. Clone the repository
git clone https://github.com/msrishav-28/penpal.git
cd penpal

# 2. Install dependencies
npm install
cd server && npm install && cd ..

# 3. Configure environment variables
# Frontend: Create .env in root (already exists)
VITE_API_URL=http://localhost:5000/api

# Backend: Create server/.env (already exists)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/book-platform
JWT_SECRET=book-platform-secret-key-change-in-production-12345
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# 4. Start MongoDB
mongod

# 5. Run the application
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
npm run dev

# 6. Access the app
# Frontend: http://localhost:5173
# Backend API: http://localhost:5000
```

---

## Detailed Setup

### 1. Install Dependencies

**Frontend dependencies** include:
- React 18 + TypeScript
- Redux Toolkit for state management
- Socket.io client for real-time features
- Recharts for analytics visualization
- Framer Motion for animations
- html5-qrcode for barcode scanning
- PapaParse for CSV import
- React Dropzone for file uploads

**Backend dependencies** include:
- Express.js web framework
- MongoDB + Mongoose ODM
- Socket.io for WebSockets
- JWT for authentication
- Helmet for security headers
- Rate limiting for API protection
- Bull for job queues
- Nodemailer for email notifications

### 2. Database Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB
mongod --dbpath /path/to/data

# The app will auto-create the database and collections
```

**Option B: MongoDB Atlas (Cloud)**
```bash
# 1. Create free account at mongodb.com/cloud/atlas
# 2. Create a cluster
# 3. Get connection string
# 4. Update MONGODB_URI in server/.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/book-platform
```

### 3. Environment Configuration

**Frontend** (`.env` in project root):
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend** (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/book-platform
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Optional: Add these for full functionality
GOOGLE_BOOKS_API_KEY=your-google-books-api-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 4. Development Workflow

```bash
# Start backend with auto-reload
cd server
npm run dev

# Start frontend with hot module replacement
npm run dev

# Run tests (when implemented)
npm test

# Build for production
npm run build
```

---

## Testing the Application

### Test Backend APIs

```bash
# Test health check
curl http://localhost:5000/api/health

# Test user registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Test Google Books search
curl "http://localhost:5000/api/google-books/search?q=harry+potter"

# Test reading session start (requires auth token)
curl -X POST http://localhost:5000/api/reading-session/session/start \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bookId": "BOOK_ID",
    "mood": "focused",
    "ambientSound": "rain"
  }'
```

### Test Frontend Features

1. **Registration & Login**
   - Navigate to http://localhost:5173/register
   - Create a test account
   - Login with credentials

2. **Book Discovery**
   - Go to /browse
   - Search for books
   - Click "Scan ISBN" to test barcode scanner

3. **Reading Timer**
   - Navigate to /timer
   - Select a book and mood
   - Start a reading session
   - Test ambient sounds

4. **Analytics Dashboard**
   - Go to /analytics
   - View reading statistics
   - Check charts and heatmap

5. **Achievements**
   - Visit /achievements
   - View unlocked achievements
   - Check progress bars

6. **Import Books**
   - Go to /import
   - Download sample template
   - Upload Goodreads CSV

---

## Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill
```

### MongoDB Connection Failed
- Ensure MongoDB is running: `mongod`
- Check if port 27017 is available
- Verify MONGODB_URI in .env
- Try MongoDB Atlas if local fails

### npm install Errors
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
- These are expected before running `npm install`
- All errors resolve after dependencies install
- If persisting, restart VS Code/IDE

### CORS Errors
- Ensure CLIENT_URL in server/.env matches frontend URL
- Check CORS configuration in server/src/server.js
- Clear browser cache

---

## Production Deployment

### Frontend (Vercel/Netlify)

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod
```

**Environment Variables for Production:**
```
VITE_API_URL=https://your-api-domain.com/api
```

### Backend (Railway/Heroku)

```bash
# Deploy to Railway
railway up

# Deploy to Heroku
heroku create your-app-name
git push heroku main
```

**Environment Variables for Production:**
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=super-long-random-secret-at-least-32-chars
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com
```

### Database (MongoDB Atlas)

1. Create production cluster
2. Configure IP whitelist
3. Create database user
4. Get connection string
5. Update MONGODB_URI

---

## PWA Installation

The app is a Progressive Web App and can be installed:

**Desktop:**
1. Open app in Chrome/Edge
2. Click install icon in address bar
3. Or: Settings → Install PenPal

**Mobile:**
1. Open in mobile browser
2. Tap "Add to Home Screen"
3. App works offline!

---

## Development Scripts

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend
npm run dev          # Start with nodemon (auto-restart)
npm start            # Start production server
npm run seed         # Seed database (if implemented)
```

---

## Project Structure

```
book-platform/
├── public/              # Static files + PWA
│   ├── manifest.json
│   ├── service-worker.js
│   └── offline.html
├── src/                 # Frontend source
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── store/           # Redux store + slices
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom hooks
│   ├── services/        # API services
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
├── server/              # Backend source
│   └── src/
│       ├── models/      # Mongoose models (10 models)
│       ├── controllers/ # Route controllers (9 controllers)
│       ├── services/    # Business logic (4 services)
│       ├── routes/      # API routes
│       ├── middleware/  # Auth, validation
│       └── config/      # Configuration
├── .env                 # Frontend environment variables
├── server/.env          # Backend environment variables
└── package.json         # Dependencies
```

---

## Next Steps

After setup:

1. ✅ Register a user account
2. ✅ Add some books to your library
3. ✅ Start a reading session with timer
4. ✅ Check out the analytics dashboard
5. ✅ Try importing from Goodreads CSV
6. ✅ Scan a book barcode
7. ✅ Join or create a book club
8. ✅ Explore achievements

---

## Support

- **GitHub Issues**: Report bugs or request features
- **Documentation**: See `findings.md` for detailed requirements
- **Development Guide**: See `DEVELOPMENT.md` for architecture

---

**Happy Reading! 📚**
