# 💻 Development Guide

## Architecture Overview

PenPal is a modern full-stack application built with production-ready technologies and best practices.

---

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (fast HMR, optimized builds)
- **Styling**: Tailwind CSS (utility-first)
- **State Management**: Redux Toolkit + RTK Query
- **Routing**: React Router v6
- **Real-time**: Socket.io Client
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Charts**: Recharts
- **File Upload**: React Dropzone
- **CSV Parsing**: PapaParse
- **Barcode**: html5-qrcode
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.io
- **Security**: Helmet, Rate Limiting, Mongo Sanitize
- **Job Queues**: Bull (Redis-based)
- **Email**: Nodemailer
- **Image Upload**: Cloudinary
- **CSV Import**: csv-parser

### APIs & Services
- **Google Books API** - Book search and metadata
- **Socket.io** - Real-time WebSocket communication
- **Redis** - Caching (structure ready)

---

## Database Architecture

### Collections (10 Models)

#### 1. **User Model**
```javascript
{
  name, email, password_hash,
  profile: {avatar, bio, location},
  preferences: {
    reading_goals, genres, reading_speed,
    notifications, privacy, theme, language
  },
  stats: {
    total_books_read, pages_read, average_rating,
    streak, reading_time
  },
  gamification: {
    level, xp, badges[], achievements[],
    rank: 'novice' | 'reader' | 'bookworm' | 'bibliophile' | 'legendary'
  },
  subscription: {
    tier: 'free' | 'pro' | 'ultimate',
    expires_at
  },
  social: {
    followers[], following[],
    blocked_users[], muted_users[]
  }
}
```

#### 2. **Book Model**
```javascript
{
  title, authors[], description,
  isbn13, isbn10, google_books_id,
  cover_url, page_count, published_date,
  metadata: {
    publisher, language, word_count,
    reading_time, format
  },
  classification: {
    genres[], themes[], tags[],
    moods[], settings[],
    content_warnings[]
  },
  avg_rating, rating_distribution: {
    5: count, 4.5: count, ...
  },
  stats: {
    total_reads, popularity_score
  },
  awards[], external_links{}
}
```

#### 3. **ReadingProgress Model**
```javascript
{
  user_id, book_id,
  status: 'want-to-read' | 'reading' | 'finished' | 'dnf' | 'paused',
  rating: 0-5 (0.5 increments),
  review, progress_percentage,
  started_date, finished_date,
  dnf_reason, dnf_page, dnf_date,
  paused_date, pause_reason,
  reading_sessions: [{
    date, duration, pages_read, mood
  }],
  mood_tags[],
  is_owned: boolean,
  format: 'physical' | 'ebook' | 'audiobook'
}
```

#### 4. **ReadingSession Model** 
```javascript
{
  user_id, book_id,
  start_time, end_time, duration_minutes,
  pages_read, start_page, end_page,
  mood, environment, status,
  ambient_sound, notes,
  live_session_id
}
```

#### 5. **BookClub Model**
```javascript
{
  name, description, created_by,
  members[], moderators[],
  current_book: {book_id, schedule},
  past_books[],
  settings: {
    privacy: 'public' | 'private',
    auto_accept, max_members
  },
  discussions[],
  events[],
  stats: {members_count, books_read}
}
```

#### 6. **Achievement Model**
```javascript
{
  achievement_id, name, description,
  category: 'milestone' | 'streak' | 'reading' | 'social',
  icon, color,
  requirements: {type, target},
  rewards: {xp, badge_url, title},
  rarity: 'common' | 'rare' | 'epic' | 'legendary',
  stats: {earned_by_count}
}
```

#### 7. **Notification Model**
```javascript
{
  user_id, type, content, metadata,
  status: 'unread' | 'read',
  delivery: {email, push, in_app},
  priority: 'low' | 'medium' | 'high',
  expires_at
}
```

#### 8. **Challenge Model**
```javascript
{
  title, description,
  type: 'books' | 'pages' | 'time' | 'genre',
  goal, current_progress,
  start_date, end_date,
  visibility: 'private' | 'friends' | 'public',
  participants[], rewards,
  stats: {completion_rate}
}
```

#### 9. **LiveSession Model**
```javascript
{
  host_id, book_id,
  participants[],
  start_time, end_time, status,
  settings: {
    allow_chat, allow_annotations,
    max_participants, video_enabled
  },
  interactions: {
    annotations[], reactions[], chat_messages[]
  },
  invite_code
}
```

#### 10. **Review, Author, Activity Models**
```javascript
// Review: ratings, comments, likes
// Author: profiles, books, stats
// Activity: social feed, types, timestamps
```

