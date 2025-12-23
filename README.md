# MetricFlow 📊

A modern, professional web analytics platform built with Next.js 16, providing real-time insights into website traffic, user behavior, and performance metrics. MetricFlow offers a privacy-focused alternative to traditional analytics solutions with a beautiful, intuitive interface.

![MetricFlow Dashboard](https://img.shields.io/badge/Next.js-16.0.7-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-38B2AC?style=for-the-badge&logo=tailwind-css)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=for-the-badge&logo=drizzle)

## ✨ Features

### 🎯 Core Analytics
- **Real-time Visitor Tracking** - Monitor live users on your website
- **Page View Analytics** - Detailed insights into page performance
- **Traffic Sources** - Track referrers, UTM parameters, and campaign data
- **Geographic Analytics** - Visitor location data with country/city breakdown
- **Device & Browser Analytics** - Comprehensive device, OS, and browser statistics
- **Time-based Analytics** - Hourly and daily visitor patterns

### 🔐 Security & Privacy
- **Secure Authentication** - Powered by Clerk with multi-factor authentication
- **Privacy-First Design** - GDPR compliant data collection
- **Secure API Endpoints** - Protected routes with proper error handling
- **Database Security** - Server-side only database connections
- **User Data Protection** - Encrypted data storage and transmission

### 🎨 Modern UI/UX
- **Professional Dashboard** - Clean, intuitive interface inspired by Google Analytics
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme Support** - Adaptive theming with system preference detection
- **Smooth Animations** - Professional micro-interactions and loading states
- **Loading States** - Comprehensive loading system for better UX
- **Interactive Charts** - Beautiful data visualizations with Recharts

### 🚀 Performance
- **Server-Side Rendering** - Fast initial page loads with Next.js 16
- **Optimized Database Queries** - Efficient data fetching with Drizzle ORM
- **Lazy Loading** - Dynamic imports for better performance
- **Caching Strategy** - Smart caching for improved response times
- **Error Handling** - Comprehensive error boundaries and fallbacks

### 🛠️ Developer Experience
- **TypeScript** - Full type safety throughout the application
- **Modern Stack** - Latest Next.js 16 with App Router
- **Component Library** - Radix UI components with custom styling
- **Code Quality** - ESLint and TypeScript strict mode
- **Hot Reload** - Fast development with Turbopack

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 16.0.7 with App Router
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.1.17
- **UI Components**: Radix UI + Custom Components
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Tailwind CSS Animate
- **Forms**: React Hook Form + Zod validation

### Backend
- **Runtime**: Node.js with Next.js API Routes
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM 0.45.0
- **Authentication**: Clerk
- **HTTP Client**: Axios
- **Date Handling**: date-fns with timezone support

### Development Tools
- **Package Manager**: npm
- **Build Tool**: Next.js with Turbopack
- **Code Quality**: ESLint + TypeScript
- **Database Migrations**: Drizzle Kit

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Neon recommended)
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnshuHemal/MetricFlow.git
   cd metric-flow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

4. **Configure Environment Variables**
   ```env
   # Database Configuration
   NEON_DB_CONNECTION_STRING=your_neon_database_url
   
   # Application URL
   NEXT_PUBLIC_HOST_URL=http://localhost:3000
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Clerk Routes
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
   ```

5. **Database Setup**
   ```bash
   # Generate and run migrations
   npm run db:generate
   npm run db:migrate
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```

7. **Open Application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Usage

### Adding a Website

1. **Sign up/Login** to your MetricFlow account
2. **Navigate to Dashboard** and click "Add New Website"
3. **Enter Website Details**:
   - Domain name (e.g., example.com)
   - Timezone selection
   - Localhost tracking preference
4. **Copy Tracking Script** and add to your website's `<head>` section:
   ```html
   <script defer 
     data-website-id='your-website-id' 
     data-domain='your-domain.com' 
     src="http://localhost:3000/analytics.js">
   </script>
   ```

### Viewing Analytics

- **Dashboard Overview**: See all your websites and key metrics
- **Detailed Analytics**: Click on any website for comprehensive insights
- **Real-time Data**: Monitor live visitors and their activity
- **Historical Data**: View trends with date range selection
- **Export Data**: Download reports for further analysis

### Managing Websites

- **Settings Page**: Configure domain, tracking preferences
- **Delete Website**: Permanently remove website and all associated data
- **Update Configuration**: Modify tracking settings as needed

## 🔧 API Endpoints

### Public Endpoints
- `POST /api/track` - Track page views and user interactions
- `POST /api/live` - Update live user sessions

### Protected Endpoints
- `GET /api/website` - Fetch website analytics data
- `POST /api/website` - Create new website
- `DELETE /api/website` - Delete website and all data
- `POST /api/user` - User management
- `GET /api/status` - Health check

## 🗄️ Database Schema

### Tables
- **users** - User account information
- **websites** - Website configurations and settings
- **pageViews** - Detailed page view analytics data
- **liveUser** - Real-time user session tracking

### Key Features
- **Auto-incrementing IDs** for all tables
- **Foreign key relationships** for data integrity
- **Timezone support** for accurate time-based analytics
- **Comprehensive tracking** of user interactions

## 🔒 Security Features

- **Authentication Required** for all dashboard access
- **API Route Protection** with Clerk middleware
- **CORS Configuration** for tracking endpoints
- **Input Validation** with Zod schemas
- **SQL Injection Prevention** with Drizzle ORM
- **Environment Variable Security** (no client-side database exposure)
- **Error Handling** without sensitive data leakage

## 🎨 UI Components

### Custom Components
- **Loading System** - Multiple loading variants (page, card, button, overlay)
- **Navigation Loading** - Smooth transitions between routes
- **Analytics Charts** - Interactive data visualizations
- **Form Components** - Validated forms with error handling
- **Modal Dialogs** - Confirmation dialogs for destructive actions

### Design System
- **Consistent Spacing** - Tailwind CSS utility classes
- **Color Palette** - Professional blue/gray theme
- **Typography** - Poppins font family
- **Animations** - Subtle micro-interactions
- **Responsive Design** - Mobile-first approach

## 📈 Performance Optimizations

- **Dynamic Imports** - Lazy loading for better performance
- **Database Query Optimization** - Efficient data fetching
- **Image Optimization** - Next.js Image component
- **Bundle Splitting** - Automatic code splitting
- **Caching Headers** - Proper cache control
- **Error Boundaries** - Graceful error handling

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Variables for Production
Ensure all environment variables are properly configured in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Clerk** - For seamless authentication
- **Radix UI** - For accessible UI components
- **Tailwind CSS** - For utility-first styling
- **Drizzle Team** - For the excellent ORM
- **Neon** - For serverless PostgreSQL

## 📞 Support

For support, email connect.hemal@gmail.com or call on +91 79902 46779.

---

**MetricFlow** - Professional Web Analytics Made Simple 🚀
