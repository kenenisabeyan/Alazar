import { query } from '../config/db.js';

// Default static fallback settings for Portfolio page & presentation board
const defaultPortfolioSettings = {
  hero: {
    eyebrow: "Graphic Design & Video Portfolio Presentation",
    title: "Selected Works",
    titleAccent: "Works",
    description: "An editorial archive of commercial video cuts, color-graded masters, brand identities, book covers, packaging, and digital imaging spreads.",
    heroImage: "",
    heroBackgroundImage: "",
    heroBackgroundVideo: "",
    heroBackgroundType: "NONE",
    showHeroImage: true,
    isVisible: true
  },
  presentation: {
    creativeDirectionLabel: "CREATIVE DIRECTION & EDITORIAL DESIGN",
    masterSpreadLabel: "01 / MASTER SPREAD",
    portfolioTitle: "Portfolio",
    archiveLabel: "VISUAL ARCHIVE",
    selectedWorksLabel: "SELECTED WORKS",
    edition: "2025 EDITION",
    introductionLabel: "INTRODUCTION",
    profileLabel: "PROFILE",
    profileName: "Alazar Asdesach",
    profileTitle: "Senior Video Editor & Lead Designer",
    profileDescription: "Passionate visual storyteller with 5+ years of expertise in commercial video editing, brand profile books, 3D product visuals, and custom editorial typography.",
    profileImage: "/assets/images/alazar.png",
    location: "Addis Ababa",
    availability: "Available",
    isVisible: true
  },
  categories: [
    { id: 'all', name: 'All', slug: 'all', icon: 'Layers', displayOrder: 0, isVisible: true },
    { id: 'video', name: 'Video', slug: 'video', icon: 'Film', displayOrder: 1, isVisible: true },
    { id: 'design', name: 'Design', slug: 'design', icon: 'Layout', displayOrder: 2, isVisible: true }
  ],
  creativeRoles: [
    { id: 1, name: 'ILLUSTRATOR', icon: 'PenTool', displayOrder: 0, isVisible: true },
    { id: 2, name: 'GRAPHIC DESIGNER', icon: 'Layers', displayOrder: 1, isVisible: true },
    { id: 3, name: 'VIDEO EDITOR', icon: 'Film', displayOrder: 2, isVisible: true }
  ]
};

// ── Public Portfolio Data Aggregator ─────────────────────────────────────────
export const getPublicPortfolioData = async (req, res) => {
  try {
    const projectsRes = await query(
      `SELECT * FROM projects WHERE (status IS NULL OR status != 'ARCHIVED') AND (visibility IS NULL OR visibility = 'PUBLIC') ORDER BY id ASC`
    );

    const projectsList = projectsRes.rows && projectsRes.rows.length ? projectsRes.rows : [];

    const videoCount = projectsList.filter(p => (p.category || '').toLowerCase() === 'video').length;
    const designCount = projectsList.filter(p => (p.category || '').toLowerCase() === 'design').length;
    const totalCount = projectsList.length;

    const categories = [
      { id: 'all', label: `All (${totalCount})`, count: totalCount, icon: 'Layers' },
      { id: 'video', label: `Video (${videoCount})`, count: videoCount, icon: 'Film' },
      { id: 'design', label: `Design (${designCount})`, count: designCount, icon: 'Layout' }
    ];

    res.json({
      success: true,
      data: {
        settings: defaultPortfolioSettings,
        projects: projectsList,
        categories,
        counts: {
          total: totalCount,
          video: videoCount,
          design: designCount
        }
      }
    });
  } catch (error) {
    console.error('Error fetching public portfolio data:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving portfolio data' });
  }
};

// ── Single Project Details by ID or Slug ─────────────────────────────────────
export const getProjectBySlugOrId = async (req, res) => {
  try {
    const { identifier } = req.params;
    const result = await query(
      `SELECT * FROM projects WHERE id::text = $1 OR slug = $1 LIMIT 1`,
      [identifier]
    );

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving project details' });
  }
};

// ── Admin Aggregator ─────────────────────────────────────────────────────────
export const getAdminPortfolioFullData = async (req, res) => {
  try {
    const projectsRes = await query(`SELECT * FROM projects ORDER BY id DESC`);
    res.json({
      success: true,
      data: {
        settings: defaultPortfolioSettings,
        projects: projectsRes.rows || [],
        categories: defaultPortfolioSettings.categories,
        creativeRoles: defaultPortfolioSettings.creativeRoles
      }
    });
  } catch (error) {
    console.error('Error in getAdminPortfolioFullData:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving admin portfolio data' });
  }
};

// ── CRUD operations for Projects ─────────────────────────────────────────────
export const createProject = async (req, res) => {
  try {
    const { title, category, client, thumbnail, preview_video_url, video_url, description, role, deliverables, year, featured } = req.body;

    const result = await query(
      `INSERT INTO projects (title, category, client, thumbnail, preview_video_url, video_url, description, role, deliverables, year, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        title || 'Untitled Project',
        (category || 'design').toLowerCase(),
        client || 'Client Name',
        thumbnail || '/assets/projects/urban-echoes.svg',
        preview_video_url || null,
        video_url || null,
        description || '',
        role || 'Director',
        deliverables || [],
        year || new Date().getFullYear().toString(),
        featured || false
      ]
    );

    res.status(201).json({ success: true, message: 'Project created', data: result.rows[0] });
  } catch (error) {
    console.error('Error in createProject:', error);
    res.status(500).json({ success: false, message: 'Server error creating project' });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, client, thumbnail, preview_video_url, video_url, description, role, deliverables, year, featured } = req.body;

    const result = await query(
      `UPDATE projects 
       SET title = $1, category = $2, client = $3, thumbnail = $4, preview_video_url = $5, video_url = $6, description = $7, role = $8, deliverables = $9, year = $10, featured = $11
       WHERE id = $12
       RETURNING *`,
      [
        title,
        (category || 'design').toLowerCase(),
        client,
        thumbnail,
        preview_video_url || null,
        video_url || null,
        description,
        role,
        deliverables || [],
        year,
        featured || false,
        id
      ]
    );

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, message: 'Project updated', data: result.rows[0] });
  } catch (error) {
    console.error('Error in updateProject:', error);
    res.status(500).json({ success: false, message: 'Server error updating project' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(`DELETE FROM projects WHERE id = $1 RETURNING *`, [id]);
    res.json({ success: true, message: 'Project deleted', data: result.rows[0] });
  } catch (error) {
    console.error('Error in deleteProject:', error);
    res.status(500).json({ success: false, message: 'Server error deleting project' });
  }
};

export const toggleProjectFeatured = async (req, res) => {
  try {
    const { id } = req.params;
    const projectRes = await query(`SELECT featured FROM projects WHERE id = $1`, [id]);
    if (!projectRes.rows || projectRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const currentFeatured = projectRes.rows[0].featured;
    const result = await query(`UPDATE projects SET featured = $1 WHERE id = $2 RETURNING *`, [!currentFeatured, id]);
    res.json({ success: true, message: 'Featured status toggled', data: result.rows[0] });
  } catch (error) {
    console.error('Error toggling featured status:', error);
    res.status(500).json({ success: false, message: 'Server error toggling featured' });
  }
};
