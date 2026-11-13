# 🎓 CampusFind – Campus Lost & Found Web Application

A modern, responsive, and student-first web application designed for university and college campuses to bridge the gap between students who lose items and the honest finders who discover them.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![LocalStorage](https://img.shields.io/badge/LocalStorage-059669?style=for-the-badge&logo=databricks&logoColor=white)

---

## 📌 1. Project Overview

**Project Name:** CampusFind – Campus Lost & Found  
**Target Audience:** University students, professors, laboratory staff, cafeteria workers, and campus security.  
**Core Purpose:** Centralize all lost and found postings across college departments, lecture halls, libraries, sports facilities, and hostels into a single, intuitive, high-visibility dashboard.

### Key Highlights
- **Emerald Green & White Aesthetic:** Clean, institutional, modern color palette with smooth micro-interactions.
- **Single Page Application (SPA):** Instant view transitions (`#home`, `#browse`, `#report`, `#dashboard`, `#my-reports`, `#saved`) with zero full-page reloads.
- **Client-Side Image Uploads:** Live FileReader preview with automatic base64 encoding saved directly into LocalStorage.
- **Chained Multi-Filter Search:** Search by keywords while simultaneously filtering by item category, campus location, report type (Lost/Found), and resolution status (Open/Resolved).
- **Interactive Dashboard:** Live campus statistics, category volume bars, top hotspot zones, and recent activity log.
- **User Self-Management ("My Reports"):** Manage personal reports, edit details, toggle resolved status, or delete entries.
- **Bookmark / Favorites System:** Save important items to track recovery progress.
- **Custom Toast & Modal System:** No ugly native `alert()` or `confirm()` popups.

---

## 🛠️ 2. Technology Stack

- **HTML5:** Semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<dialog>` patterns).
- **CSS3:** Custom CSS variables (design tokens), CSS Grid, Flexbox, Glassmorphism navbar (`backdrop-filter`), CSS animations, and full mobile-first responsive breakpoints.
- **Vanilla JavaScript (ES6+):** Modular state architecture, event delegation, array methods (`filter`, `map`, `reduce`, `sort`), FileReader API, and LocalStorage synchronization.
- **Storage:** Browser `localStorage` for offline persistence across page reloads.
- **Icons & Fonts:** FontAwesome 6 (CDN) & Google Fonts (`Plus Jakarta Sans`).

---

## 📂 3. Project Folder Structure

```text
CampusFind/
│
├── index.html                   # Core single-page application structure & semantic layout
├── css/
│   └── style.css                # Green & white modern design system, responsive styles, animations
├── js/
│   └── script.js                # Application logic, router, LocalStorage CRUD, filters & modals
├── images/
│   └── campusfind-logo.svg      # Vector SVG brand logo & favicon
└── README.md                    # Comprehensive technical documentation & presentation guide
```

---

## 🚀 4. How to Run the Project Locally in VS Code

### Method A: Using VS Code "Live Server" Extension (Recommended)
1. Open **Visual Studio Code**.
2. Go to **File → Open Folder...** and select the `CampusFind` folder.
3. If you do not have it installed, open the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`) and search for **Live Server** by *Ritwick Dey*. Click **Install**.
4. In the VS Code file explorer, right-click on `index.html`.
5. Select **"Open with Live Server"** (or click **Go Live** on the bottom status bar).
6. Your default web browser will automatically open:
   ```text
   http://127.0.0.1:5500/index.html
   ```

### Method B: Directly Opening in Any Web Browser (Zero Installation)
1. Navigate to the `CampusFind` directory in your computer's file explorer.
2. Double-click on `index.html` (or right-click → **Open With** → Chrome, Edge, Firefox, or Safari).
3. The app is 100% client-side and runs completely offline with full LocalStorage features!

---

## 🌐 5. How to Deploy to the Web (Free Hosting)

