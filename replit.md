# replit.md

## Overview

This is a full-stack web application called GameScript - a marketplace for game scripts and items. It allows users to browse, search, and download game automation scripts, as well as purchase premium game items and tools. The platform features a modern React frontend with a clean design using shadcn/ui components, backed by an Express.js REST API server with PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming support
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with connection pooling
- **API Design**: RESTful API with JSON responses
- **Development**: Hot reload with Vite integration in development mode

### Data Storage Solutions
- **Primary Database**: PostgreSQL for persistent data storage
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Development Storage**: In-memory storage implementation for development/testing
- **Connection**: Neon Database serverless PostgreSQL for cloud deployment

### Key Features
- **Script Management**: CRUD operations for game automation scripts with categories, ratings, and download tracking
- **Shop System**: Item catalog with pricing, categories, and shopping cart functionality
- **Search & Discovery**: Full-text search across scripts and shop items with category filtering
- **File Upload**: Support for script uploads with metadata management
- **Responsive Design**: Mobile-first responsive layout with dark/light theme support

### External Dependencies
- **Database**: Neon Database (@neondatabase/serverless) for PostgreSQL hosting
- **UI Framework**: Radix UI primitives for accessible component foundations
- **Validation**: Zod for runtime type checking and form validation
- **Image Hosting**: Unsplash for placeholder images (development)
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **Development Tools**: Replit-specific plugins for development environment integration