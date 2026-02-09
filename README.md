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

### Phase 1: Core UI & Components (Current Focus)
- [x] **Project Setup**: Initialize Next.js with TypeScript & Tailwind.
- [x] **Navigation**:
  - [x] **Mobile Bottom Navigation Bar**: Fully responsive and functional.
  - [ ] Desktop Sidebar.
- [x] **Authentication UI**:
  - [x] Sign In Page (Desktop & Mobile Ready).
  - [x] Sign Up Page (Desktop & Mobile Ready).
- [x] **Main Feed UI**:
  - [x] Mobile View (Vertical Scroll).
  - [ ] Desktop View — *In Progress*.

### Phase 2: Feature Components
- [x] **Smart Post Component**:
  - [x] **Audio Player**: Play/Pause logic with animated music icons.
  - [x] **Caption System**: "More/Less" text truncation.
  - [x] **Action Buttons**: Like, Comment, Share, and Save UI.
- [ ] **Smart Flicks (Video) Component**:
  - [x] **Mobile UI**: Reels/Shorts style layout.
  - [x] **Caption System**: "More/Less" text truncation.
  - [ ] **Video Player Logic**: Hold to Pause / Tap to Mute.
  - [ ] **Action Buttons**: Like, Comment, Share, and Save UI.

### Phase 3: Additional Pages & Features (Pending)
- [ ] **Explore Page**: Discover new content and trending posts.
- [ ] **Notification Page**: Activity feed for likes, comments, and follows.
- [ ] **Messaging System**: Direct messages and chat UI.
- [ ] **Profile Page**: User bio, grid view of posts, and stats.
- [ ] **Creation Tools**:
  - [ ] **Create Post Page**: Upload images with caption and music.
  - [ ] **Create Video Page**: Upload vertical videos for Flicks.

### Phase 4: Backend & Data (Planned)
- [ ] **Authentication Logic**: Connect UI to backend (Clerk/NextAuth).
- [ ] **Database Setup**: MongoDB / PostgreSQL schema design.
- [ ] **API Routes**: Create endpoints for fetching and posting data.
- [ ] **File Upload**: Integrate Cloudinary or AWS S3.

### Phase 5: Deployment
- [ ] **Optimization**: Image/Video optimization and code splitting.
- [ ] **Deploy**: Launch on Vercel.

## 🛠️ Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev