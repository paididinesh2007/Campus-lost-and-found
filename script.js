/**
 * ====================================================================
 * CampusFind – Campus Lost & Found Web Application
 * Core JavaScript Application File
 * ====================================================================
 * Demonstrates intermediate JavaScript concepts:
 * - State Management & LocalStorage persistence
 * - Client-side Hash Routing (SPA pattern)
 * - Array Manipulation (filter, sort, map, reduce)
 * - FileReader API for client-side image upload & preview
 * - Event Delegation & DOM Manipulation
 * - Custom Modal & Toast Notification Systems
 * - Form Validation & Sanitization
 */

'use strict';

/* ====================================================================
   1. DEFAULT SEED DATA
   Realistic campus items loaded on first visit or reset
   ==================================================================== */
const DEFAULT_CAMPUS_ITEMS = [
  {
    id: "cf_seed_1",
    name: "Blue Casio fx-991EX Scientific Calculator",
    type: "Lost",
    category: "Books & Stationery",
    location: "Central Library",
    spot: "2nd Floor Quiet Zone, Desk #18",
    date: "2026-11-12",
    description: "Dark blue case with a small silver NASA sticker on the back cover. Has my initials 'A.K.' written inside battery slot.",
    contactName: "Ananya Kumar",
    contactEmail: "ananya.k@college.edu",
    contactPhone: "+91 98765 43210",
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80",
    status: "Open",
    createdAt: Date.now() - 86400000 * 1,
    isUserReport: false
  },
  {
    id: "cf_seed_2",
    name: "College Student ID Card (Alex Turner)",
    type: "Found",
    category: "Cards & ID",
    location: "Main Cafeteria",
    spot: "Corner booth table near the juice counter",
    date: "2026-11-13",
    description: "Roll Number 2024CS0892, 3rd Year Computer Science student ID card in a transparent protective lanyard with blue college ribbon.",
    contactName: "Cafeteria Supervisor",
    contactEmail: "cafe.desk@college.edu",
    contactPhone: "+91 98111 22334",
    image: "https://images.unsplash.com/photo-1578873375972-0402845c4fcb?auto=format&fit=crop&w=600&q=80",
    status: "Open",
    createdAt: Date.now() - 3600000 * 4,
    isUserReport: false
  },
  {
    id: "cf_seed_3",
    name: "Dell 65W USB-C Laptop Charger",
    type: "Lost",
    category: "Electronics",
    location: "Science & Computer Labs",
    spot: "Lab 304, Terminal station #12",
    date: "2026-11-11",
    description: "Original Dell cylindrical black adapter with black braided velcro cable tie. Left plugged in under the desk power strip.",
    contactName: "Rohan Verma",
    contactEmail: "rohan.v@college.edu",
    contactPhone: "+91 97654 32109",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
    status: "Open",
    createdAt: Date.now() - 86400000 * 2,
    isUserReport: false
  },
  {
    id: "cf_seed_4",
    name: "Bike Keys with Batman Rubber Keychain",
    type: "Found",
    category: "Keys",
    location: "Parking Lot A/B",
    spot: "Underneath the shade tree near Gate 2 bicycle stand",
    date: "2026-11-13",
    description: "Single Honda motorcycle ignition key attached to a black and yellow Batman rubber keychain and a small bronze locker key.",
    contactName: "Security Gate Officer",
    contactEmail: "security.gate2@college.edu",
    contactPhone: "+91 98222 33445",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80",
    status: "Open",
    createdAt: Date.now() - 3600000 * 6,
    isUserReport: false
  },
  {
    id: "cf_seed_5",
    name: "Hydro Flask 32oz Olive Green Water Bottle",
    type: "Lost",
    category: "Bottles & Tumblers",
    location: "Sports Complex & Gym",
    spot: "Badminton Court #2 side bleachers",
    date: "2026-11-10",
    description: "Olive green powder coated bottle with flex straw lid. Has minor dent near the bottom base and an outdoor mountain sticker.",
    contactName: "Sneha Patel",
    contactEmail: "sneha.p@college.edu",
    contactPhone: "+91 96543 21098",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    status: "Resolved",
    createdAt: Date.now() - 86400000 * 3,
    isUserReport: false
  },
  {
    id: "cf_seed_6",
    name: "Apple AirPods Pro (2nd Gen) in Spigen Case",
    type: "Found",
    category: "Electronics",
    location: "Auditorium & Student Center",
    spot: "Row H, Seat 14 inside Main Auditorium",
    date: "2026-11-12",
    description: "Found inside a rugged dark-matte Spigen case with lanyard attached. To claim, please unlock paired phone Bluetooth device in front of finder.",
    contactName: "Priya Sharma",
    contactEmail: "priya.s@college.edu",
    contactPhone: "+91 95432 10987",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80",
    status: "Open",
    createdAt: Date.now() - 86400000 * 1,
    isUserReport: false
  },
  {
    id: "cf_seed_7",
    name: "Higher Engineering Mathematics by B.S. Grewal",
    type: "Lost",
    category: "Books & Stationery",
    location: "Central Library",
    spot: "Ground Floor Book Return counter",
    date: "2026-11-09",
    description: "Hardcover 44th Edition textbook. Has yellow sticky notes in Chapters 7 & 8, and student library barcode stamped on first page.",
    contactName: "Vikas Joshi",
    contactEmail: "vikas.j@college.edu",
    contactPhone: "+91 94321 09876",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    status: "Resolved",
    createdAt: Date.now() - 86400000 * 4,
    isUserReport: false
  },
  {
    id: "cf_seed_8",
    name: "Navy Blue Wildcraft Laptop Backpack",
    type: "Found",
    category: "Bags & Wallets",
    location: "Engineering Block A",
    spot: "Ground floor lobby bench opposite Dean's office",
    date: "2026-11-13",
    description: "Navy blue and grey accents Wildcraft backpack containing notebooks, pencil pouch, and a college umbrella. Handed over to Dept Office.",
    contactName: "Dept Administrator",
    contactEmail: "eng.dept@college.edu",
    contactPhone: "+91 93210 98765",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    status: "Open",
    createdAt: Date.now() - 3600000 * 8,
    isUserReport: false
  }
];

/* Category configuration with icons */
const CATEGORY_ICONS = {
  "Electronics": "fa-solid fa-laptop",
  "Cards & ID": "fa-solid fa-id-card",
  "Bags & Wallets": "fa-solid fa-bag-shopping",
  "Books & Stationery": "fa-solid fa-book",
  "Keys": "fa-solid fa-key",
  "Clothing & Accessories": "fa-solid fa-shirt",
  "Watches & Jewelry": "fa-solid fa-stopwatch",
  "Bottles & Tumblers": "fa-solid fa-bottle-water",
  "Others": "fa-solid fa-box"
};

/* Campus Locations list for dropdown filters */
const CAMPUS_LOCATIONS = [
  "Central Library",
  "Main Cafeteria",
  "Engineering Block A",
  "Engineering Block B",
  "Science & Computer Labs",
  "Sports Complex & Gym",
  "Boys Hostel Campus",
  "Girls Hostel Campus",
  "Auditorium & Student Center",
  "Parking Lot A/B",
  "Administrative Building",
  "Campus Ground / Lawn",
  "Other Campus Area"
];

/* ====================================================================
   2. STORAGE MANAGER
   Encapsulates all LocalStorage CRUD operations
   ==================================================================== */
