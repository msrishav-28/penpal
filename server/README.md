# Book Platform Backend API

A comprehensive RESTful API for a social book platform with user authentication, book management, reviews, reading progress tracking, and social features.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth system
- 📚 **Book Management** - CRUD operations for books
- ⭐ **Reviews & Ratings** - User reviews with likes
- 📖 **Reading Progress** - Track reading status and progress
- 👥 **Social Features** - Follow users, activity feed
- 🔍 **Search** - Full-text search for books
- 📊 **Reading Challenges** - Set and track reading goals

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/book-platform
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### Running the Server

Development mode (with nodemon):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Books
- `GET /api/books` - Get all books (with pagination & filters)
- `GET /api/books/search?q=query` - Search books
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create book (Protected)
- `PUT /api/books/:id` - Update book (Protected)
- `DELETE /api/books/:id` - Delete book (Protected)
- `GET /api/books/:id/reviews` - Get book reviews

### Reviews
- `POST /api/reviews` - Create review (Protected)
- `PUT /api/reviews/:id` - Update review (Protected)
- `DELETE /api/reviews/:id` - Delete review (Protected)
- `POST /api/reviews/:id/like` - Like/unlike review (Protected)

### Reading Progress
- `GET /api/reading/progress` - Get user's reading progress (Protected)
- `POST /api/reading/progress` - Update reading progress (Protected)
- `DELETE /api/reading/progress/:bookId` - Delete progress (Protected)

### Users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users/:id/follow` - Follow/unfollow user (Protected)
- `GET /api/users/:id/followers` - Get user's followers
- `GET /api/users/:id/following` - Get user's following
- `GET /api/users/feed` - Get activity feed (Protected)

## Data Models

### User
- name, email, password
- avatar, bio
- reading goal (year, target, completed)
- lists (booksRead, currentlyReading, wantToRead)
- social (followers, following)

### Book
- title, author, isbn
- description, coverUrl
- pages, publishedDate, publisher
- genres, language
- ratings (averageRating, ratingsCount, reviewsCount)

### Review
- user, book
- rating (1-5), comment
- likes, likesCount

### Reading Progress
- user, book
- currentPage, totalPages
- status (want-to-read, currently-reading, finished)
- dates (startDate, finishDate)

### Activity
- user, type
- references (book, review, targetUser, author)
- rating

## Authentication

Protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

The token is returned upon successful login/registration.

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error response format:
```json
{
  "message": "Error description"
}
```

## Development

The backend is structured for scalability and maintainability:

```
server/
├── src/
│   ├── models/          # Mongoose models
│   ├── controllers/     # Request handlers
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & other middleware
│   ├── config/          # Database config
│   ├── services/        # Business logic
│   └── utils/           # Helper functions
├── .env                 # Environment variables
└── package.json         # Dependencies
```

## License

MIT
