import { query } from '../config/db.js';

/**
 * GET /api/blog — public, returns all published posts (newest first)
 * GET /api/blog?category=news — filter by category
 * GET /api/blog?draft=true — admin only, returns all posts including drafts
 */
export const getPosts = async (req, res) => {
  try {
    const { category, draft } = req.query;
    const params = [];
    let sql = 'SELECT * FROM blog_posts WHERE 1=1';

    // Only admin can see drafts (when ?draft=true is passed through auth middleware)
    if (draft !== 'true') {
      sql += ' AND published = true';
    }

    if (category) {
      params.push(category.toLowerCase());
      sql += ` AND LOWER(category) = $${params.length}`;
    }

    sql += ' ORDER BY published_at DESC NULLS LAST, created_at DESC';

    const result = await query(sql, params);
    res.json({ success: true, count: result.rowCount, data: result.rows });
  } catch (err) {
    console.error('Error in getPosts:', err);
    res.status(500).json({ success: false, message: 'Server error retrieving blog posts' });
  }
};

/**
 * GET /api/blog/:slug
 */
export const getPostBySlug = async (req, res) => {
  try {
    const result = await query('SELECT * FROM blog_posts WHERE slug = $1', [req.params.slug]);
    if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

/**
 * POST /api/blog — admin only
 */
export const createPost = async (req, res) => {
  try {
    const { title, slug, content, excerpt, cover_image, category, tags, published } = req.body;
    if (!title || !slug) return res.status(400).json({ success: false, message: 'Title and slug are required' });

    const result = await query(
      `INSERT INTO blog_posts (title, slug, content, excerpt, cover_image, category, tags, published, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        title, slug, content || '', excerpt || '', cover_image || '',
        category || 'blog', tags || [], !!published,
        published ? new Date().toISOString() : null
      ]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('Error in createPost:', err);
    res.status(500).json({ success: false, message: 'Server error creating post', error: err.message });
  }
};

/**
 * PUT /api/blog/:id — admin only
 */
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, content, excerpt, cover_image, category, tags, published } = req.body;

    const existing = await query('SELECT * FROM blog_posts WHERE id = $1', [id]);
    if (existing.rowCount === 0) return res.status(404).json({ success: false, message: 'Post not found' });

    const wasPublished = existing.rows[0].published;
    const publishedAt = (!wasPublished && published) ? new Date().toISOString() : existing.rows[0].published_at;

    const result = await query(
      `UPDATE blog_posts SET
         title = COALESCE($1, title), slug = COALESCE($2, slug),
         content = COALESCE($3, content), excerpt = COALESCE($4, excerpt),
         cover_image = COALESCE($5, cover_image), category = COALESCE($6, category),
         tags = COALESCE($7, tags), published = COALESCE($8, published),
         published_at = $9, updated_at = CURRENT_TIMESTAMP
       WHERE id = $10 RETURNING *`,
      [title, slug, content, excerpt, cover_image, category, tags, published, publishedAt, id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error updating post', error: err.message });
  }
};

/**
 * DELETE /api/blog/:id — admin only
 */
export const deletePost = async (req, res) => {
  try {
    const result = await query('DELETE FROM blog_posts WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error deleting post', error: err.message });
  }
};