const StorageManager = {
  KEYS: {
    ITEMS: 'campusfind_items_v1',
    SAVED: 'campusfind_saved_v1',
    USER_REPORTS: 'campusfind_user_reports_v1'
  },

  // Initialize storage with seed data if running for the first time
  init() {
    if (!localStorage.getItem(this.KEYS.ITEMS)) {
      this.setItems(DEFAULT_CAMPUS_ITEMS);
    }
    if (!localStorage.getItem(this.KEYS.SAVED)) {
      this.setSaved([]);
    }
    if (!localStorage.getItem(this.KEYS.USER_REPORTS)) {
      this.setUserReports([]);
    }
  },

  getItems() {
    try {
      const data = localStorage.getItem(this.KEYS.ITEMS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error reading items from localStorage:", e);
      return [];
    }
  },

  setItems(items) {
    try {
      localStorage.setItem(this.KEYS.ITEMS, JSON.stringify(items));
    } catch (e) {
      console.error("Error writing items to localStorage:", e);
    }
  },

  addItem(newItem) {
    const items = this.getItems();
    items.unshift(newItem); // Place newest at beginning
    this.setItems(items);

    // Track as user's report
    const userReports = this.getUserReports();
    if (!userReports.includes(newItem.id)) {
      userReports.push(newItem.id);
      this.setUserReports(userReports);
    }
    return newItem;
  },

  updateItem(updatedItem) {
    const items = this.getItems();
    const index = items.findIndex(i => i.id === updatedItem.id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updatedItem };
      this.setItems(items);
      return items[index];
    }
    return null;
  },

  deleteItem(itemId) {
    const items = this.getItems().filter(i => i.id !== itemId);
    this.setItems(items);

    // Also remove from user reports and saved bookmarks
    const userReports = this.getUserReports().filter(id => id !== itemId);
    this.setUserReports(userReports);

    const saved = this.getSaved().filter(id => id !== itemId);
    this.setSaved(saved);
  },

  getSaved() {
    try {
      const data = localStorage.getItem(this.KEYS.SAVED);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  setSaved(savedArray) {
    localStorage.setItem(this.KEYS.SAVED, JSON.stringify(savedArray));
  },

  toggleBookmark(itemId) {
    const saved = this.getSaved();
    const index = saved.indexOf(itemId);
    let isSaved = false;

    if (index > -1) {
      saved.splice(index, 1);
      isSaved = false;
    } else {
      saved.push(itemId);
      isSaved = true;
    }
    this.setSaved(saved);
    return isSaved;
  },

  isBookmarked(itemId) {
    return this.getSaved().includes(itemId);
  },

  getUserReports() {
    try {
      const data = localStorage.getItem(this.KEYS.USER_REPORTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  setUserReports(reportIds) {
    localStorage.setItem(this.KEYS.USER_REPORTS, JSON.stringify(reportIds));
  },

  isUserReport(itemId) {
    return this.getUserReports().includes(itemId);
  },

  resetDemoData() {
    this.setItems(DEFAULT_CAMPUS_ITEMS);
    this.setSaved([]);
    this.setUserReports([]);
  }
};

/* ====================================================================
   3. APP STATE
   Central state container for active view, search, and filters
   ==================================================================== */
const AppState = {
  currentView: 'home',
  browseFilters: {
    search: '',
    type: 'all',        // 'all' | 'Lost' | 'Found'
    category: 'all',
    location: 'all',
    status: 'all',      // 'all' | 'Open' | 'Resolved'
    sort: 'newest'      // 'newest' | 'oldest' | 'name-asc' | 'name-desc'
  },
  myReportsFilter: 'all', // 'all' | 'open' | 'resolved'
  currentImageBase64: null,
  confirmCallback: null
};

/* ====================================================================
   4. DOM ELEMENT CACHE
   ==================================================================== */
const DOM = {
  // Navigation
  navLinks: document.getElementById('navLinks'),
  mobileMenuBtn: document.getElementById('mobileMenuBtn'),
  savedCountBadge: document.getElementById('savedCountBadge'),
  reportNavDropdownBtn: document.getElementById('reportNavDropdownBtn'),
  reportDropdownWrapper: document.querySelector('.report-dropdown-wrapper'),
  reportDropdownMenu: document.getElementById('reportDropdownMenu'),
  closeAnnouncement: document.getElementById('closeAnnouncement'),

  // Views
  views: document.querySelectorAll('.view-section'),

  // Home view elements
  statTotalReports: document.getElementById('statTotalReports'),
  statLostCount: document.getElementById('statLostCount'),
  statFoundCount: document.getElementById('statFoundCount'),
  statResolvedCount: document.getElementById('statResolvedCount'),
  heroResolvedPercent: document.getElementById('heroResolvedPercent'),
  homeCategoryGrid: document.getElementById('homeCategoryGrid'),
  homeRecentGrid: document.getElementById('homeRecentGrid'),
  heroQuickSearch: document.getElementById('heroQuickSearch'),
  heroQuickSearchBtn: document.getElementById('heroQuickSearchBtn'),

  // Browse view elements
  browseSearchInput: document.getElementById('browseSearchInput'),
  clearSearchBtn: document.getElementById('clearSearchBtn'),
  browseTypeGroup: document.getElementById('browseTypeGroup'),
  filterCategory: document.getElementById('filterCategory'),
  filterLocation: document.getElementById('filterLocation'),
  filterStatus: document.getElementById('filterStatus'),
  filterSort: document.getElementById('filterSort'),
  btnResetFilters: document.getElementById('btnResetFilters'),
  activeFiltersBar: document.getElementById('activeFiltersBar'),
  activeTagsList: document.getElementById('activeTagsList'),
  btnClearAllTags: document.getElementById('btnClearAllTags'),
  resultsCount: document.getElementById('resultsCount'),
  browseItemsGrid: document.getElementById('browseItemsGrid'),
  browseEmptyState: document.getElementById('browseEmptyState'),
  btnEmptyReset: document.getElementById('btnEmptyReset'),

  // Report view elements
  tabReportLost: document.getElementById('tabReportLost'),
  tabReportFound: document.getElementById('tabReportFound'),
  reportTypeInput: document.getElementById('reportTypeInput'),
  formIntroBanner: document.getElementById('formIntroBanner'),
  bannerTitle: document.getElementById('bannerTitle'),
  bannerSubtitle: document.getElementById('bannerSubtitle'),
  labelReportDate: document.getElementById('labelReportDate'),
  submitBtnText: document.getElementById('submitBtnText'),
  reportItemForm: document.getElementById('reportItemForm'),
  btnResetForm: document.getElementById('btnResetForm'),
  imageDropzone: document.getElementById('imageDropzone'),
  reportImageInput: document.getElementById('reportImageInput'),
  dropzonePrompt: document.getElementById('dropzonePrompt'),
  imagePreviewContainer: document.getElementById('imagePreviewContainer'),
  imagePreviewImg: document.getElementById('imagePreviewImg'),
  btnRemoveImage: document.getElementById('btnRemoveImage'),

  // Dashboard elements
  dashTotalCount: document.getElementById('dashTotalCount'),
  dashLostCount: document.getElementById('dashLostCount'),
  dashFoundCount: document.getElementById('dashFoundCount'),
  dashResolvedCount: document.getElementById('dashResolvedCount'),
  dashCategoryBars: document.getElementById('dashCategoryBars'),
  dashHotspotsList: document.getElementById('dashHotspotsList'),
  dashRecentTableBody: document.getElementById('dashRecentTableBody'),
  btnRefreshStats: document.getElementById('btnRefreshStats'),

  // My Reports elements
  myReportsGrid: document.getElementById('myReportsGrid'),
  myReportsEmptyState: document.getElementById('myReportsEmptyState'),
  myCountAll: document.getElementById('myCountAll'),
  myCountOpen: document.getElementById('myCountOpen'),
  myCountResolved: document.getElementById('myCountResolved'),

  // Saved view elements
  savedItemsGrid: document.getElementById('savedItemsGrid'),
  savedEmptyState: document.getElementById('savedEmptyState'),
  btnClearSavedBtn: document.getElementById('btnClearSavedBtn'),

  // Modals
  itemDetailsModal: document.getElementById('itemDetailsModal'),
  modalDetailsBody: document.getElementById('modalDetailsBody'),
  btnCloseDetailsModal: document.getElementById('btnCloseDetailsModal'),

  editReportModal: document.getElementById('editReportModal'),
  editReportForm: document.getElementById('editReportForm'),
  btnCloseEditModal: document.getElementById('btnCloseEditModal'),
  btnCancelEdit: document.getElementById('btnCancelEdit'),

  confirmDialogModal: document.getElementById('confirmDialogModal'),
  confirmTitle: document.getElementById('confirmTitle'),
  confirmMessage: document.getElementById('confirmMessage'),
  btnConfirmProceed: document.getElementById('btnConfirmProceed'),
  btnConfirmCancel: document.getElementById('btnConfirmCancel'),

  // Notification Toast Container
  toastContainer: document.getElementById('toastContainer'),

  // Footer
  currentYear: document.getElementById('currentYear'),
  btnResetDemoData: document.getElementById('btnResetDemoData')
};

/* ====================================================================
   5. NOTIFICATION TOAST SYSTEM
   ==================================================================== */
const Toast = {
  show(title, message = '', type = 'success', duration = 3500) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fa-solid fa-circle-check';
    if (type === 'error') iconClass = 'fa-solid fa-circle-xmark';
    if (type === 'info') iconClass = 'fa-solid fa-circle-info';

    toast.innerHTML = `
      <div class="toast-icon"><i class="${iconClass}"></i></div>
      <div class="toast-content">
        <strong class="toast-title">${escapeHTML(title)}</strong>
        ${message ? `<p class="toast-message">${escapeHTML(message)}</p>` : ''}
      </div>
      <button class="toast-close" aria-label="Close notification">&times;</button>
    `;

    DOM.toastContainer.appendChild(toast);

    // Auto-remove after duration
    const timeout = setTimeout(() => {
      this.dismiss(toast);
    }, duration);

    // Manual close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
      clearTimeout(timeout);
      this.dismiss(toast);
    });
  },

  dismiss(toast) {
    toast.classList.add('toast-hiding');
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 250);
  }
};

/* ====================================================================
   6. CONFIRMATION DIALOG HELPER
   Replaces ugly native confirm() with an attractive custom modal
   ==================================================================== */
function showConfirmDialog(title, message, onConfirm) {
  DOM.confirmTitle.textContent = title;
  DOM.confirmMessage.textContent = message;
  AppState.confirmCallback = onConfirm;
  DOM.confirmDialogModal.classList.add('open');
}

function closeConfirmDialog() {
  DOM.confirmDialogModal.classList.remove('open');
  AppState.confirmCallback = null;
}

/* ====================================================================
   7. ROUTER & VIEW SWITCHING (SPA PATTERN)
   ==================================================================== */
function switchView(viewName, hashParam = '') {
  const validViews = ['home', 'browse', 'report', 'dashboard', 'my-reports', 'saved'];
  const targetView = validViews.includes(viewName) ? viewName : 'home';

  // Update active state in views
  DOM.views.forEach(section => {
    if (section.id === `view-${targetView}`) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });

  // Update navigation link highlights
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.dataset.nav === targetView) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  AppState.currentView = targetView;

  // Close mobile navigation drawer if open
  DOM.navLinks.classList.remove('open');
  DOM.reportDropdownWrapper.classList.remove('open');

  // Trigger view-specific re-renders
  if (targetView === 'home') {
    renderHomeView();
  } else if (targetView === 'browse') {
    renderBrowseView();
  } else if (targetView === 'dashboard') {
    renderDashboardView();
  } else if (targetView === 'my-reports') {
    renderMyReportsView();
  } else if (targetView === 'saved') {
    renderSavedView();
  }

  // Scroll to top cleanly
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ====================================================================
   8. CARD BUILDER & RENDERERS
   ==================================================================== */

/**
 * Generates an item card HTML snippet with modern UI badges and controls
 */
function buildItemCardHTML(item, isUserCard = false) {
  const isLost = item.type === 'Lost';
  const isResolved = item.status === 'Resolved';
  const isSaved = StorageManager.isBookmarked(item.id);
  const categoryIcon = CATEGORY_ICONS[item.category] || 'fa-solid fa-box';

  return `
    <article class="item-card" data-id="${item.id}">
      <div class="card-media-wrapper">
        ${item.image 
          ? `<img src="${item.image}" alt="${escapeHTML(item.name)}" loading="lazy" />`
          : `<div class="card-placeholder-icon"><i class="${categoryIcon}"></i></div>`
        }
        <div class="card-badges-top">
          <span class="card-type-badge ${isLost ? 'badge-lost' : 'badge-found'}">
            ${isLost ? '<i class="fa-solid fa-circle-exclamation"></i> LOST' : '<i class="fa-solid fa-hand-holding-heart"></i> FOUND'}
          </span>
          <button class="card-bookmark-btn ${isSaved ? 'saved' : ''}" data-action="bookmark" data-id="${item.id}" title="${isSaved ? 'Remove Bookmark' : 'Save Item'}">
            <i class="${isSaved ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}"></i>
          </button>
        </div>
        <span class="card-status-badge ${isResolved ? 'status-resolved' : 'status-open'}">
          ${isResolved ? '<i class="fa-solid fa-circle-check"></i> Resolved' : '<i class="fa-solid fa-clock"></i> Active'}
        </span>
      </div>

      <div class="card-body">
        <span class="card-category-pill"><i class="${categoryIcon}"></i> ${escapeHTML(item.category)}</span>
        <h3 class="card-title" title="${escapeHTML(item.name)}">${escapeHTML(item.name)}</h3>
        <p class="card-desc">${escapeHTML(item.description)}</p>

        <div class="card-meta-list">
          <div class="card-meta-item">
            <i class="fa-solid fa-location-dot"></i>
            <span title="${escapeHTML(item.location)}">${escapeHTML(item.location)}</span>
          </div>
          <div class="card-meta-item">
            <i class="fa-solid fa-calendar-days"></i>
            <span>${formatDate(item.date)}</span>
          </div>
        </div>

        <div class="card-footer">
          <button class="btn btn-outline" data-action="view-details" data-id="${item.id}">
            <i class="fa-solid fa-eye"></i> View Details
          </button>
        </div>

        ${isUserCard ? `
          <div class="user-card-actions">
            <button class="btn btn-outline btn-sm" data-action="edit-report" data-id="${item.id}" title="Edit details">
              <i class="fa-solid fa-pen-to-square"></i> Edit
            </button>
            <button class="btn btn-outline btn-sm" data-action="toggle-status" data-id="${item.id}" title="Toggle between Open & Resolved">
              <i class="fa-solid fa-check"></i> ${isResolved ? 'Re-open' : 'Mark Resolved'}
            </button>
            <button class="btn btn-danger btn-sm" data-action="delete-report" data-id="${item.id}" title="Delete report permanently">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        ` : ''}
      </div>
    </article>
  `;
}

/**
 * 8.1 RENDER: Home View
 */
function renderHomeView() {
  const items = StorageManager.getItems();

  // Calculate live stats
  const total = items.length;
  const lost = items.filter(i => i.type === 'Lost').length;
  const found = items.filter(i => i.type === 'Found').length;
  const resolved = items.filter(i => i.status === 'Resolved').length;

  DOM.statTotalReports.textContent = total;
  DOM.statLostCount.textContent = lost;
  DOM.statFoundCount.textContent = found;
  DOM.statResolvedCount.textContent = resolved;

  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;
  if (DOM.heroResolvedPercent) DOM.heroResolvedPercent.textContent = `${resolutionRate}%`;

  // Render Category Quick Chips
  const categories = Object.keys(CATEGORY_ICONS);
  DOM.homeCategoryGrid.innerHTML = categories.map(cat => {
    const count = items.filter(i => i.category === cat).length;
    return `
      <div class="category-card" data-category="${cat}">
        <div class="category-icon"><i class="${CATEGORY_ICONS[cat]}"></i></div>
        <div class="category-info">
          <h4>${cat}</h4>
          <span>${count} item${count === 1 ? '' : 's'} reported</span>
        </div>
      </div>
    `;
  }).join('');

  // Render Recent 4 Items
  const recent = [...items].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)).slice(0, 4);
  DOM.homeRecentGrid.innerHTML = recent.map(item => buildItemCardHTML(item)).join('');
}

