# FlowFox Test Task

Marketing creative generation app with AI-powered content creation.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS 4** - Styling
- **Prisma** - Database ORM
- **PostgreSQL** - Database (Supabase)
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Validation
- **shadcn/ui** - UI components
- **OpenAI API** - GPT-4 for headlines, DALL-E 3 for images

## Features

- **Campaigns** - Create marketing campaigns
- **Headlines** - AI-generated German marketing headlines
- **Images** - AI-generated marketing images
- **Creatives** - Combine headlines and images with live preview

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Setup environment variables:**
```bash
cp .env.example .env
```

Add your credentials to `.env`:
```env
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="sk-proj-..."
```

3. **Setup database:**
```bash
npx prisma generate
npx prisma db push
```

4. **Run development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Deployment

Ready for Vercel deployment. Add environment variables in Vercel dashboard.
