# UPC VOT MINTAL - Portfolio Version

This is a **simplified portfolio demonstration** of the UPC VOT MINTAL Church Membership QR Code System. This version uses **mock data** instead of a backend API, making it perfect for showcasing the UI/UX and frontend capabilities.

## 🎯 Purpose

This portfolio version demonstrates:
- Modern React/Next.js frontend architecture
- Beautiful, responsive UI design
- Component-based architecture
- State management with Zustand
- Mock API service pattern

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 Demo Credentials

The login accepts any password. Use these usernames to access different dashboards:

- **admin** - Master Admin Dashboard
- **leader** - Caregroup Leader Dashboard  
- **user** - Regular User Dashboard

## 📁 Project Structure

```
upc-vot-mintal-portfolio/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication pages
│   ├── (leader)/         # Leader dashboard pages
│   ├── (admin)/          # Admin dashboard pages
│   ├── (user)/           # User dashboard pages
│   └── layout.tsx        # Root layout
├── components/            # React components
├── lib/                   # Utilities and services
│   ├── api.ts            # Mock API service
│   ├── mock-data.ts      # Mock data
│   └── store/            # Zustand stores
└── public/               # Static assets
```

## 🔧 Key Features

### Mock API Service
All API calls are handled by `lib/api.ts`, which simulates backend responses using mock data from `lib/mock-data.ts`. This allows the app to run completely frontend-only.

### Simplified Authentication
- Mock login that accepts any credentials
- Role-based routing (admin, leader, user)
- Local storage for session management

### Preserved UI/UX
- All original design and styling preserved
- Responsive layouts
- Beautiful component designs
- Smooth animations and transitions

## 📝 What's Different from Production

- ✅ **No backend** - All data is mocked
- ✅ **No database** - Static mock data
- ✅ **Simplified auth** - No real authentication
- ✅ **No file uploads** - Placeholder images
- ✅ **No real QR codes** - Placeholder QR codes

## 🎨 Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Lucide React** - Icons
- **Recharts** - Charts (if used)

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚢 Deployment

This portfolio version can be easily deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages** (with static export)

## ⚠️ Important Notes

- This is a **portfolio/demo version** only
- All data is **mock/placeholder data**
- Not suitable for production use
- Original project remains untouched in `../upc-vot-mintal/`

## 📄 License

Portfolio demonstration version - for showcase purposes only.

