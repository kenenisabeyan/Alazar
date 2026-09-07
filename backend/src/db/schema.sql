-- ═══════════════════════════════════════════════════════════════════════════
-- Alazar Asdesach Portfolio — Complete PostgreSQL Schema
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Projects ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
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

-- ── Inquiries ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    project_type VARCHAR(100) NOT NULL,
    budget VARCHAR(50) NOT NULL,
    details TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ── Testimonials ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    quote TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL DEFAULT 'Client',
    company VARCHAR(255) NOT NULL,
    avatar TEXT NOT NULL DEFAULT '',
    rating INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ── Services ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    features TEXT[] DEFAULT '{}',
    starting_price VARCHAR(50) NOT NULL,
    icon VARCHAR(50),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ── Quotes ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quotes (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(100),
    client_email VARCHAR(255),
    project_type VARCHAR(100) NOT NULL,
    scope VARCHAR(100) NOT NULL,
    addons TEXT[] DEFAULT '{}',
    total_price NUMERIC(10, 2) NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'estimated',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ── Stats ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stats (
    id SERIAL PRIMARY KEY,
    key_name VARCHAR(100) UNIQUE NOT NULL,
    value VARCHAR(50) NOT NULL,
    label VARCHAR(100) NOT NULL
);

-- ── Site Settings (key/value CMS store) ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NOT NULL DEFAULT '',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ── Blog / News Posts ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL DEFAULT '',
    excerpt TEXT NOT NULL DEFAULT '',
    cover_image TEXT NOT NULL DEFAULT '',
    category VARCHAR(100) NOT NULL DEFAULT 'blog',
    tags TEXT[] DEFAULT '{}',
    published BOOLEAN NOT NULL DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ── FAQs ──────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faqs (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ── Gear ──────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gear (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ── Awards ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS awards (
    id SERIAL PRIMARY KEY,
    year VARCHAR(10) NOT NULL,
    title VARCHAR(255) NOT NULL,
    project VARCHAR(255) NOT NULL DEFAULT '',
    sort_order INTEGER DEFAULT 0
);

-- ── Skills ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    level INTEGER NOT NULL DEFAULT 80,
    description TEXT NOT NULL DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ── Career Experience ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS career_experience (
    id SERIAL PRIMARY KEY,
    period VARCHAR(50) NOT NULL,
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    achievements TEXT[] DEFAULT '{}',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ── Client Logos ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS client_logos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    display_text VARCHAR(255) NOT NULL DEFAULT '',
    logo_url TEXT,
    sort_order INTEGER DEFAULT 0
);

-- ── BTS Gallery ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bts_gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL DEFAULT '',
    image TEXT NOT NULL,
    caption TEXT NOT NULL DEFAULT '',
    sort_order INTEGER DEFAULT 0
);

-- ── Color Grading Samples ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS color_grading_samples (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    log_image TEXT NOT NULL,
    graded_image TEXT NOT NULL,
    camera VARCHAR(100) NOT NULL DEFAULT '',
    color_space VARCHAR(100) NOT NULL DEFAULT '',
    lut VARCHAR(100) NOT NULL DEFAULT '',
    iso VARCHAR(50) NOT NULL DEFAULT '',
    sort_order INTEGER DEFAULT 0
);

-- ── Hiring Guarantees ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hiring_guarantees (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    sort_order INTEGER DEFAULT 0
);

-- ── Pricing Options ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pricing_options (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,       -- 'project_type' | 'scope' | 'addon'
    option_id VARCHAR(100) NOT NULL,
    label VARCHAR(255) NOT NULL,
    base_price NUMERIC(10,2),        -- for project_type
    multiplier NUMERIC(4,2),         -- for scope
    price NUMERIC(10,2),             -- for addon
    sort_order INTEGER DEFAULT 0,
    UNIQUE(type, option_id)
);

-- ── Social Links ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS social_links (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    handle VARCHAR(255) NOT NULL DEFAULT '',
    type VARCHAR(50) NOT NULL DEFAULT 'link',
    sort_order INTEGER DEFAULT 0
);

-- ── Case Studies ──────────────────────────────────────────────────────────────
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

-- ── Page Sections (visibility toggles) ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS page_sections (
    id SERIAL PRIMARY KEY,
    page VARCHAR(100) NOT NULL,      -- 'home' | 'about' | 'portfolio' | 'services'
    section_key VARCHAR(100) NOT NULL,
    label VARCHAR(255) NOT NULL,
    visible BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    UNIQUE(page, section_key)
);

-- ── Seed: Default page sections ───────────────────────────────────────────────
INSERT INTO page_sections (page, section_key, label, visible, sort_order) VALUES
  ('home', 'hero',              'Hero Banner',              true, 1),
  ('home', 'about_snapshot',    'About Snapshot',           true, 2),
  ('home', 'expertise',         'Expertise Section',        true, 3),
  ('home', 'showreel',          'Showreel Banner',          true, 4),
  ('home', 'portfolio_board',   'Portfolio Presentation',   true, 5),
  ('home', 'color_grading',     'Color Grading Showcase',   true, 6),
  ('home', 'social_proof',      'Testimonials',             true, 7),
  ('home', 'case_study',        'Case Study Highlight',     true, 8),
  ('home', 'bts',               'Behind The Scenes',        true, 9),
  ('home', 'skills',            'Skills Section',           true, 10),
  ('home', 'career',            'Career Timeline',          true, 11),
  ('home', 'gear',              'Gear Section',             true, 12),
  ('home', 'why_hire',          'Why Hire Me',              true, 13),
  ('home', 'calculator',        'Project Calculator',       true, 14),
  ('home', 'availability_cta',  'Availability CTA',         true, 15),
  ('home', 'client_logos',      'Client Logos',             true, 16)
ON CONFLICT (page, section_key) DO NOTHING;
