# 🚀 Stark Portfolio v4.0 - Full-Stack MERN CMS

Welcome to your upgraded, high-performance developer portfolio. This project has been transformed from a static site into a professional **Full-Stack MERN Application** with a custom "Iron Man / Stark Industries" premium tech theme.

---

## 🛠️ Tech Stack (A-Z)

### Frontend (Client-side)
- **React 18**: Core UI library.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS**: Utility-first styling with a custom "Premium Tech" design system.
- **Framer Motion**: For smooth, high-end "Machinery" animations.
- **React Router Dom**: For seamless navigation between pages and the Admin Dashboard.
- **Axios**: Handling secure API transmissions to the backend.

### Backend (Server-side)
- **Node.js & Express**: High-performance server environment.
- **MongoDB**: NoSQL database for storing Projects, Skills, and Contact Messages.
- **Mongoose**: Elegant ODM for MongoDB modeling.
- **JWT (JSON Web Tokens)**: Secure administrator authentication.
- **Bcrypt.js**: Industry-standard password hashing for security.
- **Concurrently**: Runs both frontend and backend simultaneously with one command.

---

## ✨ Key Features

1. **Admin Dashboard (CMS)**:
   - **Project Management**: Add, update, and delete your work assets directly from the UI.
   - **Skill Matrix**: Dynamic management of your technical stack.
   - **Inbox**: View and manage incoming messages from your contact form.
   - **Profile Settings**: Update your administrator credentials (username/password).

2. **Secure Authentication**:
   - Protected routes using JWT.
   - Registration system to allow new administrators to use the platform.

3. **Premium Design System**:
   - **Theme**: "Stark Intelligence" — Deep Charcoal Black, Premium Champagne Gold, and Mark-Armor Red.
   - **Glassmorphism**: High-end translucent cards and backdrop blurs.
   - **Machinery Touch**: Subtle technical grid backgrounds and HUD-inspired typography.

4. **Interactive Contact Form**:
   - Real-time validation and feedback.
   - Automatic storage of all messages in the MongoDB database.

---

## 📂 Project Structure

```text
New portfolio/
├── client/                # React (Vite) Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI (Hero, Navbar, etc.)
│   │   ├── pages/         # Page Layouts (Home, Login, Admin)
│   │   └── services/      # API configurations
│   └── tailwind.config.js # Custom Theme Tokens
├── server/                # Node.js Express Backend
│   ├── models/            # Database Schemas
│   ├── routes/            # API Endpoints
│   ├── middleware/        # Security & Auth filters
│   └── server.js          # Main Entry Point
├── package.json           # Root scripts (Concurrent run)
└── .env                   # Environment Variables (Secrets)
```

---

## ⚙️ How to Run Locally

1. **Prerequisites**: Ensure you have Node.js and MongoDB installed (or a MongoDB Atlas URI).
2. **Setup**:
   - Navigate to the root folder.
   - Run `npm install` in the root, `/client`, and `/server` folders.
3. **Environment Variables**:
   - Create a `.env` file in the `/server` folder with:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```
4. **Execution**:
   - Run the following command from the **root folder**:
     ```bash
     npm run dev
     ```
   - Your frontend will be at `http://localhost:5173` (or 5174).
   - Your backend will be at `http://localhost:5000`.

---

## 🎨 Theme Customization
The design is controlled via the `client/tailwind.config.js` file. You can adjust the following tokens to change the entire website's look:
- **Primary**: Gold (`#FFD700`)
- **Secondary**: Tech Red (`#EF4444`)
- **Base**: Dark Gray/Black (`#0A0A0A`)

---

## 🚀 Deployment Ready
This project is architected for modern deployment:
- **Frontend**: Best deployed on **Vercel** or **Netlify**.
- **Backend**: Best deployed on **Render** or **Railway**.
- **Database**: Use **MongoDB Atlas** for a production-ready cloud database.

---

*Engineered with precision for Kabir Saboo.*
