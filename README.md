# User Unknown's News 📰 

A modern, high-performance Progressive Web App (PWA) built with React that delivers the latest news with an exceptional user experience across all devices and network conditions. **Now with German news support and dark mode!**

![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue?logo=typescript)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-brightgreen?logo=pwa)
![Accessibility](https://img.shields.io/badge/a11y-WCAG%202.1-green?logo=accessibility)
![Web Vitals](https://img.shields.io/badge/Web%20Vitals-Optimized-yellow?logo=lighthouse)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎉 What's New in v2.0

- 🌍 **Multi-Language Support**: Switch between English and German with one click
- 🌙 **Dark Mode**: Beautiful dark theme with system preference detection
- 🔄 **Multi-Source News**: Aggregates news from multiple APIs for comprehensive coverage
- 🔍 **Search & Filter**: Find news quickly with search and category filtering
- 🎨 **Modern UI**: Completely redesigned interface with smooth animations
- 🇩🇪 **German News**: Dedicated German news support from NewsAPI.org and NewsData.io

## ✨ Features

### 🌐 Multi-Language & Multi-Source
- 🇬🇧 **English News**: Latest headlines from global sources
- 🇩🇪 **German News**: Deutsche Nachrichten from NewsAPI.org and NewsData.io
- 🔄 **Multi-Source Aggregation**: Combines news from ok.surf, NewsAPI, and NewsData
- 🌍 **Instant Language Switch**: Toggle between English and German seamlessly
- 📰 **Category-Based Organization**: News organized by Business, Technology, Sports, etc.

### 🎨 Modern UI/UX
- 🌙 **Dark Mode**: Eye-friendly dark theme with smooth transitions
- ☀️ **Light Mode**: Clean, bright interface for daytime reading
- 💻 **System Theme**: Automatically matches your system preferences
- 🔍 **Advanced Search**: Search across all news articles instantly
- 🏷️ **Category Filters**: Filter news by specific categories
- ✨ **Smooth Animations**: Polished transitions and micro-interactions

### 📱 Progressive Web App (PWA)
- 🔄 **Offline Support**: Works without internet connection using service workers
- 📲 **Installable**: Add to home screen for native app-like experience
- ⚡ **Lightning Fast**: Advanced caching strategies for optimal performance
- 🔔 **Push Ready**: Infrastructure ready for push notifications

### ♿ Accessibility & UX
- 🎯 **WCAG 2.1 Compliant**: Full accessibility support with skip links and ARIA
- ⌨️ **Keyboard Navigation**: Complete keyboard accessibility
- 🌐 **Screen Reader Optimized**: Semantic HTML and proper landmarks
- 🎨 **Responsive Design**: Optimized for all devices and screen sizes

### ⚡ Performance & Optimization
- 🚀 **React 19 + Suspense**: Code splitting with lazy loading
- 💾 **Smart Caching**: In-memory API caching with configurable TTL
- 📊 **Web Vitals Monitoring**: Real-time performance tracking
- 🔍 **SEO Optimized**: Enhanced meta tags and Open Graph support

### 🌐 Network Awareness
- 📡 **Connection Status**: Real-time online/offline detection
- 🔄 **Request Cancellation**: AbortController for better UX
- 🔁 **Exponential Backoff**: Smart retry logic for failed requests
- 📱 **Network-First Strategy**: Optimized data fetching

### 🛠️ Developer Experience
- 🔧 **Docker Support**: Multi-stage builds for development and production
- 🧪 **Comprehensive Testing**: Unit, integration, and accessibility tests
- 📝 **TypeScript**: Full type safety and IntelliSense
- 🎯 **CI/CD Ready**: GitHub Actions for automated testing and deployment

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Usage](#-usage)
- [Technology Stack](#️-technology-stack)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Performance](#-performance)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

## 🚀 Quick Start

### 🐳 Docker (Recommended)

The fastest way to get started:

```bash
# Clone the repository
git clone https://github.com/uppnrise/user-unknown-news.git
cd user-unknown-news

# Development with hot reload
npm run docker:dev

# Production build
npm run docker:prod
```

### 📦 Local Development

#### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

#### Setup

1. **Clone and install**
   ```bash
   git clone https://github.com/uppnrise/user-unknown-news.git
   cd user-unknown-news
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### 📱 PWA Installation

Once the app is running:
1. Look for the install prompt in supported browsers
2. Click "Install App" to add to your home screen
3. Enjoy the native app-like experience!

## 🎯 Usage

### Core Features
- **📰 Browse News**: Latest headlines organized by categories
- **📖 Read Articles**: Click any item to open full articles
- **🔄 Pull to Refresh**: Refresh content with gesture or button
- **⚡ Instant Loading**: Cached content loads instantly
- **📱 Offline Reading**: Previously loaded content available offline

### Accessibility Features
- **⌨️ Keyboard Navigation**: Tab through all interactive elements
- **🎯 Skip Links**: Jump to main content with Ctrl+/
- **🔊 Screen Readers**: Full VoiceOver/NVDA support
- **🔍 High Contrast**: Respects system accessibility preferences

## 🛠️ Technology Stack

### Core Technologies
- **React 19.1.0** - Latest React with Concurrent Features
- **TypeScript 4.9.5** - Type-safe development
- **Styled Components 6.1.18** - CSS-in-JS with dynamic styling
- **Web Vitals 5.0.2** - Performance monitoring and optimization

### PWA Technologies
- **Service Workers** - Offline functionality and caching
- **Web App Manifest** - Native app-like installation
- **Cache API** - Advanced caching strategies
- **Background Sync** - Data synchronization when online

### Performance & Optimization
- **React.lazy()** - Code splitting and lazy loading
- **Suspense** - Loading boundary management
- **AbortController** - Request cancellation
- **IntersectionObserver** - Efficient scroll handling

### Testing & Quality
- **Jest** - Unit and integration testing
- **React Testing Library 16.3.0** - Component testing utilities
- **ESLint** - Code quality and consistency
- **Prettier** - Automated code formatting

### DevOps & Deployment
- **Docker** - Containerized development and deployment
- **GitHub Actions** - CI/CD pipeline
- **Nginx** - Production web server with optimization
- **Multi-stage Builds** - Optimized container images

## 📁 Project Structure

```
src/
├── components/              # React components
│   ├── Container.tsx       # Main layout container
│   ├── NewsList.tsx        # News list with lazy loading
│   ├── ErrorBoundary.tsx   # Error handling boundary
│   ├── SkipLink.tsx        # Accessibility navigation
│   ├── PWAInstallPrompt.tsx # App installation UI
│   ├── OnlineOfflineIndicator.tsx # Network status
│   ├── PerformanceMetrics.tsx # Web Vitals monitoring
│   └── *.test.tsx          # Component tests
├── hooks/                   # Custom React hooks
│   ├── useApi.ts           # Enhanced API hook with caching
│   ├── useOnlineStatus.ts  # Network connectivity hook
│   └── *.test.ts           # Hook tests
├── config/                  # Application configuration
│   └── index.ts            # Centralized config management
├── types.ts                # TypeScript type definitions
├── App.tsx                 # Main application component
└── index.tsx               # Application entry point with PWA setup

public/
├── sw.js                   # Service worker for PWA functionality
├── manifest.json           # PWA manifest with icons and metadata
└── index.html              # Enhanced HTML with SEO and PWA meta tags

Docker/
├── Dockerfile              # Production multi-stage build
├── Dockerfile.dev          # Development container
├── docker-compose.yml      # Development and production orchestration
└── nginx.conf              # Production web server configuration
```

## 🔌 API Documentation

### Multi-Source News Aggregation

The application fetches news from multiple sources for comprehensive coverage:

#### 1. ok.surf API (Primary Source)
- **Endpoint**: `https://ok.surf/api/v1/cors/news-feed`
- **Method**: GET
- **API Key**: Not required
- **Language**: English
- **Features**: Free, no rate limits, reliable CORS support

#### 2. NewsAPI.org (German News)
- **Endpoint**: `https://newsapi.org/v2/top-headlines`
- **Method**: GET
- **API Key**: Required (get free key at https://newsapi.org/register)
- **Language**: English, German (de)
- **Features**: 150,000+ sources, category filtering, country-specific news
- **Environment Variable**: `REACT_APP_NEWSAPI_KEY`

#### 3. NewsData.io (German News)
- **Endpoint**: `https://newsdata.io/api/1/news`
- **Method**: GET
- **API Key**: Required (get free key at https://newsdata.io/register)
- **Language**: Multilingual including German
- **Features**: Real-time news, multiple languages, category support
- **Environment Variable**: `REACT_APP_NEWSDATA_KEY`

### API Key Setup (Optional)

For German news support, add API keys to your `.env` file:

```bash
# Copy .env.example to .env
cp .env.example .env

# Add your API keys
REACT_APP_NEWSAPI_KEY=your_newsapi_key_here
REACT_APP_NEWSDATA_KEY=your_newsdata_key_here
```

**Note**: The app works without API keys using only the ok.surf source. API keys enable German news and additional sources.
- **Response Format**: JSON

### Data Structure

```typescript
type NewsItem = {
  link: string;    // URL to the full article
  og: string;      // Open Graph image URL
  title: string;   // Article headline
};

type NewsByCategory = {
  [category: string]: NewsItem[];
};
```

## 🔧 Development

### Available Scripts

#### Development
- `npm start` - Start development server with hot reload
- `npm run docker:dev` - Run in Docker development environment
- `npm run type-check` - TypeScript type checking

#### Testing
- `npm test` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ci` - Run tests for CI/CD pipeline

#### Code Quality
- `npm run lint` - Run ESLint checks
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

#### Production & Deployment
- `npm run build` - Build optimized production bundle
- `npm run docker:build` - Build production Docker image
- `npm run docker:prod` - Run production Docker container
- `npm run analyze` - Analyze bundle size and composition

### Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
# API Configuration
REACT_APP_API_URL=https://ok.surf/api/v1/cors/news-feed
REACT_APP_API_TIMEOUT=10000

# Performance Settings
REACT_APP_CACHE_DURATION=300000
REACT_APP_RETRY_ATTEMPTS=3

# Development
REACT_APP_ENABLE_PERFORMANCE_METRICS=true
```

### PWA Development

#### Service Worker
The service worker (`public/sw.js`) handles:
- Static asset caching
- API response caching
- Offline functionality
- Cache versioning and cleanup

#### Manifest Configuration
Update `public/manifest.json` for:
- App name and description
- Icon configurations
- Theme colors
- Display modes

### Performance Optimization

#### Bundle Analysis
```bash
npm run analyze
```

#### Web Vitals Monitoring
- Development: Metrics displayed in UI
- Production: Sent to analytics (when configured)

#### Caching Strategy
- **Static Assets**: Cache-first with versioning
- **API Responses**: Network-first with fallback
- **Images**: Cache with size optimization

## 🧪 Testing

### Test Coverage

We maintain high test coverage across all components and functionality:

```bash
# Run all tests with coverage
npm run test:coverage

# Watch mode for development
npm test

# CI/CD pipeline tests
npm run test:ci
```

### Test Structure

- **Component Tests**: React Testing Library for UI components
- **Hook Tests**: Custom hook testing with renderHook
- **Integration Tests**: Full application flow testing
- **Accessibility Tests**: ARIA and keyboard navigation testing
- **PWA Tests**: Service worker and offline functionality

### Performance Testing

```bash
# Lighthouse CI (if configured)
npm run lighthouse

# Bundle size analysis
npm run analyze

# Performance monitoring
# Web Vitals automatically tracked in development
```

### Accessibility Testing

- **Manual Testing**: Screen reader and keyboard navigation
- **Automated Testing**: jest-axe integration
- **WCAG 2.1 Compliance**: AA level conformance

## 🚀 Deployment

### Docker Deployment (Recommended)

#### Production Deployment
```bash
# Build and run production container
docker-compose up app

# Or manually
docker build -t user-unknown-news .
docker run -p 80:80 user-unknown-news
```

#### Development Deployment
```bash
# Development with hot reload
docker-compose --profile dev up app-dev
```

### Manual Deployment

#### Build for Production
```bash
npm run build
```

The `build` folder contains the optimized production build ready for deployment.

#### Static Hosting
Deploy the `build` folder to any static hosting service:
- **Netlify**: Drag and drop deployment
- **Vercel**: GitHub integration
- **AWS S3**: Static website hosting
- **GitHub Pages**: Free hosting for public repos

### CI/CD Pipeline

The project includes GitHub Actions workflow (`.github/workflows/ci-cd.yml`):

- ✅ **Automated Testing**: Run tests on every push
- ✅ **Code Quality**: ESLint and Prettier checks
- ✅ **Security Scanning**: Dependency vulnerability checks
- ✅ **Build Verification**: Ensure production builds succeed
- ✅ **Docker Support**: Container build and push

### Environment Variables

Set these in your deployment environment:

```bash
# API Configuration
REACT_APP_API_URL=https://ok.surf/api/v1/cors/news-feed
REACT_APP_API_TIMEOUT=10000

# Performance
REACT_APP_CACHE_DURATION=300000
REACT_APP_RETRY_ATTEMPTS=3

# Analytics (optional)
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
```

## 📊 Performance

### Core Web Vitals

The app is optimized for all Core Web Vitals:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8s
- **TTFB (Time to First Byte)**: < 600ms

### Performance Features

- 🚀 **Code Splitting**: Lazy-loaded components
- 💾 **Smart Caching**: API and asset caching
- 📱 **Responsive Images**: Optimized loading
- ⚡ **Service Worker**: Instant cache-first loading
- 🔄 **Request Deduplication**: Prevent duplicate API calls

### Monitoring

- **Development**: Real-time Web Vitals display
- **Production**: Analytics integration ready
- **Bundle Analysis**: Size optimization tracking

## 🤝 Contributing

We welcome contributions! Here's how you can help improve this PWA:

### Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. **Install dependencies**: `npm install`
4. **Start development**: `npm start` or `npm run docker:dev`
5. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
6. **Make** your changes
7. **Test** your changes (`npm run test:coverage`)
8. **Lint** your code (`npm run lint:fix`)
9. **Format** your code (`npm run format`)
10. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
11. **Push** to your branch (`git push origin feature/amazing-feature`)
12. **Open** a Pull Request

### Development Guidelines

#### Code Style
- Follow existing TypeScript patterns and conventions
- Use Prettier for consistent formatting (`npm run format`)
- Follow ESLint rules (`npm run lint:fix`)
- Use semantic commit messages (feat, fix, docs, etc.)

#### Testing Requirements
- Add tests for new features and components
- Maintain or improve test coverage
- Include accessibility tests for UI components
- Test PWA functionality when applicable

#### Documentation
- Update README.md for significant features
- Add JSDoc comments for complex functions
- Update type definitions when needed
- Include examples for new APIs

#### PWA Considerations
- Test offline functionality
- Verify service worker updates
- Check performance impact
- Ensure accessibility compliance

### Areas for Contribution

- 🐛 **Bug Fixes**: Report and fix issues
- ✨ **New Features**: PWA enhancements, accessibility improvements
- 📚 **Documentation**: Improve guides and examples
- 🧪 **Testing**: Increase coverage and add edge cases
- 🎨 **Design**: UI/UX improvements and responsive design
- ⚡ **Performance**: Optimization and Web Vitals improvements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

### Technologies & Libraries
- **[React Team](https://reactjs.org/)** - For React 19 with Concurrent Features
- **[TypeScript](https://www.typescriptlang.org/)** - For type-safe development
- **[Styled Components](https://styled-components.com/)** - For CSS-in-JS styling
- **[Testing Library](https://testing-library.com/)** - For excellent testing utilities
- **[Web Vitals](https://web.dev/vitals/)** - For performance monitoring

### Services & APIs
- **[ok.surf](https://ok.surf/api/v1/cors/news-feed)** - For reliable news data API
- **[Lighthouse](https://developers.google.com/web/tools/lighthouse)** - For performance auditing
- **[PWA Builder](https://www.pwabuilder.com/)** - For PWA best practices

### Community & Inspiration
- **Open Source Community** - For continuous learning and inspiration
- **A11y Project** - For accessibility guidelines and best practices
- **MDN Web Docs** - For comprehensive web technology documentation
- **React Community** - For patterns, practices, and support

### Special Thanks
- **Contributors** - Everyone who has contributed to this project
- **Issue Reporters** - Helping identify and resolve problems
- **Feature Requesters** - Driving innovation and improvements

---

<div align="center">

**[⬆ Back to Top](#user-unknowns-news-)**

Made with ❤️ and ⚡ by [User Unknown](https://github.com/uppnrise)

*Progressive Web App • Accessible • Performance Optimized*

</div>

Made with ❤️ by [User Unknown](https://github.com/uppnrise)

</div>