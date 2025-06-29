import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BookDetail from './pages/BookDetail';
import AuthorProfile from './pages/AuthorProfile';
import MyBooks from './pages/MyBooks';
import Browse from './pages/Browse';
import Community from './pages/Community';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/my-books" element={<MyBooks />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/author/:id" element={<AuthorProfile />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;