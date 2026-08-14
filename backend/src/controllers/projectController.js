import { query } from '../config/db.js';

// Get all projects with optional filtering (category, featured, search)
export const getProjects = async (req, res) => {
  try {
    const { category, featured, search } = req.query;
    let sql = 'SELECT * FROM projects WHERE 1=1';
    const params = [];

    if (category && category !== 'all') {
      params.push(category.toLowerCase());
      sql += ` AND LOWER(category) = $${params.length}`;
    }

    if (featured === 'true') {
      sql += ` AND featured = true`;
    }

    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      sql += ` AND (LOWER(title) LIKE $${params.length} OR LOWER(description) LIKE $${params.length} OR LOWER(client) LIKE $${params.length})`;
    }

    sql += ' ORDER BY id ASC';

    const result = await query(sql, params);
    res.json({
      success: true,
      count: result.rowCount,
      data: result.rows
    });
  } catch (error) {
    console.error('Error in getProjects:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving projects', error: error.message });
  }
};

// Get single project by ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM projects WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error in getProjectById:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving project', error: error.message });
  }
};

// Create a new project (Admin)
export const createProject = async (req, res) => {
  try {
    const {
      title,
      category,
      client,
      thumbnail,
      preview_video_url,
      video_url,
      description,
      role,
      deliverables,
      year,
      featured
    } = req.body;

    if (!title || !category || !client || !thumbnail || !description || !role) {
      return res.status(400).json({ success: false, message: 'Please provide all required project fields' });
    }

    const result = await query(
      `INSERT INTO projects (title, category, client, thumbnail, preview_video_url, video_url, description, role, deliverables, year, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        title,
        category,
        client,
        thumbnail,
        preview_video_url || null,
        video_url || null,
        description,
        role,
        deliverables || [],
        year || new Date().getFullYear().toString(),
        featured || false
      ]
    );

    res.status(201).json({ success: true, message: 'Project created successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error in createProject:', error);
    res.status(500).json({ success: false, message: 'Server error creating project', error: error.message });
  }
};

// Update project (Admin)
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      category,
      client,
      thumbnail,
      preview_video_url,
      video_url,
      description,
      role,
      deliverables,
      year,
      featured
    } = req.body;

    const result = await query(
      `UPDATE projects 
       SET title = COALESCE($1, title),
           category = COALESCE($2, category),
           client = COALESCE($3, client),
           thumbnail = COALESCE($4, thumbnail),
           preview_video_url = COALESCE($5, preview_video_url),
           video_url = COALESCE($6, video_url),
           description = COALESCE($7, description),
           role = COALESCE($8, role),
           deliverables = COALESCE($9, deliverables),
           year = COALESCE($10, year),
           featured = COALESCE($11, featured),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $12
       RETURNING *`,
      [title, category, client, thumbnail, preview_video_url, video_url, description, role, deliverables, year, featured, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, message: 'Project updated successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error in updateProject:', error);
    res.status(500).json({ success: false, message: 'Server error updating project', error: error.message });
  }
};

// Delete project (Admin)
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error in deleteProject:', error);
    res.status(500).json({ success: false, message: 'Server error deleting project', error: error.message });
  }
};