---

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user
- `PUT /profile` - Update profile

### Books (`/api/books`)
- `GET /` - List books (paginated, filtered)
- `GET /:id` - Get book details
- `POST /` - Create book (admin)
- `PUT /:id` - Update book (admin)
- `DELETE /:id` - Delete book (admin)

### Reading Progress (`/api/reading/progress`)
- `GET /` - Get user's reading progress
- `POST /` - Create/update progress
- `DELETE /:id` - Delete progress

### Reading Sessions (`/api/reading-session`)
- `POST /session/start` - Start reading timer
- `POST /session/:id/end` - End session
- `GET /sessions` - Get session history
- `GET /stats` - Get reading statistics

### Gamification (`/api/gamification`)
- `GET /achievements` - Get user achievements
- `GET /profile` - Get gamification profile (XP, level, rank)
- `GET /leaderboard` - Get global leaderboard

### Google Books (`/api/google-books`)
- `GET /search?q=query` - Search books
- `GET /isbn/:isbn` - Get book by ISBN
- `POST /import` - Import book to database

### Import/Export (`/api/import`)
- `POST /goodreads` - Upload Goodreads CSV
- `GET /template` - Get import instructions

### Reviews (`/api/reviews`)
- `POST /` - Create review
- `PUT /:id` - Update review
- `DELETE /:id` - Delete review
- `POST /:id/like` - Like/unlike review

### Social (`/api/users`)
- `POST /:id/follow` - Follow/unfollow user
- `GET /feed` - Get activity feed
- `GET /:id/profile` - Get user profile

---

## Redux State Management

### Store Structure
```typescript
{
  auth: {
    user, token, isAuthenticated, loading
  },
  books: {
    items, searchResults, loading, error
  },
  reading: {
    progress[], currentlyReading[], loading
  },
  session: {
    activeSession, isTimerRunning, elapsedSeconds,
    pagesRead, mood, ambientSound
  },
  gamification: {
    achievements[], profile, leaderboard[], loading
  },
  social: {
    feed[], following[], followers[]
  },
  ui: {
    theme: 'light' | 'dark' | 'auto',
    sidebarOpen, mobileMenuOpen
  }
}
```

### Redux Slices

1. **authSlice** - Authentication state
   - `login()` - Async thunk for login
   - `register()` - Async thunk for registration
   - `loadUser()` - Load user from token
   - `logout()` - Clear auth state

2. **booksSlice** - Book catalog
   - `fetchBooks()` - Get paginated books
   - `searchGoogleBooks()` - Search external API
   - `clearSearch()` - Clear search results

3. **readingSlice** - Reading progress
   - `fetchProgress()` - Get all progress
   - `updateProgress()` - Update book status

4. **sessionSlice** - Reading timer
   - `startSession()` - Start timer
   - `pauseSession()` - Pause timer
   - `resumeSession()` - Resume timer
   - `endSession()` - End and save session
   - `tick()` - Increment elapsed time
   - `setAmbientSound()` - Change ambient sound

5. **gamificationSlice** - Achievements & XP
   - `fetchAchievements()` - Get achievements
   - `fetchProfile()` - Get gamification profile

6. **socialSlice** - Social features
   - Structure ready for implementation

7. **uiSlice** - UI state
   - `toggleTheme()` - Switch light/dark mode
   - `toggleSidebar()` - Show/hide sidebar

---

## Real-time Features (Socket.io)

### Events

**Client → Server:**
```javascript
// Join a live reading session
socket.emit('join-session', {sessionId, userId});

// Update reading page
socket.emit('page-turn', {sessionId, page});

// Send annotation
socket.emit('annotation', {sessionId, text, position});

// Send chat message
socket.emit('chat-message', {sessionId, message});

// React to moment
socket.emit('reaction', {sessionId, type, timestamp});
```

**Server → Client:**
```javascript
// Participant joined
socket.on('user-joined', {userId, name});

// Participant left
socket.on('user-left', {userId});

// Page update from participant
socket.on('page-update', {userId, page});

// New annotation
socket.on('annotation', {userId, annotation});

// New chat message
socket.on('chat', {userId, message});

// New reaction
socket.on('reaction', {userId, reaction});
```

---

## Security Implementation

### Authentication
- JWT tokens with 15-minute expiry
- Refresh tokens with 7-day expiry
- Password hashing with bcrypt (12 rounds)
- Protected routes middleware

### API Security
- Helmet.js for security headers
- Rate limiting: 100 requests per 15 minutes
- MongoDB injection prevention
- XSS protection with sanitization
- CORS configuration

