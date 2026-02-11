# 🧠 AI Note-Taking App

A full-stack AI-powered note-taking application built using Next.js (App Router), Hono.js, MongoDB, and Groq LLM.

This project demonstrates authentication, protected routing, secure user-based data isolation, AI integration, and modern UI/UX practices.

---

## 🚀 Live Features

- 🔐 Authentication (NextAuth - Credentials)
- 📝 Create, Edit, Delete Notes
- 🔍 Search Notes by Title
- 🤖 AI Summary (short & long text handling)
- ✨ AI Improve (grammar & clarity enhancement)
- 🏷 AI Tag Generation (exact 5 clean tags)
- 👤 Profile Management (Editable user info)
- 🌙 Dark / Light Theme Toggle
- 🔒 User-specific notes isolation
- ⚡ Responsive UI (Mobile + Desktop)

---

## 🏗 Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- shadcn/ui
- React Hook Form

### Backend
- Hono.js (API Layer)
- MongoDB (Mongoose)
- NextAuth (JWT Session Strategy)

### AI Integration
- Groq LLM (Llama 3.1 Instant Model)

---

## 🧠 Architecture Overview

Frontend → API Layer (Hono) → MongoDB  
                      ↓  
                      Groq AI  

- Authentication handled via NextAuth (JWT)
- Each API route verifies session
- Notes filtered using `userId`
- AI handled server-side for security
- Secure CRUD operations using user-based queries

---

## 🔐 Security Implementation

- Password hashing with bcrypt
- Session-based authorization
- Protected dashboard layout
- Secure update/delete queries:
  
```
findOneAndUpdate({ _id: id, userId: session.user.id })
```

- Users cannot access other users' notes

---

## 📂 Project Structure

```
app/
 ├── (auth)/login
 ├── (auth)/register
 ├── dashboard/
 │    └── notes/
 ├── profile/
 └── api/
      ├── auth/
      ├── profile/
      └── [...hono]/route.ts

components/
lib/
server/models/
types/
middlewares
```

---

## 🤖 AI Prompt Design

### Summary Logic
- Short input → rewritten concisely
- Long input → summarized in 3–4 lines
- Clean structured output

### Tag Generation Rules
- Exactly 5 tags
- Comma-separated
- No numbering
- No hashtags
- No explanations

---

## 🛠 How To Run Locally

### 1️⃣ Install Dependencies

```
npm install
```

### 2️⃣ Create Environment File

Create `.env.local`:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret
GROQ_API_KEY=your_groq_api_key
NEXTAUTH_URL=http://localhost:3000
```

### 3️⃣ Run Development Server

```
npm run dev
```

Visit:

```
http://localhost:3000
```

---

## 🗄 Database Schema

### User Model

- name
- email
- password
- bio
- phone
- location
- avatar

### Note Model

- title
- content
- userId
- createdAt
- updatedAt

---

## 🌙 Theme System

Tailwind dark mode using:

```
<html class="dark">
```

Global theme toggle modifies HTML class dynamically.

---

## 📦 Production Build

```
npm run build
npm start
```

---

## 🌍 Deployment

Deployed via Vercel with environment variables configured in dashboard.

---

## 🎯 Key Design Decisions

- Used Hono for lightweight API routing
- JWT session strategy for scalability
- Server-side AI calls for security
- Strict TypeScript for reliability
- Clean separation of concerns
- Reusable UI components

---

## 👨‍💻 Developer

Bikash Kumar Singh  
  

---

## 💡 Future Enhancements

- Rich Text Editor
- AI Auto-Suggest While Typing
- Notes Sharing
- AI Note Categorization
- Image Upload Support
- Rate limiting for AI usage

---

## 🏁 Conclusion

This project demonstrates full-stack development capability with:

- Secure authentication
- Database modeling
- RESTful APIs
- AI integration
- Clean UI/UX
- User isolation & authorization
- Production-ready architecture

