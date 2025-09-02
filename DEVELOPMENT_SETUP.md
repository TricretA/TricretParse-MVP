# Development Setup Guide

This guide will help you set up the TricretParse project for local development.

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- A Supabase account (free tier available)
- A Google AI Studio account for Gemini API access

## Quick Start

### 1. Install Dependencies

```bash
# Using npm (recommended if pnpm is not available)
npm install --legacy-peer-deps

# Or using pnpm (if available)
pnpm install
```

### 2. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Configure your environment variables in `.env.local`:

   **Supabase Configuration:**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Create a new project or select existing one
   - Go to Settings > API
   - Copy your Project URL and anon/public key

   **Google AI Configuration:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the generated key

3. Update `.env.local` with your actual values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
   ```

### 3. Verify Configuration

Run the environment verification script:
```bash
npm run verify-env
```

This will check if all required environment variables are properly configured.

### 4. Database Setup (Optional)

If you want to use the full database functionality:

1. In your Supabase project, go to the SQL Editor
2. Run the scripts in the `scripts/` folder:
   - `01-create-tables.sql` - Creates the database schema
   - `02-seed-default-schemas.sql` - Adds default schema definitions

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run verify-env` - Verify environment configuration
- `npm run setup` - Verify environment and start dev server

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── *.tsx             # Feature components
├── lib/                   # Utility libraries
│   ├── ai-service.ts     # AI integration
│   ├── database.ts       # Database operations
│   ├── supabase/         # Supabase configuration
│   └── *.ts              # Other utilities
├── scripts/              # Database and setup scripts
├── .env.local            # Environment variables (create this)
├── .env.example          # Environment template
└── package.json          # Dependencies and scripts
```

## Troubleshooting

### Common Issues

1. **Dependency conflicts**: Use `npm install --legacy-peer-deps` if you encounter peer dependency issues.

2. **Environment variables not loading**: 
   - Ensure `.env.local` is in the project root
   - Restart the development server after changing environment variables
   - Check that variable names match exactly (case-sensitive)

3. **Supabase connection errors**:
   - Verify your Supabase URL and key are correct
   - Check that your Supabase project is active
   - Ensure you're using the anon/public key, not the service role key

4. **Google AI API errors**:
   - Verify your API key is valid and active
   - Check that you have sufficient quota/credits
   - Ensure the Gemini API is enabled for your project

### Getting Help

- Check the console for detailed error messages
- Run `npm run verify-env` to diagnose configuration issues
- Review the application logs in the terminal

## Security Notes

- Never commit `.env.local` to version control
- Keep your API keys secure and private
- Use environment variables for all sensitive configuration
- The `.gitignore` file is configured to exclude environment files

## Next Steps

Once your development environment is set up:

1. Explore the application at `http://localhost:3000`
2. Try the natural language to JSON conversion features
3. Review the codebase to understand the architecture
4. Start building new features or customizations

For more detailed information about the project architecture and features, see the main [README.md](./README.md) file.