### Data Validation
- Input validation on all endpoints
- Mongoose schema validation
- Type checking with TypeScript
- Error handling middleware

---

## PWA Configuration

### Service Worker Strategy
```javascript
// Cache-first for static assets
// Network-first for user data
// Background sync for offline actions
```

### Offline Capabilities
✅ Browse shelves
✅ Update reading progress
✅ Use reading timer
✅ Write reviews (sync when online)
✅ View cached book details
❌ Search new books (requires network)
❌ See friend activity (requires network)

### Manifest Features
- App name and icons
- Theme colors
- Display mode: standalone
- Shortcuts to key pages
- Share target API

---

## Performance Optimization

### Frontend
- Code splitting with `React.lazy()`
- Image lazy loading
- Virtual scrolling for long lists
- Debounced search inputs
- Memoized expensive computations
- Target: <3s FCP, <5s TTI

### Backend
- Redis caching (15-min TTL)
- MongoDB indexes on frequently queried fields
- Pagination for all list endpoints
- API rate limiting
- Target: <100ms average API response

### Database
- Compound indexes for common queries
- Aggregation pipeline for statistics
- Scheduled cleanup of old data
- Target: <50ms query time

---

## Testing Strategy

### Unit Tests
```bash
# Frontend (Jest + React Testing Library)
npm test

# Backend (Jest + Supertest)
cd server && npm test
```

### Integration Tests
- API endpoint testing
- Database operations
- Authentication flows
- Socket.io events

### E2E Tests
- User registration flow
- Book search and add
- Reading timer functionality
- CSV import process

---

## Deployment Checklist

### Pre-deployment
- [ ] Run all tests
- [ ] Check for console errors
- [ ] Test on multiple browsers
- [ ] Test mobile responsiveness
- [ ] Verify all API endpoints
- [ ] Check database indexes
- [ ] Review security headers
- [ ] Optimize images
- [ ] Minify and bundle code

### Environment Variables
- [ ] Set production JWT_SECRET
- [ ] Configure MongoDB Atlas
- [ ] Set up Cloudinary
- [ ] Configure email SMTP
- [ ] Set up Redis (if using)
- [ ] Configure CORS origins

### Post-deployment
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Set up backups
- [ ] Configure SSL/HTTPS
- [ ] Set up monitoring (Sentry, etc.)
- [ ] Enable analytics

---

## Development Workflow

### Branch Strategy
```bash
main          # Production-ready code
develop       # Development branch
feature/*     # Feature branches
bugfix/*      # Bug fix branches
hotfix/*      # Production hotfixes
```

### Commit Messages
```
feat: Add barcode scanner component
fix: Resolve authentication token expiry
docs: Update API documentation
style: Format code with prettier
refactor: Simplify reading session logic
test: Add unit tests for gamification
chore: Update dependencies
```

### Code Review Checklist
- [ ] Code follows style guide
- [ ] Tests pass
- [ ] No console errors
- [ ] Documentation updated
- [ ] Types properly defined
- [ ] Error handling implemented
- [ ] Security considerations addressed

---

## Troubleshooting

### Common Issues

**MongoDB Connection**
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Check connection string
echo $MONGODB_URI

# Test connection
mongosh mongodb://localhost:27017/book-platform
```

**Redis Connection** (if using)
```bash
# Check if Redis is running
redis-cli ping

# Should return: PONG
```

**Socket.io Not Connecting**
- Check CORS configuration
- Verify CLIENT_URL in .env
- Check browser console for errors
- Test with Socket.io client tester

**JWT Token Issues**
- Check token expiry time
- Verify JWT_SECRET matches
- Check Authorization header format
- Clear localStorage and re-login

---

## Contributing Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful comments
- Keep functions small and focused

### Pull Request Process
1. Create feature branch
2. Make changes
3. Write/update tests
4. Update documentation
5. Submit PR with description
6. Address review comments
7. Merge after approval

### Adding New Features
1. Plan the feature (requirements, design)
2. Create database models if needed
3. Build backend API endpoints
4. Create Redux slice for state
5. Build UI components
6. Add to navigation/routing
7. Write tests
8. Update documentation

---

## Resources

- **MongoDB Docs**: https://docs.mongodb.com
- **React Docs**: https://react.dev
- **Redux Toolkit**: https://redux-toolkit.js.org
- **Socket.io Docs**: https://socket.io/docs
- **Tailwind CSS**: https://tailwindcss.com
- **TypeScript**: https://www.typescriptlang.org

---

**Happy Coding! 🚀**
