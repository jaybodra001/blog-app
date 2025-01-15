# Blog App

Live: https://blog-app-ymhw.onrender.com

## Overview
The Blog App is a full-stack web application designed for creating, managing, and reading blogs. It features a responsive frontend built with React.js and a robust backend powered by Node.js, Express.js, and MongoDB. The app includes user authentication, blog management, and other essential features to deliver a seamless blogging experience.

---

## Features
1. **User Authentication**:
   - Secure registration and login using JWT (JSON Web Tokens).
   - Passwords are hashed using bcryptjs.

2. **Blog Management**:
   - Create, edit, and delete blog posts.
   - Upload images using Multer for blog content.

3. **Interactive UI**:
   - Built with React.js and styled using Tailwind CSS.
   - Navigation handled by React Router DOM.

4. **Real-time Notifications**:
   - Integrated with React Hot Toast for user feedback.

5. **State Management**:
   - Utilizes Zustand for efficient and minimal state management.

6. **Database**:
   - MongoDB with Mongoose for data modeling.

---

## Tech Stack

### **Frontend**
- React.js
- React Router DOM
- Tailwind CSS
- Zustand

### **Backend**
- Node.js
- Express.js
- JWT for authentication
- Multer for file uploads
- Mongoose for MongoDB

### **Database**
- MongoDB (Cloud-hosted on MongoDB Atlas)

---

## Installation and Setup

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB Atlas account or local MongoDB setup.

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jaybodra001/Blog-App.git
   cd Blog-App
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd Backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `Backend` directory with the following content:
     ```env
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/blog_DB?retryWrites=true&w=majority
     PORT=5050
     JWT_SECRET=your_jwt_secret
     NODE_ENV=development
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

4. **Build the Application**:
   - Build the frontend for production:
     ```bash
     npm run build --prefix frontend
     ```
   - Start the application in production mode:
     ```bash
     npm run start
     ```

---

## Scripts

### Backend
- `npm run dev`: Start the backend server in development mode.
- `npm run start`: Start the backend server in production mode.

### Frontend
- `npm run dev`: Start the React development server.
- `npm run build`: Build the React app for production.
- `npm run preview`: Preview the production build.

---

## Dependencies

### Backend
- `axios`: For making HTTP requests.
- `bcryptjs`: For hashing passwords.
- `cookie-parser`: For handling cookies.
- `dotenv`: For environment variable management.
- `express`: Web framework.
- `jsonwebtoken`: For secure authentication.
- `mongoose`: For MongoDB interaction.
- `multer`: For handling file uploads.

### Frontend
- `react`: For building the user interface.
- `react-dom`: For rendering React components.
- `react-hot-toast`: For notifications.
- `react-router-dom`: For routing.
- `zustand`: For state management.

### Development Tools
- `nodemon`: For live-reloading during backend development.
- `vite`: For fast frontend development.
- `eslint`: For code linting.
- `tailwindcss`: For styling.

---

## Folder Structure
```
Blog-App/
├── Backend/
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.js
│   │   └── index.js
├── package.json
├── README.md
└── .env
```

---

## License
This project is licensed under the ISC License.

---

## Author
Jay Bodra