/**
 * 8.2 RENDER: Browse View with Search, Multi-Filter & Sort
 */
function renderBrowseView() {
  const items = StorageManager.getItems();
  const filters = AppState.browseFilters;

  // 1. Chained Filtering
  let results = items.filter(item => {
    // Type Filter
    if (filters.type !== 'all' && item.type !== filters.type) return false;

    // Category Filter
    if (filters.category !== 'all' && item.category !== filters.category) return false;

    // Location Filter
    if (filters.location !== 'all' && item.location !== filters.location) return false;

    // Status Filter
    if (filters.status !== 'all' && item.status !== filters.status) return false;

    // Search Query (matches name, description, location, or spot)
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchLoc = item.location.toLowerCase().includes(q);
      const matchSpot = item.spot ? item.spot.toLowerCase().includes(q) : false;
      const matchCategory = item.category.toLowerCase().includes(q);

      if (!matchName && !matchDesc && !matchLoc && !matchSpot && !matchCategory) {
        return false;
      }
    }

    return true;
  });

  // 2. Sorting
  if (filters.sort === 'newest') {
    results.sort((a, b) => new Date(b.date) - new Date(a.date) || (b.createdAt || 0) - (a.createdAt || 0));
  } else if (filters.sort === 'oldest') {
    results.sort((a, b) => new Date(a.date) - new Date(b.date) || (a.createdAt || 0) - (b.createdAt || 0));
  } else if (filters.sort === 'name-asc') {
    results.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filters.sort === 'name-desc') {
    results.sort((a, b) => b.name.localeCompare(a.name));
  }

  // 3. Update Results Count UI
  DOM.resultsCount.innerHTML = `Showing <strong>${results.length}</strong> of ${items.length} campus reports`;

  // 4. Render Active Filter Tags
  renderActiveFilterTags();

  // 5. Render Grid or Empty State
  if (results.length === 0) {
    DOM.browseItemsGrid.innerHTML = '';
    DOM.browseEmptyState.style.display = 'block';
  } else {
    DOM.browseEmptyState.style.display = 'none';
    DOM.browseItemsGrid.innerHTML = results.map(item => buildItemCardHTML(item)).join('');
  }
}

