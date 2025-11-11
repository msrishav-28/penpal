# Quick Start Guide

Get your Book Platform up and running in minutes!

## Prerequisites

✅ **Node.js** v16 or higher  
✅ **MongoDB** (local installation or MongoDB Atlas account)  
✅ **npm** or **yarn**

## 🚀 Setup in 5 Steps

### Step 1: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Step 2: Configure Environment Variables

**Frontend** - Create `.env` in root:
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend** - Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/book-platform
JWT_SECRET=my-super-secret-jwt-key-12345
NODE_ENV=development
```

### Step 3: Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas:**
- Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string
- Update `MONGODB_URI` in `server/.env`

### Step 4: Start the Backend

```bash
cd server
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running on port 5000
```

### Step 5: Start the Frontend

In a new terminal:
```bash
npm run dev
```

Visit **http://localhost:5173** 🎉

## 🧪 Test the Setup

1. **Check Backend Health:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   
   Should return: `{"status":"ok","message":"Server is running"}`

2. **Open Frontend:**
   Navigate to http://localhost:5173 in your browser

3. **Create a Test User:**
   - Click "Register" (you'll need to implement this in the UI)
   - Or use an API client like Postman:
     ```
     POST http://localhost:5000/api/auth/register
     Body: {
       "name": "Test User",
       "email": "test@example.com",
       "password": "password123"
     }
     ```

## 📁 Project Structure

```
book-platform/
├── src/                 # Frontend React app
├── server/             # Backend Express API
├── .env                # Frontend environment variables
└── server/.env         # Backend environment variables
```

## 🔑 API Testing

Use these endpoints to test your backend:

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"pass123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'
```

### Get Books
```bash
curl http://localhost:5000/api/books
```

## 🐛 Troubleshooting

### MongoDB Connection Failed
- **Issue**: `Error: connect ECONNREFUSED 127.0.0.1:27017`
- **Solution**: Make sure MongoDB is running (`mongod` command)

### Port Already in Use
- **Issue**: `Error: listen EADDRINUSE: address already in use :::5000`
- **Solution**: Change the `PORT` in `server/.env` or kill the process using port 5000

### CORS Errors
- **Issue**: Frontend can't connect to backend
- **Solution**: Verify `VITE_API_URL` in frontend `.env` matches your backend URL

### Module Not Found
- **Issue**: `Cannot find module 'express'`
- **Solution**: Run `npm install` in the server directory

## 🎯 Next Steps

1. **Explore the API** - Check out `server/README.md` for all endpoints
2. **Customize the Frontend** - Modify components in `src/components/`
3. **Add Features** - Extend models in `server/src/models/`
4. **Deploy** - See deployment guides in main README

## 📚 Learn More

- [Full README](./README.md)
- [Backend API Documentation](./server/README.md)
- [Frontend Architecture](./docs/FRONTEND.md) *(if created)*

## 💡 Pro Tips

- Use **MongoDB Compass** for a GUI to view your database
- Install **Thunder Client** or **Postman** for API testing
- Use **React DevTools** for debugging React components
- Check **browser console** for frontend errors
- Check **terminal** for backend errors

---

Happy coding! 🚀
