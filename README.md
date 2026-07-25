# LeadDesk Mini — Frontend Web App (`leaddesk-mini-client`)

The official frontend web application for **LeadDesk Mini** — a modern Lead Management SaaS CRM built for the Digital Heroes Qualification Task.

---

## 🚀 Features

- **Responsive Landing Page**: Hero section, Feature grid, Why Choose Us, Lead capture form, and Footer featuring "Built for Digital Heroes Training Task".
- **Zod + React Hook Form**: Full validation on Lead Submission Form (Name, Email, Budget, Message) & Admin Login Form.
- **TanStack Query (React Query)**: Caching, background updates, optimistic updates, and automatic query invalidation for leads list, stats, and auth state.
- **Admin CRM Dashboard**:
  - Live Statistics Cards (Total, New, Contacted, Closed).
  - Debounced Search Bar (by Name or Email).
  - Status Filter Dropdown (`New`, `Contacted`, `Closed`).
  - Inline Status Update Dropdown.
  - Pagination Controls.
  - CSV Export Functionality.
- **Protected Admin Routes**: Automatic redirect to `/admin/login` if unauthenticated.
- **Tailwind CSS v4 Integration**: Uses the official `@tailwindcss/vite` plugin and `@import "tailwindcss";`.
- **Skeleton Loaders**: Custom pulse shimmer animations for page load states and spinners for button action states.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **State & Data Fetching**: TanStack Query v5 (React Query)
- **Forms & Validation**: React Hook Form, Zod, `@hookform/resolvers`
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios (with `VITE_API_URL` and `withCredentials: true`)
- **Icons & UI**: Lucide React, React Hot Toast

---

## 📁 Project Structure

```
leaddesk-mini-client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── EmptyState.jsx          # No data fallback display
│   │   ├── Footer.jsx              # Footer with Digital Heroes hyperlink
│   │   ├── LeadForm.jsx            # Lead capture form with Zod validation
│   │   ├── LeadTable.jsx           # Interactive admin table with status dropdown
│   │   ├── LeadTableSkeleton.jsx   # Skeleton rows for table loading
│   │   ├── Navbar.jsx              # Header navigation bar with mobile menu
│   │   ├── Pagination.jsx          # Prev/Next page navigation
│   │   ├── ProtectedRoute.jsx      # Admin route guard
│   │   ├── StatsCard.jsx           # Dashboard metric cards
│   │   └── StatsCardSkeleton.jsx   # Pulse skeleton for metrics
│   ├── context/
│   │   └── AuthContext.jsx         # React Context for auth state
│   ├── hooks/
│   │   ├── useAuth.js              # TanStack Query auth hook
│   │   ├── useDebounce.js          # Search input debouncing hook
│   │   ├── useLeads.js             # TanStack Query leads query & mutations
│   │   └── useLeadStats.js        # TanStack Query stats query
│   ├── layouts/
│   │   ├── AdminLayout.jsx         # CRM Admin header & container
│   │   └── PublicLayout.jsx        # Navbar + Outlet + Footer layout
│   ├── lib/
│   │   ├── axios.js                # Axios instance with credentials
│   │   ├── constants.js            # Enums, budget ranges, routes, URLs
│   │   ├── queryKeys.js            # Centralized React Query key factory
│   │   └── schemas.js              # Zod validation schemas
│   ├── pages/
│   │   ├── DashboardPage.jsx       # Admin CRM Dashboard
│   │   ├── LandingPage.jsx         # Public SaaS Landing Page
│   │   ├── LoginPage.jsx           # Admin Login Page
│   │   └── NotFoundPage.jsx        # 404 Page Not Found
│   ├── services/
│   │   ├── authService.js          # API calls for login/logout/getMe
│   │   └── leadService.js          # API calls for leads & stats
│   ├── utils/
│   │   ├── csvExporter.js          # Client-side CSV generator
│   │   └── formatters.js           # Date and currency formatting helpers
│   ├── App.jsx                     # Router & Providers setup
│   ├── index.css                   # Tailwind v4 import & shimmer animations
│   └── main.jsx                    # React 19 DOM root render
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── vite.config.js                  # Vite config with @tailwindcss/vite
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```env
VITE_API_URL=http://localhost:5000
```

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🌐 Deployment Guide (Vercel)

1. Push code to GitHub repository `leaddesk-mini-client`.
2. Import project into Vercel.
3. Set Framework Preset: **Vite**.
4. Set Environment Variable:
   - `VITE_API_URL` = `https://your-backend-render-app.onrender.com`
5. Deploy!