/**
 * Renders small dismissible tags for currently active search filters
 */
function renderActiveFilterTags() {
  const filters = AppState.browseFilters;
  const tags = [];

  if (filters.search) {
    tags.push({ key: 'search', label: `Search: "${filters.search}"` });
  }
  if (filters.type !== 'all') {
    tags.push({ key: 'type', label: `Type: ${filters.type}` });
  }
  if (filters.category !== 'all') {
    tags.push({ key: 'category', label: `Category: ${filters.category}` });
  }
  if (filters.location !== 'all') {
    tags.push({ key: 'location', label: `Location: ${filters.location}` });
  }
  if (filters.status !== 'all') {
    tags.push({ key: 'status', label: `Status: ${filters.status}` });
  }

  if (tags.length > 0) {
    DOM.activeFiltersBar.style.display = 'flex';
    DOM.activeTagsList.innerHTML = tags.map(t => `
      <span class="active-tag">
        ${escapeHTML(t.label)}
        <button data-clear-filter="${t.key}" title="Remove filter">&times;</button>
      </span>
    `).join('');
  } else {
    DOM.activeFiltersBar.style.display = 'none';
    DOM.activeTagsList.innerHTML = '';
  }
}

/**
 * 8.3 RENDER: Dashboard Analytics View
 */
function renderDashboardView() {
  const items = StorageManager.getItems();

  const total = items.length;
  const lost = items.filter(i => i.type === 'Lost').length;
  const found = items.filter(i => i.type === 'Found').length;
  const resolved = items.filter(i => i.status === 'Resolved').length;

  DOM.dashTotalCount.textContent = total;
  DOM.dashLostCount.textContent = lost;
  DOM.dashFoundCount.textContent = found;
  DOM.dashResolvedCount.textContent = resolved;

  // Category Distribution Bars
  const categoryCounts = {};
  Object.keys(CATEGORY_ICONS).forEach(cat => categoryCounts[cat] = 0);
  items.forEach(i => {
    if (categoryCounts[i.category] !== undefined) categoryCounts[i.category]++;
    else categoryCounts[i.category] = 1;
  });

  const sortedCategories = Object.entries(categoryCounts)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  DOM.dashCategoryBars.innerHTML = sortedCategories.map(([cat, count]) => {
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
    return `
      <div class="category-bar-item">
        <div class="bar-meta">
          <span><i class="${CATEGORY_ICONS[cat] || 'fa-solid fa-box'}"></i> ${cat}</span>
          <strong>${count} (${percent}%)</strong>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${percent}%;"></div>
        </div>
      </div>
    `;
  }).join('') || '<p class="text-muted">No category data recorded yet.</p>';

  // Campus Hotspots Breakdown
  const locationCounts = {};
  items.forEach(i => {
    locationCounts[i.location] = (locationCounts[i.location] || 0) + 1;
  });

  const topLocations = Object.entries(locationCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  DOM.dashHotspotsList.innerHTML = topLocations.map(([loc, count], idx) => `
    <div class="hotspot-item">
      <div class="hotspot-info">
        <div class="hotspot-rank">${idx + 1}</div>
        <strong>${loc}</strong>
      </div>
      <span class="hotspot-count-pill">${count} report${count === 1 ? '' : 's'}</span>
    </div>
  `).join('') || '<p class="text-muted">No hotspot location data.</p>';

  // Recent Table (Last 6 entries)
  const recent = [...items].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)).slice(0, 6);
  DOM.dashRecentTableBody.innerHTML = recent.map(item => `
    <tr>
      <td>
        <span class="status-badge-inline ${item.type === 'Lost' ? 'badge-lost' : 'badge-found'}">
          ${item.type}
        </span>
      </td>
      <td><strong>${escapeHTML(item.name)}</strong></td>
      <td>${escapeHTML(item.category)}</td>
      <td>${escapeHTML(item.location)}</td>
      <td>${formatDate(item.date)}</td>
      <td>
        <span class="card-status-badge ${item.status === 'Resolved' ? 'status-resolved' : 'status-open'}">
          ${item.status}
        </span>
      </td>
      <td>
        <button class="btn btn-outline btn-sm" data-action="view-details" data-id="${item.id}">
          View
        </button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="7" class="text-center text-muted">No campus activity recorded.</td></tr>';
}

/**
 * 8.4 RENDER: My Reports View
 */
function renderMyReportsView() {
  const items = StorageManager.getItems();
  const userReportIds = StorageManager.getUserReports();

  // Filter items submitted by this browser user
  const userItems = items.filter(i => userReportIds.includes(i.id) || i.isUserReport);

  const openItems = userItems.filter(i => i.status === 'Open');
  const resolvedItems = userItems.filter(i => i.status === 'Resolved');

  DOM.myCountAll.textContent = userItems.length;
  DOM.myCountOpen.textContent = openItems.length;
  DOM.myCountResolved.textContent = resolvedItems.length;

  let displayItems = userItems;
  if (AppState.myReportsFilter === 'open') displayItems = openItems;
  if (AppState.myReportsFilter === 'resolved') displayItems = resolvedItems;

  if (displayItems.length === 0) {
    DOM.myReportsGrid.innerHTML = '';
    DOM.myReportsEmptyState.style.display = 'block';
  } else {
    DOM.myReportsEmptyState.style.display = 'none';
    DOM.myReportsGrid.innerHTML = displayItems.map(item => buildItemCardHTML(item, true)).join('');
  }
}

/**
 * 8.5 RENDER: Saved / Bookmarks View
 */
function renderSavedView() {
  const items = StorageManager.getItems();
  const savedIds = StorageManager.getSaved();
  const savedItems = items.filter(i => savedIds.includes(i.id));

  // Update badge in navigation bar
  DOM.savedCountBadge.textContent = savedIds.length;

  if (savedItems.length === 0) {
    DOM.savedItemsGrid.innerHTML = '';
    DOM.savedEmptyState.style.display = 'block';
  } else {
    DOM.savedEmptyState.style.display = 'none';
    DOM.savedItemsGrid.innerHTML = savedItems.map(item => buildItemCardHTML(item)).join('');
  }
}

/* ====================================================================
   9. MODAL CONTROLLERS (DETAILS & EDIT)
   ==================================================================== */

/**
 * Opens Item Details popup
 */
function openItemDetailsModal(itemId) {
  const items = StorageManager.getItems();
  const item = items.find(i => i.id === itemId);
  if (!item) {
    Toast.show('Item not found', 'This report might have been removed.', 'error');
    return;
  }

  const isLost = item.type === 'Lost';
  const isResolved = item.status === 'Resolved';
  const isSaved = StorageManager.isBookmarked(item.id);
  const isOwner = StorageManager.isUserReport(item.id) || item.isUserReport;
  const categoryIcon = CATEGORY_ICONS[item.category] || 'fa-solid fa-box';

  DOM.modalDetailsBody.innerHTML = `
    <div class="item-details-layout">
      <!-- Media Column -->
      <div class="details-media-box">
        ${item.image 
          ? `<img src="${item.image}" alt="${escapeHTML(item.name)}" />`
          : `<div class="details-placeholder"><i class="${categoryIcon}"></i></div>`
        }
      </div>

      <!-- Information Column -->
      <div class="details-info-box">
        <div class="details-top-badges">
          <span class="card-type-badge ${isLost ? 'badge-lost' : 'badge-found'}">
            ${isLost ? '<i class="fa-solid fa-circle-exclamation"></i> LOST ITEM' : '<i class="fa-solid fa-hand-holding-heart"></i> FOUND ITEM'}
          </span>
          <span class="card-status-badge ${isResolved ? 'status-resolved' : 'status-open'}">
            ${isResolved ? '<i class="fa-solid fa-circle-check"></i> Resolved / Returned' : '<i class="fa-solid fa-clock"></i> Active Report'}
          </span>
          <span class="card-category-pill"><i class="${categoryIcon}"></i> ${escapeHTML(item.category)}</span>
        </div>

        <h2 class="details-title">${escapeHTML(item.name)}</h2>

        <div class="details-meta-table">
          <div class="meta-field">
            <span class="meta-field-label">Campus Location</span>
            <span class="meta-field-val"><i class="fa-solid fa-location-dot accent-text"></i> ${escapeHTML(item.location)}</span>
          </div>

          <div class="meta-field">
            <span class="meta-field-label">${isLost ? 'Date Lost' : 'Date Found'}</span>
            <span class="meta-field-val"><i class="fa-solid fa-calendar accent-text"></i> ${formatDate(item.date)}</span>
          </div>

          ${item.spot ? `
            <div class="meta-field" style="grid-column: span 2;">
              <span class="meta-field-label">Specific Spot / Room</span>
              <span class="meta-field-val">${escapeHTML(item.spot)}</span>
            </div>
          ` : ''}
        </div>

        <div class="details-desc-box">
          <h4>Detailed Description</h4>
          <p>${escapeHTML(item.description)}</p>
        </div>

        <!-- Contact Box -->
        <div class="details-contact-card">
          <div class="contact-card-header">
            <i class="fa-solid fa-address-card"></i>
            <span>Reporter Contact: <strong>${escapeHTML(item.contactName || 'Campus Student')}</strong></span>
          </div>

          <div class="contact-channels">
            ${item.contactEmail ? `
              <div class="contact-link-pill">
                <span><i class="fa-solid fa-envelope"></i> ${escapeHTML(item.contactEmail)}</span>
                <a href="mailto:${item.contactEmail}?subject=Regarding%20CampusFind%20Report:%20${encodeURIComponent(item.name)}" class="btn btn-outline btn-sm">
                  Email
                </a>
              </div>
            ` : ''}

            ${item.contactPhone ? `
              <div class="contact-link-pill">
                <span><i class="fa-solid fa-phone"></i> ${escapeHTML(item.contactPhone)}</span>
                <a href="tel:${item.contactPhone}" class="btn btn-outline btn-sm">
                  Call / Message
                </a>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Modal Bottom Actions -->
        <div class="details-bottom-actions">
          <button class="btn btn-outline btn-sm" data-action="modal-copy-contact" data-email="${item.contactEmail || ''}" data-phone="${item.contactPhone || ''}">
            <i class="fa-solid fa-copy"></i> Copy Contact
          </button>
          
          <button class="btn btn-outline btn-sm" data-action="bookmark" data-id="${item.id}">
            <i class="${isSaved ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}"></i> ${isSaved ? 'Saved' : 'Bookmark'}
          </button>

          ${isOwner ? `
            <button class="btn btn-primary btn-sm" data-action="toggle-status" data-id="${item.id}">
              <i class="fa-solid fa-check"></i> ${isResolved ? 'Mark as Open' : 'Mark as Resolved'}
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  DOM.itemDetailsModal.classList.add('open');
}

function closeItemDetailsModal() {
  DOM.itemDetailsModal.classList.remove('open');
}

/**
 * Opens Edit Report popup pre-filled with current item values
 */
function openEditReportModal(itemId) {
  const items = StorageManager.getItems();
  const item = items.find(i => i.id === itemId);
  if (!item) return;

  document.getElementById('editReportId').value = item.id;
  document.getElementById('editItemName').value = item.name;
  document.getElementById('editCategory').value = item.category;
  document.getElementById('editLocation').value = item.location;
  document.getElementById('editSpecificSpot').value = item.spot || '';
  document.getElementById('editDescription').value = item.description;
  document.getElementById('editContactEmail').value = item.contactEmail || '';
  document.getElementById('editContactPhone').value = item.contactPhone || '';
  document.getElementById('editStatus').value = item.status;

  DOM.editReportModal.classList.add('open');
}

function closeEditReportModal() {
  DOM.editReportModal.classList.remove('open');
}

/* ====================================================================
   10. FORM HANDLERS & IMAGE UPLOAD
   ==================================================================== */

/**
 * Toggles the Report Form between "Lost" and "Found" mode
 */
function setReportType(type) {
  AppState.reportType = type;
  DOM.reportTypeInput.value = type;

  if (type === 'Lost') {
    DOM.tabReportLost.classList.add('active');
    DOM.tabReportFound.classList.remove('active');
    DOM.formIntroBanner.classList.remove('banner-found');
    DOM.bannerTitle.textContent = 'Reporting a Lost Belonging';
    DOM.bannerSubtitle.textContent = 'Help your campus peers identify your missing property by providing thorough details.';
    DOM.labelReportDate.textContent = 'Date Lost';
    DOM.submitBtnText.textContent = 'Submit Lost Report';
  } else {
    DOM.tabReportFound.classList.add('active');
    DOM.tabReportLost.classList.remove('active');
    DOM.formIntroBanner.classList.add('banner-found');
    DOM.bannerTitle.textContent = 'Reporting a Found Item';
    DOM.bannerSubtitle.textContent = 'Thank you for being an honest student! Help reunite this item with its rightful owner.';
    DOM.labelReportDate.textContent = 'Date Found';
    DOM.submitBtnText.textContent = 'Submit Found Report';
  }
}

/**
 * Handles image selection and creates a client-side base64 preview
 */
function handleImageFile(file) {
  if (!file) return;

  // Validation: Check file type
  if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
    Toast.show('Invalid file type', 'Please upload a PNG, JPG, or WEBP image.', 'error');
    return;
  }

  // Validation: Max file size (2MB)
  if (file.size > 2 * 1024 * 1024) {
    Toast.show('File too large', 'Please select an image smaller than 2 MB.', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    AppState.currentImageBase64 = e.target.result;
    DOM.imagePreviewImg.src = e.target.result;
    DOM.imagePreviewContainer.style.display = 'block';
    DOM.dropzonePrompt.style.display = 'none';
  };
  reader.readAsDataURL(file);
}

function removeImagePreview() {
  AppState.currentImageBase64 = null;
  DOM.reportImageInput.value = '';
  DOM.imagePreviewImg.src = '';
  DOM.imagePreviewContainer.style.display = 'none';
  DOM.dropzonePrompt.style.display = 'block';
}

/**
 * Validates report form fields with inline error messages
 */
function validateReportForm() {
  let isValid = true;

  const fields = [
    { id: 'reportItemName', errorId: 'errorItemName', message: 'Item name is required (at least 3 characters).' },
    { id: 'reportCategory', errorId: 'errorCategory', message: 'Please select a category.' },
    { id: 'reportDate', errorId: 'errorDate', message: 'Please select a valid date.' },
    { id: 'reportLocation', errorId: 'errorLocation', message: 'Please select a campus location.' },
    { id: 'reportDescription', errorId: 'errorDescription', message: 'Description must be at least 10 characters long.' },
    { id: 'reportContactName', errorId: 'errorContactName', message: 'Your name is required.' },
    { id: 'reportContactEmail', errorId: 'errorContactEmail', message: 'A valid email address is required.' }
  ];

  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const err = document.getElementById(f.errorId);
    let fieldValid = true;

    if (!el.value.trim()) {
      fieldValid = false;
    } else if (f.id === 'reportItemName' && el.value.trim().length < 3) {
      fieldValid = false;
    } else if (f.id === 'reportDescription' && el.value.trim().length < 10) {
      fieldValid = false;
    } else if (f.id === 'reportContactEmail') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(el.value.trim())) fieldValid = false;
    }

    if (!fieldValid) {
      el.classList.add('input-error');
      err.textContent = f.message;
      isValid = false;
    } else {
      el.classList.remove('input-error');
      err.textContent = '';
    }
  });

  // Terms Checkbox validation
  const consent = document.getElementById('reportConsent');
  const errorConsent = document.getElementById('errorConsent');
  if (!consent.checked) {
    errorConsent.textContent = 'You must confirm the truthfulness of this report.';
    isValid = false;
  } else {
    errorConsent.textContent = '';
  }

  return isValid;
}

