# Portfolio Website - Next.js Full Stack

A modern, responsive portfolio website built with Next.js, featuring a complete backend API, database integration, and email functionality.

## 🚀 Features

### Frontend

- **Modern Design**: Clean, professional UI with yellow and teal color scheme
- **Responsive Layout**: Works perfectly on all device sizes
- **Interactive Elements**: Smooth scrolling navigation, hover effects
- **Contact Form**: Real-time validation and submission
- **CV Download**: Direct download functionality
- **Social Media Integration**: Links to all social platforms

### Backend API

- **RESTful API**: Complete API built with Next.js API routes
- **Database Integration**: PostgreSQL with connection pooling
- **Email System**: Automated email notifications with HTML templates
- **File Management**: CV download and file upload capabilities
- **Data Validation**: Robust input validation with Zod
- **Error Handling**: Comprehensive error handling and logging

### Admin Panel

- **Authentication**: Secure login with NextAuth.js
- **Contact Management**: View and manage contact form submissions
- **Portfolio Management**: Update personal information and content
- **Dashboard**: Statistics and analytics overview

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL with pg driver
- **Authentication**: NextAuth.js with credentials provider
- **Email**: Nodemailer with HTML templates
- **Validation**: Zod schemas
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites

- **Node.js**: 18.17.0 or higher
- **npm**: 9.6.7 or higher
- **PostgreSQL**: 13.0 or higher

### Quick Start

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd portfolio-nextjs
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

Edit \`.env.local\` with your configuration:
\`\`\`env

# Database

DATABASE_URL=postgresql://username:password@localhost:5432/portfolio

# NextAuth

NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=http://localhost:3000

# Email (Optional)

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@yourportfolio.com
\`\`\`

4. **Set up the database**
   \`\`\`bash
   npm run db:migrate
   \`\`\`

5. **Add your CV file**
   \`\`\`bash
   mkdir -p public/cv

# Place your CV file as: public/cv/Aqsam_CV.pdf

\`\`\`

6. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio!

## 📜 NPM Scripts

### Development Commands

\`\`\`bash
npm run dev # Start development server
npm run build # Build for production  
npm start # Start production server
npm run clean # Clean build artifacts
\`\`\`

### Code Quality Commands

\`\`\`bash
npm run lint # Run ESLint
npm run lint:fix # Fix ESLint issues
npm run type-check # TypeScript type checking
npm run format # Format code with Prettier
npm run format:check # Check code formatting
npm run validate # Run all quality checks
\`\`\`

### Database Commands

\`\`\`bash
npm run db:migrate # Initialize database and create admin
npm run db:init # Initialize database tables only
npm run db:admin # Create admin user only
npm run db:reset # Reset database (destructive)
npm run db:status # Check database connection
\`\`\`

### Maintenance Commands

\`\`\`bash
npm run security:audit # Run security audit
npm run security:fix # Fix security vulnerabilities
npm run deps:check # Check for outdated dependencies
npm run deps:update # Update dependencies
\`\`\`

### Testing Commands

\`\`\`bash
npm test # Run tests (placeholder)
npm run test:type # Type checking
npm run test:lint # Linting check
npm run test:format # Format checking
\`\`\`

## 🗄 Database Management

### Initialize Database

\`\`\`bash
npm run db:migrate
\`\`\`

### Reset Database (Development Only)

\`\`\`bash
npm run db:reset
\`\`\`

### Manual Database Operations

\`\`\`bash

# Connect to database

psql $DATABASE_URL

# View tables

\\dt

# View contact submissions

SELECT \* FROM contact_submissions ORDER BY created_at DESC;
\`\`\`

## 🔐 Admin Panel

### Access Admin Panel

1. Visit: \`http://localhost:3000/admin/login\`
2. Default credentials:
   - Email: \`admin@portfolio.com\`
   - Password: \`admin123\`

### Admin Features

- **Dashboard**: Overview of contacts, projects, and activity
- **Contact Management**: View and manage contact form submissions
- **Portfolio Content**: Update personal information and social links
- **Authentication**: Secure login/logout functionality

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

\`\`\`env
DATABASE_URL=your-production-database-url
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-domain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@yourportfolio.com
NEXT_PUBLIC_SOCKET_URL=https://your-socket-server-url.com
\`\`\`

### Chat Feature Deployment

The portfolio includes a real-time chat feature powered by WebSockets. Since Vercel is serverless, you need to deploy the WebSocket server separately.

**Quick Setup:**

1. Deploy the WebSocket server to [Railway](https://railway.app), [Render](https://render.com), or [Fly.io](https://fly.io)
2. Set `NEXT_PUBLIC_SOCKET_URL` in Vercel environment variables
3. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions

**For local development:**

- Run \`npm run dev\` (includes integrated WebSocket server)
- Or run separately: \`npm run dev:next\` and \`npm run dev:socket\`

### Build Optimization

\`\`\`bash

# Production build

npm run build

# Start production server

npm start
\`\`\`

## 📁 Project Structure

\`\`\`
├── app/
│ ├── api/ # API routes
│ ├── admin/ # Admin panel pages
│ ├── globals.css # Global styles
│ ├── layout.tsx # Root layout
│ └── page.tsx # Home page
├── components/
│ ├── admin/ # Admin components
│ ├── portfolio/ # Portfolio sections
│ ├── ui/ # shadcn/ui components
│ └── portfolio.tsx # Main portfolio component
├── hooks/
│ ├── use-contact-form.ts # Contact form logic
│ ├── use-portfolio-data.ts # Portfolio data fetching
│ └── use-scroll-spy.ts # Navigation scroll spy
├── lib/
│ ├── auth.ts # NextAuth configuration
│ ├── db.ts # Database connection
│ ├── email.ts # Email functionality
│ ├── validations.ts # Zod schemas
│ ├── types.ts # TypeScript types
│ └── utils/ # Utility functions
├── scripts/
│ ├── init-database.sql # Database initialization
│ └── create-admin-user.sql # Admin user creation
├── utils/
│ └── cv-download.ts # CV download utility
└── public/
├── cv/ # CV files
└── uploads/ # Uploaded files
\`\`\`

## 🔧 Configuration Files

### Package Management

- \`package.json\` - Dependencies and scripts
- \`.npmrc\` - npm configuration
- \`package-lock.json\` - Dependency lock file

### Code Quality

- \`eslint.config.js\` - ESLint configuration
- \`prettier.config.js\` - Prettier configuration
- \`tsconfig.json\` - TypeScript configuration

### Build Tools

- \`next.config.mjs\` - Next.js configuration
- \`tailwind.config.ts\` - Tailwind CSS configuration
- \`postcss.config.js\` - PostCSS configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/new-feature\`
3. Make your changes
4. Run tests: \`npm run lint && npm run type-check\`
5. Commit your changes: \`git commit -m 'Add new feature'\`
6. Push to the branch: \`git push origin feature/new-feature\`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Review the documentation
3. Contact support at your-email@domain.com

---

Built with ❤️ using Next.js and modern web technologies.
