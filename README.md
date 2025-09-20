# Horsepower Electrical - React + TypeScript + Express + Supabase

A modern, full-stack electrical services website built with React, TypeScript, Express, and Supabase, designed for deployment on Vercel.

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Development**: ESLint + Prettier

## 📁 Project Structure

```
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── lib/               # Utilities and services
│   ├── types/             # TypeScript type definitions
│   └── main.tsx           # App entry point
├── server/                # Express backend
│   ├── services/          # Business logic
│   └── index.ts           # Server entry point
├── dist/                  # Build output
└── public/                # Static assets
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd horsepower-electrical
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ADMIN_EMAIL=flakechop@gmail.com
   ADMIN_PASSWORD=Unic0rnH34rt$
   ```

3. **Set up Supabase database**
   - Create a new Supabase project
   - Run the SQL from `SUPABASE_SETUP.md` to create tables
   - Update your environment variables

4. **Start development servers**
   ```bash
   npm run dev
   ```
   
   This starts both:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🗄️ Database Setup

### Supabase Table Structure

```sql
-- Contact submissions table
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    service VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'new'
);

-- Indexes for performance
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
```

### Row Level Security (RLS)

```sql
-- Allow public to insert contact submissions
CREATE POLICY "Allow public to insert contact submissions" ON contact_submissions
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read all submissions
CREATE POLICY "Allow authenticated users to read submissions" ON contact_submissions
    FOR SELECT USING (auth.role() = 'authenticated');
```

## 🚀 Deployment to Vercel

### 1. Prepare for Deployment

```bash
# Build the project
npm run build

# Test the build locally
npm start
```

### 2. Deploy to Vercel

1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Set Environment Variables in Vercel Dashboard**
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`

3. **Deploy**
   ```bash
   npx vercel --prod
   ```

### 3. Vercel Configuration

The `vercel.json` file configures:
- API routes to Express server
- Static file serving for React app
- Build settings for both frontend and backend

## 📱 Features

### Public Website
- ✅ **Responsive Design**: Mobile-first, works on all devices
- ✅ **Modern UI**: Clean, professional design with Tailwind CSS
- ✅ **Contact Form**: Integrated with Supabase for data storage
- ✅ **Service Showcase**: Comprehensive electrical services
- ✅ **About Section**: Company information and credentials
- ✅ **Smooth Scrolling**: Enhanced user experience

### Admin Dashboard
- ✅ **Secure Login**: Password-protected admin access
- ✅ **Submission Management**: View all contact form submissions
- ✅ **Statistics**: Real-time analytics and insights
- ✅ **Status Updates**: Mark submissions as new/read/processed
- ✅ **Responsive Design**: Works on desktop and mobile

### API Endpoints
- `POST /api/contact` - Submit contact form
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/submissions` - Get all submissions
- `GET /api/admin/stats` - Get dashboard statistics
- `PATCH /api/admin/submissions/:id/status` - Update submission status

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:client       # Start only frontend
npm run dev:server       # Start only backend

# Building
npm run build            # Build both frontend and backend
npm run build:client    # Build only frontend
npm run build:server    # Build only backend

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # TypeScript type checking
```

## 🎨 Styling

The project uses Tailwind CSS with custom configuration:
- **Colors**: Primary blue theme with secondary grays
- **Typography**: Inter font family
- **Components**: Custom button, input, and card styles
- **Animations**: Fade-in, slide-up, and hover effects

## 🔐 Security

- **Environment Variables**: Sensitive data stored in environment variables
- **Input Validation**: Form validation on both client and server
- **CORS**: Configured for production domains
- **Helmet**: Security headers for Express server
- **Type Safety**: Full TypeScript coverage

## 📊 Performance

- **Code Splitting**: React Router for lazy loading
- **Optimized Builds**: Vite for fast development and builds
- **Database Indexing**: Optimized Supabase queries
- **Caching**: Efficient data fetching and state management

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   npm run type-check  # Check TypeScript errors
   npm run lint       # Check ESLint issues
   ```

2. **Supabase Connection**
   - Verify environment variables
   - Check Supabase project status
   - Ensure RLS policies are set correctly

3. **Vercel Deployment**
   - Check build logs in Vercel dashboard
   - Verify environment variables are set
   - Ensure all dependencies are in package.json

### Debug Steps

1. Check browser console for errors
2. Verify API endpoints are working
3. Test Supabase connection
4. Check Vercel function logs

## 📈 Next Steps

- [ ] Add email notifications for new submissions
- [ ] Implement user authentication system
- [ ] Add data export functionality
- [ ] Set up automated backups
- [ ] Add analytics and tracking
- [ ] Implement SEO optimization
- [ ] Add unit and integration tests

## 📄 License

This project is proprietary software for Horsepower Electrical.

## 🤝 Support

For technical support or questions about this implementation, please contact the development team.
