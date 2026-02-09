# Light ⚡
> A modern, engaging social media web application built with Next.js.

**Light** is designed to bring people together through visual stories, music, and short-form video. It features a sleek, responsive feed where every post comes alive with integrated audio, creating an immersive user experience.

## 🚀 Tech Stack
- **Framework:** Next.js 14 (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** React Icons
- **Media:** Next/Image & HTML5 Audio

## ✨ Features
- **Authentication:** Beautiful, fully responsive Login and Sign-up pages.
- **Interactive Feed:** Scroll through posts with high-quality images (Mobile Optimized).
- **Flicks 🎬:** A dedicated section for short-form vertical videos.
- **Music Player Integration:** Play audio tracks directly within posts.
- **Dynamic UI:** "Read More" truncation for long captions and expanding post details.

## 🗺️ Project Workflow & Roadmap

### Phase 1: Frontend & UI (Current Status)
- [x] **Project Setup**: Initialize Next.js with TypeScript & Tailwind.
- [x] **Authentication UI**:
  - [x] Sign In Page (Desktop & Mobile Ready).
  - [x] Sign Up Page (Desktop & Mobile Ready).
- [x] **Main Feed UI**:
  - [x] Mobile View (Vertical Scroll).
  - [ ] Desktop View (Sidebar Layout) — *In Progress*.
- [x] **Flicks 🎬 (Video Section)**:
  - [x] Mobile View (Reels/Shorts Style UI).
  - [ ] Desktop View — *Pending*.
- [x] **Smart Post Component**:
  - [x] **Audio Player Integration**: Play/Pause logic with animated music icons.
  - [x] **Caption System**: "More/Less" text truncation.
  - [x] **Action Buttons**: Like, Comment, Share, and Save UI.

### Phase 2: Interactivity & State
- [ ] **State Management**: Implement Redux Toolkit or Context API.
- [ ] **Like Logic**: Handle real-time like counts and heart animations.
- [ ] **Comments System**: Open a modal/drawer to view and add comments.
- [ ] **Share Functionality**: Copy link to clipboard or share to other apps.

### Phase 3: Backend & Data (Planned)
- [ ] **Authentication Logic**: Connect UI to backend (Clerk/NextAuth).
- [ ] **Database Setup**: MongoDB / PostgreSQL schema design.
- [ ] **API Routes**: Create endpoints for fetching and posting data.
- [ ] **File Upload**: Integrate Cloudinary or AWS S3 for image/audio/video storage.

### Phase 4: Deployment
- [ ] **Optimization**: Image/Video optimization and code splitting.
- [ ] **Deploy**: Launch on Vercel.

## 🛠️ Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev