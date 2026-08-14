import { query } from '../config/db.js';

// Save a calculated production quote
export const createQuote = async (req, res) => {
  try {
    const {
      clientName,
      clientEmail,
      projectType,
      scope,
      addons,
      totalPrice,
      notes
    } = req.body;

    if (!projectType || !scope || totalPrice === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Project type, scope, and total price are required.'
      });
    }

    const result = await query(
      `INSERT INTO quotes (client_name, client_email, project_type, scope, addons, total_price, notes, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'estimated')
       RETURNING *`,
      [
        clientName || 'Anonymous Client',
        clientEmail || null,
        projectType,
        scope,
        addons || [],
        totalPrice,
        notes || null
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Rate calculation saved successfully.',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error in createQuote:', error);
    res.status(500).json({
      success: false,
      message: 'Server error saving quote',
      error: error.message
    });
  }
};

// Get all quotes (Admin)
export const getQuotes = async (req, res) => {
  try {
    const result = await query('SELECT * FROM quotes ORDER BY created_at DESC');
    res.json({
      success: true,
      count: result.rowCount,
      data: result.rows
    });
  } catch (error) {
    console.error('Error in getQuotes:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving quotes', error: error.message });
  }
};
