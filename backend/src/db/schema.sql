-- PostgreSQL Database Schema for Alazar Portfolio

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'video' | 'design'
    client VARCHAR(255) NOT NULL,
    thumbnail TEXT NOT NULL,
    preview_video_url TEXT,
    video_url TEXT,
    description TEXT NOT NULL,
    role VARCHAR(255) NOT NULL,
    deliverables TEXT[] DEFAULT '{}',
    year VARCHAR(10) NOT NULL,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inquiries / Contact Messages Table
CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    project_type VARCHAR(100) NOT NULL,
    budget VARCHAR(50) NOT NULL,
    details TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'read', 'contacted', 'archived'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Client Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    quote TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    avatar TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Service Offerings Table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'remote' | 'in-person' | 'full'
    description TEXT NOT NULL,
    features TEXT[] DEFAULT '{}',
    starting_price VARCHAR(50) NOT NULL,
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Case Studies / ROI Metrics Table
CREATE TABLE IF NOT EXISTS case_studies (
    id SERIAL PRIMARY KEY,
    client VARCHAR(255) NOT NULL,
    project VARCHAR(255) NOT NULL,
    metric VARCHAR(50) NOT NULL,
    metric_label VARCHAR(100) NOT NULL,
    result TEXT NOT NULL,
    deliverables TEXT[] DEFAULT '{}',
    image TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Production Calculator Quotes Table
CREATE TABLE IF NOT EXISTS quotes (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(100),
    client_email VARCHAR(255),
    project_type VARCHAR(100) NOT NULL,
    scope VARCHAR(100) NOT NULL,
    addons TEXT[] DEFAULT '{}',
    total_price NUMERIC(10, 2) NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'estimated', -- 'estimated', 'contacted', 'booked'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio Metrics / Statistics Table
CREATE TABLE IF NOT EXISTS stats (
    id SERIAL PRIMARY KEY,
    key_name VARCHAR(100) UNIQUE NOT NULL,
    value VARCHAR(50) NOT NULL,
    label VARCHAR(100) NOT NULL
);
