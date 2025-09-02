# TricretParse

**Natural Language to JSON Converter with AI-Powered Precision**

TricretParse is a modern web application that transforms natural language requests into structured JSON prompts using advanced AI technology. Built with Next.js 15, React 19, and Google's Gemini AI, it provides both basic and advanced conversion capabilities with a sleek, futuristic glassmorphic UI.

## 🚀 Project Overview

TricretParse serves as an intelligent intermediary that converts human-readable requests into well-structured JSON prompts. This is particularly useful for:

- **Content Creation**: Transform creative briefs into structured prompts for AI image/video generation
- **Marketing**: Convert campaign ideas into detailed marketing specifications
- **Development**: Turn feature requests into technical specifications
- **Design**: Transform design concepts into comprehensive design briefs

### Key Features

- **Dual Conversion Modes**: Basic and Advanced JSON generation
- **Conversational AI**: Interactive clarification system when more details are needed
- **Real-time Processing**: Instant conversion with loading states and progress feedback
- **Conversion History**: Local storage of recent conversions for easy access
- **Professional Enhancement**: Advanced mode adds industry-standard details and best practices
- **Glassmorphic UI**: Modern, futuristic interface with neon accents and blur effects
- **Responsive Design**: Optimized for desktop and mobile devices

## 🏗️ Architecture Overview

### Frontend Architecture
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4.x with custom glassmorphic design system
- **Components**: Radix UI primitives with custom styling
- **State Management**: React hooks with local state
- **Icons**: Lucide React icon library

### Backend Architecture
- **API Routes**: Next.js API routes for server-side processing
- **AI Integration**: Google Gemini AI via @ai-sdk/google
- **Database**: Supabase (PostgreSQL) for data persistence
- **Validation**: AJV for JSON schema validation
- **Type Safety**: Full TypeScript implementation

### Database Schema
- **Organizations**: Multi-tenant support structure
- **Users**: User management and roles
- **Schemas**: Predefined JSON schemas for validation
- **Conversions**: Conversion history and analytics

## 📁 Project Structure

```
MVP/
├── app/                          # Next.js App Router
│   ├── api/convert/             # API endpoint for conversions
│   ├── globals.css              # Global styles and design tokens
│   ├── layout.tsx               # Root layout with fonts and metadata
│   ├── loading.tsx              # Loading UI component
│   └── page.tsx                 # Main application page
├── components/                   # React components
│   ├── ui/                      # Radix UI components (50+ components)
│   ├── chat-message.tsx         # Chat message component
│   ├── conversation-panel.tsx   # Conversation interface
│   ├── json-result-panel.tsx    # JSON output display
│   ├── theme-provider.tsx       # Theme context provider
│   └── waitlist-section.tsx     # Email waitlist component
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts            # Mobile detection hook
│   └── use-toast.ts             # Toast notification hook
├── lib/                          # Core business logic
│   ├── supabase/                # Supabase client configuration
│   ├── ai-service.ts            # AI conversion logic
│   ├── database.ts              # Database operations
│   ├── schemas.ts               # Predefined JSON schemas
│   ├── types.ts                 # TypeScript type definitions
│   ├── utils.ts                 # Utility functions
│   └── validation.ts            # JSON validation logic
├── public/                       # Static assets
├── scripts/                      # Database setup scripts
│   ├── 01-create-tables.sql     # Database schema creation
│   └── 02-seed-default-schemas.sql # Default data seeding
└── styles/                       # Additional stylesheets
```

## 🔧 Key Dependencies

### Core Framework
- **next**: 15.2.4 - React framework with App Router
- **react**: ^19 - UI library
- **typescript**: ^5 - Type safety

### AI & Processing
- **@ai-sdk/google**: latest - Google Gemini AI integration
- **ai**: latest - AI SDK for text generation
- **ajv**: latest - JSON schema validation
- **ajv-formats**: latest - Additional validation formats

### UI & Styling
- **tailwindcss**: ^4.1.9 - Utility-first CSS framework
- **@radix-ui/react-***: Various - Accessible UI primitives
- **lucide-react**: ^0.454.0 - Icon library
- **next-themes**: latest - Theme management
- **class-variance-authority**: ^0.7.1 - Component variants
- **clsx**: ^2.1.1 - Conditional class names
- **tailwind-merge**: ^2.5.5 - Tailwind class merging

### Database & Backend
- **@supabase/supabase-js**: latest - Supabase client
- **@supabase/ssr**: latest - Server-side rendering support

### Form & Validation
- **react-hook-form**: ^7.60.0 - Form management
- **@hookform/resolvers**: ^3.10.0 - Form validation resolvers
- **zod**: 3.25.67 - Schema validation

### Additional Features
- **sonner**: ^1.7.4 - Toast notifications
- **date-fns**: 4.1.0 - Date manipulation
- **recharts**: 2.15.4 - Data visualization
- **react-resizable-panels**: ^2.1.7 - Resizable UI panels

## 🎨 Design System

### Color Palette
- **Background**: Dark graphite with blue tint (oklch(0.145 0.02 240))
- **Primary**: Neon cyan (oklch(0.7 0.15 195))
- **Accent**: Electric pink for errors (oklch(0.6 0.2 15))
- **Glass Effects**: Transparent overlays with blur and borders

### Typography
- **Primary Font**: Inter (--font-inter)
- **Monospace**: JetBrains Mono (--font-mono)

### UI Patterns
- **Glassmorphic Cards**: Semi-transparent backgrounds with blur effects
- **Neon Glows**: Subtle glow effects on interactive elements
- **Responsive Grid**: Adaptive layouts for different screen sizes

## 🔄 Core Functionality

### Conversion Process

