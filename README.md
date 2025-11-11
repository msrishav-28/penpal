# Book Platform - Full Stack Application

A modern, full-stack social book platform inspired by Goodreads, built with React, TypeScript, Node.js, Express, and MongoDB.

## 🚀 Features

### Frontend
- 📱 Modern, responsive UI with Tailwind CSS
- 🎨 Beautiful glassmorphism design
- ⚡ Fast performance with Vite
- 🔒 User authentication & authorization
- 📚 Book browsing and search
- ⭐ Reviews and ratings
- 📖 Reading progress tracking
- 🎯 Reading challenges
- 👥 Social features (follow users, activity feed)
- 🏗️ Modular component architecture

### Backend
- 🔐 JWT authentication
- 📊 RESTful API design
- 💾 MongoDB database
- 🔍 Full-text search
- 📈 Reading statistics
- 🌐 CORS enabled
- 🛡️ Secure password hashing

## 📁 Project Structure

```
book-platform/
├── src/                    # Frontend source
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── layout/        # Layout components
│   │   └── features/      # Feature components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── services/          # API services
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
└── server/                # Backend source
    └── src/
        ├── models/        # Database models
        ├── controllers/   # Route controllers
        ├── routes/        # API routes
        ├── middleware/    # Middleware
        ├── config/        # Configuration
        └── services/      # Business logic
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Context API
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Security**: bcryptjs for password hashing

## 🚀 Getting Started

### Prerequisites
- Node.js v16+ and npm
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd book-platform
```

2. **Install Frontend Dependencies**
```bash
npm install
```

3. **Install Backend Dependencies**
```bash
cd server
npm install
```

4. **Configure Environment Variables**

Frontend (.env):
```env
VITE_API_URL=http://localhost:5000/api
```

Backend (server/.env):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/book-platform
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

5. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

6. **Start Backend Server**
```bash
cd server
npm run dev
```

7. **Start Frontend Development Server**
```bash
# In the root directory
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📖 API Documentation

See [server/README.md](./server/README.md) for detailed API documentation.

### Key Endpoints
- `/api/auth/*` - Authentication
- `/api/books/*` - Book management
- `/api/reviews/*` - Reviews and ratings
- `/api/reading/*` - Reading progress
- `/api/users/*` - User profiles and social

## 🏗️ Architecture

### Frontend Architecture
- **Modular Components**: Organized by feature and reusability
- **Service Layer**: Clean API abstraction
- **Type Safety**: Full TypeScript coverage
- **Context API**: Global state management
- **Custom Hooks**: Reusable logic
- **Error Boundaries**: Graceful error handling

### Backend Architecture
- **MVC Pattern**: Separation of concerns
- **RESTful Design**: Standard HTTP methods
- **Middleware**: Authentication, validation
- **Database Models**: Mongoose schemas
- **Error Handling**: Centralized error management

## 🔒 Authentication Flow

1. User registers/logs in
2. Server validates credentials
3. JWT token generated and returned
4. Token stored in localStorage
5. Token sent with protected requests
6. Server verifies token on protected routes

## 📦 Building for Production

### Frontend
```bash
npm run build
```

### Backend
```bash
cd server
npm start
```

## 🧪 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start with nodemon
- `npm start` - Start production server

## 🌟 Key Features Explained

### Reading Progress Tracking
Track your reading journey with:
- Current page updates
- Reading status (want-to-read, currently-reading, finished)
- Automatic percentage calculation
- Reading challenges

### Social Features
- Follow other readers
- Activity feed with updates from followed users
- Like and comment on reviews
- Author profiles

### Search & Discovery
- Full-text search across books
- Filter by genre, author
- Personalized recommendations

## 🔧 Development Guidelines

- Follow component-based architecture
- Use TypeScript for type safety
- Write reusable components
- Keep API services separate
- Use proper error handling
- Follow RESTful API conventions

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please follow the project structure and coding standards.

---

Built with ❤️ using React, TypeScript, Node.js, and MongoDB
