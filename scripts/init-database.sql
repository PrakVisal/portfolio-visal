-- Create database tables for portfolio

-- Portfolio data table
CREATE TABLE IF NOT EXISTS portfolio_data (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(100) NOT NULL,
    social_instagram VARCHAR(255),
    social_facebook VARCHAR(255),
    social_twitter VARCHAR(255),
    social_youtube VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    is_replied BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255),
    technologies TEXT[], -- PostgreSQL array type
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    featured BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    proficiency_level INTEGER CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default portfolio data
INSERT INTO portfolio_data (name, title, description, location, social_instagram, social_facebook, social_twitter, social_youtube)
VALUES (
    'Muhammad Aqsam',
    'UI/UX Designer, Flutter developer',
    'Hello! I''m a UI/UX designer and Flutter developer. Dive into my portfolio to discover a fusion of elegant design and seamless Flutter development. Welcome to a world where creativity meets functionality!',
    'Pakistan',
    'https://instagram.com/aqsam',
    'https://facebook.com/aqsam',
    'https://twitter.com/aqsam',
    'https://youtube.com/aqsam'
) ON CONFLICT DO NOTHING;

-- Insert default skills
INSERT INTO skills (name, category, proficiency_level, display_order) VALUES
('React', 'Frontend', 5, 1),
('Next.js', 'Frontend', 5, 2),
('TypeScript', 'Frontend', 4, 3),
('JavaScript', 'Frontend', 5, 4),
('Flutter', 'Mobile', 5, 5),
('Dart', 'Mobile', 5, 6),
('UI/UX Design', 'Design', 5, 7),
('Figma', 'Design', 5, 8),
('Node.js', 'Backend', 4, 9),
('PostgreSQL', 'Database', 4, 10),
('MongoDB', 'Database', 3, 11),
('Git', 'Tools', 5, 12)
ON CONFLICT (name) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, description, image_url, technologies, github_url, live_url, featured, display_order) VALUES
(
    'E-Commerce Mobile App',
    'A full-featured e-commerce mobile application built with Flutter, featuring user authentication, product catalog, shopping cart, and payment integration.',
    '/placeholder.svg?height=300&width=400',
    ARRAY['Flutter', 'Dart', 'Firebase', 'Stripe'],
    'https://github.com/aqsam/ecommerce-app',
    'https://play.google.com/store/apps/details?id=com.aqsam.ecommerce',
    true,
    1
),
(
    'Portfolio Website',
    'A responsive portfolio website built with Next.js and TypeScript, featuring modern design, contact form, and admin dashboard.',
    '/placeholder.svg?height=300&width=400',
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    'https://github.com/aqsam/portfolio',
    'https://aqsam-portfolio.vercel.app',
    true,
    2
),
(
    'Task Management Dashboard',
    'A comprehensive task management dashboard with real-time updates, team collaboration features, and progress tracking.',
    '/placeholder.svg?height=300&width=400',
    ARRAY['React', 'Node.js', 'Socket.io', 'MongoDB'],
    'https://github.com/aqsam/task-manager',
    'https://taskmanager-aqsam.herokuapp.com',
    true,
    3
)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_is_read ON contact_submissions(is_read);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured, display_order);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category, display_order);