/**
 * Handles Form Submission for New Report
 */
function handleReportSubmit(e) {
  e.preventDefault();

  if (!validateReportForm()) {
    Toast.show('Form Incomplete', 'Please review the highlighted errors above.', 'error');
    return;
  }

  const type = DOM.reportTypeInput.value;
  const newItem = {
    id: `cf_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name: document.getElementById('reportItemName').value.trim(),
    type: type,
    category: document.getElementById('reportCategory').value,
    location: document.getElementById('reportLocation').value,
    spot: document.getElementById('reportSpecificSpot').value.trim(),
    date: document.getElementById('reportDate').value,
    description: document.getElementById('reportDescription').value.trim(),
    contactName: document.getElementById('reportContactName').value.trim(),
    contactEmail: document.getElementById('reportContactEmail').value.trim(),
    contactPhone: document.getElementById('reportContactPhone').value.trim(),
    image: AppState.currentImageBase64 || null,
    status: 'Open',
    createdAt: Date.now(),
    isUserReport: true
  };

  StorageManager.addItem(newItem);

  Toast.show(
    `${type} Report Published!`,
    `"${newItem.name}" is now visible to all students on campus.`,
    'success'
  );

  // Reset form
  DOM.reportItemForm.reset();
  removeImagePreview();

  // Navigate to Browse view to see the new item
  window.location.hash = '#browse';
}

/**
 * Handles Edit Report Form Submission
 */
function handleEditSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('editReportId').value;
  const updatedItem = {
    id: id,
    name: document.getElementById('editItemName').value.trim(),
    category: document.getElementById('editCategory').value,
    location: document.getElementById('editLocation').value,
    spot: document.getElementById('editSpecificSpot').value.trim(),
    description: document.getElementById('editDescription').value.trim(),
    contactEmail: document.getElementById('editContactEmail').value.trim(),
    contactPhone: document.getElementById('editContactPhone').value.trim(),
    status: document.getElementById('editStatus').value
  };

  if (!updatedItem.name || !updatedItem.description || !updatedItem.contactEmail) {
    Toast.show('Missing details', 'Please fill in all required fields.', 'error');
    return;
  }

  StorageManager.updateItem(updatedItem);
  closeEditReportModal();
  Toast.show('Report Updated', 'Your changes have been saved.', 'success');

  // Re-render whichever view is active
  if (AppState.currentView === 'my-reports') renderMyReportsView();
  else if (AppState.currentView === 'browse') renderBrowseView();
  else if (AppState.currentView === 'dashboard') renderDashboardView();
}

/* ====================================================================
   11. GLOBAL EVENT LISTENERS & EVENT DELEGATION
   ==================================================================== */
function setupEventListeners() {

  // --- 11.1 Client-side Hash Router ---
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    switchView(hash);
  });

  // Handle direct clicks on navigation links with data-nav
  document.addEventListener('click', (e) => {
    const navTarget = e.target.closest('[data-nav]');
    if (navTarget) {
      const view = navTarget.dataset.nav;
      window.location.hash = `#${view}`;
    }

    // Report Lost / Found fast triggers
    const reportTypeTarget = e.target.closest('[data-report-type]');
    if (reportTypeTarget) {
      const type = reportTypeTarget.dataset.reportType;
      setReportType(type === 'found' ? 'Found' : 'Lost');
      window.location.hash = '#report';
    }

    // Direct location filter clicks from footer
    const locFilterTarget = e.target.closest('[data-filter-loc]');
    if (locFilterTarget) {
      const loc = locFilterTarget.dataset.filterLoc;
      AppState.browseFilters.location = loc;
      DOM.filterLocation.value = loc;
      window.location.hash = '#browse';
    }

    // Category click from Home Page
    const catCard = e.target.closest('.category-card');
    if (catCard) {
      const cat = catCard.dataset.category;
      AppState.browseFilters.category = cat;
      DOM.filterCategory.value = cat;
      window.location.hash = '#browse';
    }
  });

  // --- 11.2 Header / Navigation Actions ---
  // Mobile Hamburger Toggle
  DOM.mobileMenuBtn.addEventListener('click', () => {
    DOM.navLinks.classList.toggle('open');
  });

  // Report Navigation Dropdown Toggle
  DOM.reportNavDropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    DOM.reportDropdownWrapper.classList.toggle('open');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!DOM.reportDropdownWrapper.contains(e.target)) {
      DOM.reportDropdownWrapper.classList.remove('open');
    }
  });

  // Dismiss Top Notice
  if (DOM.closeAnnouncement) {
    DOM.closeAnnouncement.addEventListener('click', () => {
      document.querySelector('.top-announcement').style.display = 'none';
    });
  }

  // --- 11.3 Hero Quick Search ---
  DOM.heroQuickSearchBtn.addEventListener('click', () => {
    const val = DOM.heroQuickSearch.value.trim();
    if (val) {
      AppState.browseFilters.search = val;
      DOM.browseSearchInput.value = val;
      DOM.clearSearchBtn.classList.add('visible');
      window.location.hash = '#browse';
    }
  });

  DOM.heroQuickSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      DOM.heroQuickSearchBtn.click();
    }
  });

  // --- 11.4 Browse Search & Filter Event Handlers ---
  DOM.browseSearchInput.addEventListener('input', (e) => {
    AppState.browseFilters.search = e.target.value;
    if (e.target.value.trim()) {
      DOM.clearSearchBtn.classList.add('visible');
    } else {
      DOM.clearSearchBtn.classList.remove('visible');
    }
    renderBrowseView();
  });

  DOM.clearSearchBtn.addEventListener('click', () => {
    AppState.browseFilters.search = '';
    DOM.browseSearchInput.value = '';
    DOM.clearSearchBtn.classList.remove('visible');
    renderBrowseView();
  });

  // Type Chips (All, Lost, Found)
  DOM.browseTypeGroup.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;

    DOM.browseTypeGroup.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    AppState.browseFilters.type = chip.dataset.type;
    renderBrowseView();
  });

  // Dropdown Filters
  DOM.filterCategory.addEventListener('change', (e) => {
    AppState.browseFilters.category = e.target.value;
    renderBrowseView();
  });

  DOM.filterLocation.addEventListener('change', (e) => {
    AppState.browseFilters.location = e.target.value;
    renderBrowseView();
  });

  DOM.filterStatus.addEventListener('change', (e) => {
    AppState.browseFilters.status = e.target.value;
    renderBrowseView();
  });

  DOM.filterSort.addEventListener('change', (e) => {
    AppState.browseFilters.sort = e.target.value;
    renderBrowseView();
  });

  // Reset Filters
  function resetAllBrowseFilters() {
    AppState.browseFilters = {
      search: '',
      type: 'all',
      category: 'all',
      location: 'all',
      status: 'all',
      sort: 'newest'
    };

    DOM.browseSearchInput.value = '';
    DOM.clearSearchBtn.classList.remove('visible');
    DOM.filterCategory.value = 'all';
    DOM.filterLocation.value = 'all';
    DOM.filterStatus.value = 'all';
    DOM.filterSort.value = 'newest';

    DOM.browseTypeGroup.querySelectorAll('.filter-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.type === 'all');
    });

    renderBrowseView();
  }

  DOM.btnResetFilters.addEventListener('click', resetAllBrowseFilters);
  DOM.btnEmptyReset.addEventListener('click', resetAllBrowseFilters);
  DOM.btnClearAllTags.addEventListener('click', resetAllBrowseFilters);

  // Individual Active Filter Tag clear click
  DOM.activeTagsList.addEventListener('click', (e) => {
    const clearBtn = e.target.closest('[data-clear-filter]');
    if (!clearBtn) return;

    const filterKey = clearBtn.dataset.clearFilter;
    if (filterKey === 'search') {
      AppState.browseFilters.search = '';
      DOM.browseSearchInput.value = '';
      DOM.clearSearchBtn.classList.remove('visible');
    } else if (filterKey === 'type') {
      AppState.browseFilters.type = 'all';
      DOM.browseTypeGroup.querySelectorAll('.filter-chip').forEach(c => {
        c.classList.toggle('active', c.dataset.type === 'all');
      });
    } else if (filterKey === 'category') {
      AppState.browseFilters.category = 'all';
      DOM.filterCategory.value = 'all';
    } else if (filterKey === 'location') {
      AppState.browseFilters.location = 'all';
      DOM.filterLocation.value = 'all';
    } else if (filterKey === 'status') {
      AppState.browseFilters.status = 'all';
      DOM.filterStatus.value = 'all';
    }
    renderBrowseView();
  });

  // --- 11.5 Report Form Event Handlers ---
  DOM.tabReportLost.addEventListener('click', () => setReportType('Lost'));
  DOM.tabReportFound.addEventListener('click', () => setReportType('Found'));

  // Image Drag & Drop
  DOM.imageDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    DOM.imageDropzone.classList.add('dragover');
  });

  DOM.imageDropzone.addEventListener('dragleave', () => {
    DOM.imageDropzone.classList.remove('dragover');
  });

  DOM.imageDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    DOM.imageDropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  });

  DOM.reportImageInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  });

  DOM.btnRemoveImage.addEventListener('click', (e) => {
    e.stopPropagation();
    removeImagePreview();
  });

  // Submit & Reset
  DOM.reportItemForm.addEventListener('submit', handleReportSubmit);
  DOM.btnResetForm.addEventListener('click', () => {
    DOM.reportItemForm.reset();
    removeImagePreview();
    document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-control').forEach(el => el.classList.remove('input-error'));
  });

  // --- 11.6 Event Delegation for Item Cards (Buttons & Actions) ---
  document.addEventListener('click', (e) => {
    // 1. View Details
    const detailsBtn = e.target.closest('[data-action="view-details"]');
    if (detailsBtn) {
      const id = detailsBtn.dataset.id;
      openItemDetailsModal(id);
      return;
    }

    // 2. Bookmark / Favorite Toggle
    const bookmarkBtn = e.target.closest('[data-action="bookmark"]');
    if (bookmarkBtn) {
      const id = bookmarkBtn.dataset.id;
      const isSaved = StorageManager.toggleBookmark(id);
      
      Toast.show(
        isSaved ? 'Item Saved' : 'Item Removed',
        isSaved ? 'Added to your bookmarked campus reports.' : 'Removed from your bookmarks.',
        'info'
      );

      // Update badge counter
      DOM.savedCountBadge.textContent = StorageManager.getSaved().length;

      // Update active views
      if (AppState.currentView === 'saved') renderSavedView();
      if (AppState.currentView === 'browse') renderBrowseView();
      if (AppState.currentView === 'home') renderHomeView();
      return;
    }

    // 3. Edit User Report
    const editBtn = e.target.closest('[data-action="edit-report"]');
    if (editBtn) {
      const id = editBtn.dataset.id;
      openEditReportModal(id);
      return;
    }

    // 4. Toggle Status (Open <-> Resolved)
    const statusBtn = e.target.closest('[data-action="toggle-status"]');
    if (statusBtn) {
      const id = statusBtn.dataset.id;
      const items = StorageManager.getItems();
      const item = items.find(i => i.id === id);
      if (item) {
        const newStatus = item.status === 'Resolved' ? 'Open' : 'Resolved';
        StorageManager.updateItem({ id: id, status: newStatus });
        Toast.show(
          `Report Status Updated`,
          `Status changed to "${newStatus}".`,
          'success'
        );
        if (AppState.currentView === 'my-reports') renderMyReportsView();
        if (AppState.currentView === 'browse') renderBrowseView();
        if (AppState.currentView === 'dashboard') renderDashboardView();
        if (DOM.itemDetailsModal.classList.contains('open')) openItemDetailsModal(id);
      }
      return;
    }

    // 5. Delete Report
    const deleteBtn = e.target.closest('[data-action="delete-report"]');
    if (deleteBtn) {
      const id = deleteBtn.dataset.id;
      showConfirmDialog(
        'Delete this report?',
        'This action is permanent and will remove this report from campus listings.',
        () => {
          StorageManager.deleteItem(id);
          Toast.show('Report Deleted', 'Your report has been permanently removed.', 'info');
          renderMyReportsView();
          renderDashboardView();
        }
      );
      return;
    }

    // 6. Copy Contact Details in Modal
    const copyContactBtn = e.target.closest('[data-action="modal-copy-contact"]');
    if (copyContactBtn) {
      const email = copyContactBtn.dataset.email;
      const phone = copyContactBtn.dataset.phone;
      const textToCopy = `CampusFind Contact: ${email}${phone ? ' / ' + phone : ''}`;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        Toast.show('Copied to Clipboard!', textToCopy, 'success');
      }).catch(() => {
        Toast.show('Copy Failed', textToCopy, 'info');
      });
      return;
    }
  });

  // --- 11.7 Modal Dismissal Handlers ---
  // Details Modal Close
  DOM.btnCloseDetailsModal.addEventListener('click', closeItemDetailsModal);
  DOM.itemDetailsModal.addEventListener('click', (e) => {
    if (e.target === DOM.itemDetailsModal) closeItemDetailsModal();
  });

  // Edit Modal Close
  DOM.btnCloseEditModal.addEventListener('click', closeEditReportModal);
  DOM.btnCancelEdit.addEventListener('click', closeEditReportModal);
  DOM.editReportModal.addEventListener('click', (e) => {
    if (e.target === DOM.editReportModal) closeEditReportModal();
  });
  DOM.editReportForm.addEventListener('submit', handleEditSubmit);

  // Confirm Dialog Buttons
  DOM.btnConfirmCancel.addEventListener('click', closeConfirmDialog);
  DOM.btnConfirmProceed.addEventListener('click', () => {
    if (AppState.confirmCallback) {
      AppState.confirmCallback();
    }
    closeConfirmDialog();
  });
  DOM.confirmDialogModal.addEventListener('click', (e) => {
    if (e.target === DOM.confirmDialogModal) closeConfirmDialog();
  });

  // ESC Key listener closes any open modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeItemDetailsModal();
      closeEditReportModal();
      closeConfirmDialog();
    }
  });

  // --- 11.8 My Reports Subtab Filter Switcher ---
  document.querySelectorAll('.subtab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.subtab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.myReportsFilter = btn.dataset.subtab;
      renderMyReportsView();
    });
  });

  // --- 11.9 Dashboard Refresh Button ---
  DOM.btnRefreshStats.addEventListener('click', () => {
    renderDashboardView();
    Toast.show('Metrics Updated', 'Dashboard analytics refreshed.', 'info');
  });

  // --- 11.10 Clear All Saved Items ---
  DOM.btnClearSavedBtn.addEventListener('click', () => {
    const count = StorageManager.getSaved().length;
    if (count === 0) {
      Toast.show('No saved items', 'Your bookmark list is already empty.', 'info');
      return;
    }
    showConfirmDialog(
      'Clear All Saved Items?',
      `Are you sure you want to remove all ${count} bookmarked items?`,
      () => {
        StorageManager.setSaved([]);
        renderSavedView();
        Toast.show('Bookmarks Cleared', 'All saved items were removed.', 'info');
      }
    );
  });

  // --- 11.11 Developer Reset Demo Data ---
  DOM.btnResetDemoData.addEventListener('click', () => {
    showConfirmDialog(
      'Reset CampusFind Demo Data?',
      'This will restore the original 8 college sample reports and clear custom browser changes.',
      () => {
        StorageManager.resetDemoData();
        Toast.show('Demo Data Restored', 'Default campus items have been refreshed.', 'success');
        renderHomeView();
        renderBrowseView();
        renderDashboardView();
        renderMyReportsView();
        renderSavedView();
      }
    );
  });

  // --- 11.12 Sticky Header Shadow on Scroll ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      document.getElementById('mainHeader').classList.add('scrolled');
    } else {
      document.getElementById('mainHeader').classList.remove('scrolled');
    }
  });
}

