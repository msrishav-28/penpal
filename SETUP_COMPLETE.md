# 🚀 Complete Setup Instructions

## Prerequisites
- Node.js 16+ installed
- MongoDB installed and running
- Git (for cloning)

## Step-by-Step Setup

### 1. Install All Dependencies

```bash
# Install frontend dependencies (from project root)
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

**Note**: This will install all new packages including:
- Redux Toolkit, Socket.io client, Framer Motion, Recharts (frontend)
- Socket.io, Helmet, Rate limiting, CSV parser (backend)

### 2. Environment Configuration

**Frontend `.env`** (already exists):
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend `server/.env`** (already exists):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/book-platform
JWT_SECRET=book-platform-secret-key-change-in-production-12345
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Start MongoDB

```bash
# Windows
mongod

# Mac/Linux
sudo mongod
```

### 4. Run the Application

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
📡 Socket.io server running
```

**Terminal 2 - Frontend Dev Server:**
```bash
npm run dev
```

You should see:
```
VITE ready in XX ms
➜  Local:   http://localhost:5173/
```

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 🧪 Testing New Features

### Test Reading Session API
```bash
# Start a reading session
curl -X POST http://localhost:5000/api/reading-session/session/start \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bookId": "BOOK_ID",
    "mood": "focused",
    "ambientSound": "rain"
  }'
```

### Test Google Books Search
```bash
curl "http://localhost:5000/api/google-books/search?q=harry+potter"
```

### Test Gamification
```bash
curl http://localhost:5000/api/gamification/leaderboard
```

### Test Achievements
```bash
curl -X GET http://localhost:5000/api/gamification/achievements \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🐛 Troubleshooting

### Lint Errors on Startup
**This is normal!** TypeScript will show errors until you run `npm install`. The errors are because:
- @reduxjs/toolkit and other packages aren't installed yet
- After `npm install`, all errors will resolve

### Port Already in Use
```bash
# Change PORT in server/.env to 5001 or kill process:
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill
```

### MongoDB Connection Failed
- Ensure MongoDB is running: `mongod`
- Check if port 27017 is available
- Try MongoDB Atlas (cloud) if local doesn't work

## 📚 Available API Endpoints

### New Endpoints
- `POST /api/reading-session/session/start` - Start timer
- `POST /api/reading-session/session/:id/end` - End session
- `GET /api/reading-session/sessions` - Get history
- `GET /api/reading-session/stats` - Reading statistics
- `GET /api/gamification/achievements` - User achievements
- `GET /api/gamification/profile` - Gamification profile
- `GET /api/gamification/leaderboard` - Global leaderboard
- `GET /api/google-books/search?q=query` - Search books
- `GET /api/google-books/isbn/:isbn` - Get by ISBN
- `POST /api/google-books/import` - Import book
- `POST /api/import/goodreads` - Upload CSV
- `GET /api/import/template` - Import instructions

### Existing Endpoints (Still Working)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/reviews`
- `GET /api/reading/progress`
- `POST /api/users/:id/follow`

## 🎯 Next Development Steps

### Build These Components Next:
1. **Reading Timer UI** (`src/pages/ReadingTimer.tsx`)
2. **Analytics Dashboard** (`src/pages/Analytics.tsx`)
3. **Achievements Page** (`src/pages/Achievements.tsx`)
4. **Google Books Search** (enhance `src/pages/Browse.tsx`)
5. **Import Page** (`src/pages/Import.tsx`)

### Example Component Structure:
```tsx
// src/pages/ReadingTimer.tsx
import { useDispatch, useSelector } from 'react-redux';
import { startSession, endSession } from '../store/slices/sessionSlice';

export default function ReadingTimer() {
  const dispatch = useDispatch();
  const { activeSession, isTimerRunning } = useSelector(state => state.session);
  
  // Your timer UI here
  return <div>Reading Timer</div>;
}
```

## 🔧 Development Tips

### Hot Reload
- Frontend: Auto-reloads on file changes (Vite HMR)
- Backend: Auto-restarts with nodemon

### Redux DevTools
- Install Redux DevTools browser extension
- Open devtools to see state changes

### Socket.io Testing
```javascript
// In browser console:
const socket = io('http://localhost:5000');
socket.on('connect', () => console.log('Connected!'));
```

### MongoDB GUI
- Install MongoDB Compass for visual database management
- Connect to: `mongodb://localhost:27017/book-platform`

## 📦 Package.json Scripts

### Frontend
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start with nodemon (auto-restart)
- `npm start` - Start production server

## ✅ Verification Checklist

After setup, verify:
- [ ] MongoDB is running
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can register a new user
- [ ] Can login
- [ ] Can search books
- [ ] Can view dashboard
- [ ] Google Books API works
- [ ] Gamification endpoints respond
- [ ] Socket.io connects (check browser console)

## 🎉 You're Ready!

The platform is now fully set up with:
- ✅ Enhanced database models (DNF, half-stars, sessions)
- ✅ Google Books integration
- ✅ Gamification system
- ✅ Reading session tracking
- ✅ Goodreads import capability
- ✅ Socket.io real-time features
- ✅ Redux state management
- ✅ Security & rate limiting

**Start building UI components to bring these features to life!**
