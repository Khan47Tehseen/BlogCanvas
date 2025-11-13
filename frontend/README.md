# BlogCanvas - MERN Stack Blog CMS

A full-stack blog content management system built with the MERN stack, featuring rich text editing and user authentication.

## 🚀 Features

- **User Authentication** - JWT-based register/login system
- **Rich Text Editor** - Quill.js for beautiful content creation
- **Blog Management** - Create, read, update, delete posts
- **Draft System** - Save posts as drafts or publish immediately
- **Tags System** - Organize content with tags
- **Author Permissions** - Users can only edit/delete their own posts
- **Responsive Design** - Works on all devices

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Context API, Quill.js
- **Backend**: Node.js, Express.js, JWT
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt

## 📦 Installation

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Setup
Create `.env` file in backend directory with:
```env
MONGODB_URI=mongodb://localhost:27017/blog-cms
JWT_SECRET=your_jwt_secret_here_change_in_production
PORT=5000
```