/* ====================================================================
   12. HELPER UTILITIES
   ==================================================================== */

/**
 * Formats YYYY-MM-DD into a human-readable date (e.g., Nov 12, 2026)
 */
function formatDate(dateStr) {
  if (!dateStr) return 'Recently';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return dateStr;
  } catch (e) {
    return dateStr;
  }
}

/**
 * Prevents Cross-Site Scripting (XSS) by escaping HTML characters
 */
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Dynamically populates dropdown selects with categories and locations
 */
function populateDropdownOptions() {
  // Categories in browse filter
  const cats = Object.keys(CATEGORY_ICONS);
  DOM.filterCategory.innerHTML = `<option value="all">All Categories</option>` +
    cats.map(c => `<option value="${c}">${c}</option>`).join('');

  // Locations in browse filter
  DOM.filterLocation.innerHTML = `<option value="all">All Locations</option>` +
    CAMPUS_LOCATIONS.map(l => `<option value="${l}">${l}</option>`).join('');

  // Set default date input in report form to today
  const today = new Date().toISOString().split('T')[0];
  const reportDateInput = document.getElementById('reportDate');
  if (reportDateInput) {
    reportDateInput.value = today;
    reportDateInput.max = today; // Can't report future lost item
  }

  // Set footer current year
  if (DOM.currentYear) {
    DOM.currentYear.textContent = new Date().getFullYear();
  }
}

/* ====================================================================
   13. INITIALIZATION ENTRY POINT
   ==================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize LocalStorage
  StorageManager.init();

  // 2. Populate Dropdowns & default inputs
  populateDropdownOptions();

  // 3. Bind all event listeners
  setupEventListeners();

  // 4. Initial Router Evaluation
  const initialHash = window.location.hash.replace('#', '') || 'home';
  switchView(initialHash);

  // 5. Initial updates for badges
  DOM.savedCountBadge.textContent = StorageManager.getSaved().length;

  console.log('%c CampusFind initialized successfully! ', 'background: #15803d; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
});