1. **Input Processing**: User enters natural language request
2. **AI Analysis**: Google Gemini analyzes the request
3. **Clarification Loop**: AI asks questions if more details needed
4. **JSON Generation**: Creates structured JSON output
5. **Validation**: Validates against predefined schemas
6. **History Storage**: Saves conversion for future reference

### Conversion Modes

#### Basic Mode
- Simple natural language to JSON conversion
- Focuses on direct translation of user intent
- Minimal enhancement of the original request

#### Advanced Mode
- Professional enhancement with industry standards
- Adds comprehensive details based on 17+ domain categories:
  - Video Projects (camera work, lighting, sound design)
  - Design Projects (dimensions, color theory, typography)
  - Marketing Projects (target audience, messaging strategy)
  - Technical Projects (specifications, architecture, security)
  - And 13+ more specialized domains

### AI Service Architecture

```typescript
// Core conversion functions
export async function convertToJSON(naturalLanguage: string, conversationHistory?: Array<{ role: string; content: string }>): Promise<ConversationResult>

export async function convertToAdvancedJSON(naturalLanguage: string, conversationHistory?: Array<{ role: string; content: string }>): Promise<ConversationResult>

export async function repairJSON(invalidJSON: string, validationErrors: string[]): Promise<ConversionResult>

export async function autoDetectSchema(naturalLanguage: string, schemas: any[]): Promise<any>
```

## 🗄️ Database Schema

### Tables

#### Organizations (`orgs`)
- Multi-tenant support structure
- Plan management (free, premium, etc.)

#### Users (`users`)
- User authentication and role management
- Organization association

#### Schemas (`schemas`)
- Predefined JSON schemas for validation
- Version control and default schema management
- Custom instructions per schema

#### Conversions (`conversions`)
- Conversion history and analytics
- Performance metrics (tokens used, processing time)
- Quality scoring

### Predefined Schemas

1. **Blog Post**: Title, content, author, publish date, tags
2. **Ad Copy**: Headline, description, CTA, target audience, platform
3. **Support Ticket**: Subject, description, priority, category, status

## 🚦 Current Implementation Status

### ✅ Completed Features
- [x] Core UI with glassmorphic design
- [x] Basic and Advanced conversion modes
- [x] Google Gemini AI integration
- [x] Conversational clarification system
- [x] Local conversion history
- [x] JSON validation with AJV
- [x] Responsive design
- [x] Toast notifications
- [x] Database schema and Supabase integration
- [x] Waitlist functionality
- [x] Professional domain enhancement (17+ categories)

### 🔄 In Progress
- [ ] User authentication system
- [ ] Persistent conversion history
- [ ] Schema management interface
- [ ] Analytics dashboard

### 📋 Planned Features
- [ ] Custom schema creation
- [ ] Team collaboration features
- [ ] API rate limiting
- [ ] Export functionality (PDF, CSV)
- [ ] Integration with external tools
- [ ] Advanced analytics and reporting
- [ ] Bulk conversion processing
- [ ] Template library

## ⚠️ Known Issues & Limitations

### Current Limitations
1. **Authentication**: No user authentication implemented yet
2. **Persistence**: Conversion history only stored locally
3. **Rate Limiting**: No API rate limiting implemented
4. **Error Handling**: Limited error recovery mechanisms
5. **Offline Support**: No offline functionality

### Technical Debt
- Environment variable validation needs improvement
- Error boundaries not implemented
- Loading states could be more sophisticated
- Mobile UX needs refinement

### Performance Considerations
- Large JSON outputs may impact UI performance
- AI API calls can be slow for complex requests
- No caching mechanism for repeated requests

## 🛠️ Development Setup

### Prerequisites
- **Node.js**: Version 18 or higher
- **Package Manager**: pnpm (recommended) or npm
- **Database**: Supabase account for PostgreSQL database
- **AI Service**: Google AI API key for Gemini integration

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd MVP
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` with your actual values:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Google AI Configuration
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
   ```

4. **Database Setup**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Run the SQL scripts in order:
     ```sql
     -- In Supabase SQL Editor, run:
     -- 1. scripts/01-create-tables.sql
     -- 2. scripts/02-seed-default-schemas.sql
     ```

5. **Start Development Server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google AI API key for Gemini | Yes | `AIzaSyC...` |

### Getting API Keys

#### Supabase Setup
1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Go to Settings > API
4. Copy the "Project URL" and "anon public" key

#### Google AI Setup
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create an API key
3. Copy the generated key

### Build Configuration
- **ESLint**: Configured but ignored during builds for faster deployment
- **TypeScript**: Strict mode enabled with build error handling
- **Images**: Unoptimized for static export compatibility
- **Output**: Static export ready for various hosting platforms

### Development Scripts

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Type checking
pnpm type-check

# Database verification
node scripts/test-supabase.js

# Environment verification
node scripts/verify-env.js
```

## 🔮 Future Roadmap

### Phase 1: Core Stability
- Implement user authentication
- Add persistent storage
- Improve error handling
- Add comprehensive testing

### Phase 2: Enhanced Features
- Custom schema builder
- Team collaboration
- Advanced analytics
- API rate limiting

### Phase 3: Enterprise Features
- White-label solutions
- Advanced integrations
- Custom AI model support
- Enterprise security features

---

**TricretParse** - Transforming natural language into structured intelligence, one prompt at a time.

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/tricreta-8169s-projects/v0-tricret-parse)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/oaXl6XbGbBR)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/tricreta-8169s-projects/v0-tricret-parse](https://vercel.com/tricreta-8169s-projects/v0-tricret-parse)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/oaXl6XbGbBR](https://v0.app/chat/projects/oaXl6XbGbBR)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
