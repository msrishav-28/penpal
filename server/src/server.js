import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import connectDB from './config/database.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import readingRoutes from './routes/readingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import readingSessionRoutes from './routes/readingSessionRoutes.js';
import gamificationRoutes from './routes/gamificationRoutes.js';
import googleBooksRoutes from './routes/googleBooksRoutes.js';
import importRoutes from './routes/importRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const httpServer = createServer(app);

// Socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false // Disable for development
}));
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/reading', readingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reading-session', readingSessionRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/google-books', googleBooksRoutes);
app.use('/api/import', importRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Socket.io event handlers
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join reading session room
  socket.on('join-session', (sessionId) => {
    socket.join(`session:${sessionId}`);
    console.log(`User ${socket.id} joined session ${sessionId}`);
  });

  // Leave reading session
  socket.on('leave-session', (sessionId) => {
    socket.leave(`session:${sessionId}`);
    console.log(`User ${socket.id} left session ${sessionId}`);
  });

  // Page turn event
  socket.on('page-turn', (data) => {
    socket.to(`session:${data.sessionId}`).emit('participant-page-turn', {
      userId: socket.userId,
      page: data.page,
      timestamp: new Date()
    });
  });

  // Add annotation
  socket.on('add-annotation', (data) => {
    io.to(`session:${data.sessionId}`).emit('new-annotation', {
      userId: socket.userId,
      text: data.text,
      page: data.page,
      timestamp: new Date()
    });
  });

  // Chat message
  socket.on('chat-message', (data) => {
    io.to(`session:${data.sessionId}`).emit('new-message', {
      userId: socket.userId,
      message: data.message,
      timestamp: new Date()
    });
  });

  // Reaction
  socket.on('reaction', (data) => {
    io.to(`session:${data.sessionId}`).emit('new-reaction', {
      userId: socket.userId,
      type: data.type,
      page: data.page,
      timestamp: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Socket.io server running`);
});