### Method A: Deploying on Netlify (Drag & Drop in 30 Seconds)
1. Go to [netlify.com](https://www.netlify.com/) and sign up or log in.
2. Navigate to your **Team Overview** dashboard and click on the **Sites** tab.
3. Scroll down to the section that says **"Want to deploy a new site without connecting to Git? Drag and drop your site folder here"**.
4. Drag the entire `CampusFind/` folder from your desktop directly into that box.
5. Netlify will deploy the site immediately and provide you with a live public URL (e.g., `https://campusfind-demo.netlify.app`).

### Method B: Deploying on GitHub Pages
1. Create a new GitHub repository (e.g., `campusfind`).
2. Push or upload all project files (`index.html`, `css/`, `js/`, `images/`, `README.md`) to the `main` branch.
3. In your GitHub repository, go to **Settings → Pages** (under the "Code and automation" section).
4. Under **"Build and deployment" → Branch**, select `main` and folder `/ (root)`, then click **Save**.
5. Within 1–2 minutes, your website will be live at:
   ```text
   https://<your-username>.github.io/campusfind/
   ```

---

## 🧠 6. Intermediate JavaScript Concepts (Viva & College Presentation Guide)

When presenting this project to your college professors or external examiners, highlight these architectural patterns implemented in `js/script.js`:

### 1. Hash-Based Single Page Application (SPA) Router
Instead of using 6 separate HTML files that cause blank page flashes on navigation, CampusFind uses the `window.location.hash` and the `hashchange` event listener:
```javascript
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '') || 'home';
  switchView(hash);
});
```
*Why this is good:* It allows back/forward browser navigation, shareable URLs (`#browse`, `#report`, `#dashboard`), and silky smooth transitions without server routing.

### 2. Event Delegation Pattern
Rather than attaching hundreds of individual event listeners to every newly created item card or button, a single delegated listener is attached to `document`:
```javascript
document.addEventListener('click', (e) => {
  const detailsBtn = e.target.closest('[data-action="view-details"]');
  if (detailsBtn) {
    openItemDetailsModal(detailsBtn.dataset.id);
  }
});
```
*Why this is good:* Memory-efficient and automatically handles dynamic cards created after user reports are added or filtered.

### 3. Asynchronous FileReader API for Images
When users select an image, `FileReader` reads it as a base64 Data URL asynchronously:
```javascript
const reader = new FileReader();
reader.onload = function(e) {
  AppState.currentImageBase64 = e.target.result;
  DOM.imagePreviewImg.src = e.target.result;
};
reader.readAsDataURL(file);
```
*Why this is good:* Enables immediate visual feedback without uploading to an external server, and persists the image within `localStorage`.

### 4. Chained Multi-Criteria Filter Algorithm
The search algorithm combines text query, item type, category, campus location, and status in a single pass using JavaScript array methods:
```javascript
let results = items.filter(item => {
  if (filters.type !== 'all' && item.type !== filters.type) return false;
  if (filters.category !== 'all' && item.category !== filters.category) return false;
  if (filters.location !== 'all' && item.location !== filters.location) return false;
  if (filters.status !== 'all' && item.status !== filters.status) return false;
  // Keyword text matching
  return matchesQuery(item, filters.search);
});
```

### 5. LocalStorage State Encapsulation
All persistence logic is encapsulated within a clean `StorageManager` object with clear CRUD operations (`addItem`, `updateItem`, `deleteItem`, `toggleBookmark`), preventing scattered `localStorage.getItem()` calls.

---

## ⚠️ 7. Current Prototype Limitations & Future Backend Roadmap

### Current Limitations (Frontend Prototype)
- **Local Isolation:** Data stored in `localStorage` is scoped to the individual user's browser. Items reported on Device A will not automatically appear on Device B.
- **Client-Side Validation Only:** Security rules and file size restrictions are enforced via JavaScript, which can be bypassed via dev tools.
- **Simulated Identity:** "My Reports" tracks ownership using a client-side UUID saved in the browser rather than an authenticated session token.

### Future Backend Roadmap (Version 2.0)
To convert CampusFind into a production-grade campus platform across the entire university:
1. **Backend Server:** Node.js with Express.js or Python FastAPI.
2. **Database:** MongoDB or PostgreSQL for persistent, synchronized multi-user data storage.
3. **Authentication:** College Single Sign-On (SSO) or OAuth2 / JWT authentication using official student `@college.edu` emails.
4. **Cloud Media Storage:** AWS S3 or Cloudinary for storing high-resolution item photos securely with CDN distribution.
5. **Real-time Messaging:** WebSockets or Firebase for an in-app private chat between the owner and finder without publicly disclosing phone numbers.
6. **Campus Security Admin Panel:** Role-based access control (RBAC) allowing college proctors and security guards to verify recovered property and close official reports.

---

## 📜 8. License & Academic Attribution
Developed as an educational engineering college project. Feel free to use, modify, and expand upon this codebase for your coursework and presentations.
