import { query } from '../config/db.js';

export const getServices = async (req, res) => {
  try {
    const result = await query('SELECT * FROM services ORDER BY id ASC');
    res.json({
      success: true,
      count: result.rowCount || (result.rows ? result.rows.length : 0),
      data: result.rows || []
    });
  } catch (error) {
    console.error('Error in getServices:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving services', error: error.message });
  }
};

export const getAdminServicesFullData = async (req, res) => {
  try {
    const servicesRes = await query('SELECT * FROM services ORDER BY id ASC');
    const faqsRes = await query('SELECT * FROM faqs ORDER BY sort_order ASC');
    const guaranteesRes = await query('SELECT * FROM hiring_guarantees ORDER BY sort_order ASC');

    res.json({
      success: true,
      data: {
        services: servicesRes.rows || [],
        faqs: faqsRes.rows || [],
        guarantees: guaranteesRes.rows || []
      }
    });
  } catch (error) {
    console.error('Error in getAdminServicesFullData:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving admin services data' });
  }
};

export const createService = async (req, res) => {
  try {
    const { badge, badgeDark, title, desc, items, cta, ctaVariant } = req.body;
    const result = await query(
      `INSERT INTO services (badge, badge_dark, title, desc, items, cta, cta_variant)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [badge || 'Service', badgeDark || false, title || 'New Service', desc || '', items || [], cta || 'Request Quote', ctaVariant || 'primary']
    );
    res.status(201).json({ success: true, message: 'Service created', data: result.rows[0] });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ success: false, message: 'Error creating service' });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { badge, badgeDark, title, desc, items, cta, ctaVariant } = req.body;
    const result = await query(
      `UPDATE services SET badge = $1, badge_dark = $2, title = $3, desc = $4, items = $5, cta = $6, cta_variant = $7 WHERE id = $8 RETURNING *`,
      [badge, badgeDark || false, title, desc, items || [], cta || 'Request Quote', ctaVariant || 'primary', id]
    );
    res.json({ success: true, message: 'Service updated', data: result.rows[0] });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ success: false, message: 'Error updating service' });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM services WHERE id = $1 RETURNING *', [id]);
    res.json({ success: true, message: 'Service deleted', data: result.rows[0] });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ success: false, message: 'Error deleting service' });
  }
};

export const createEstimateRequest = async (req, res) => {
  try {
    const { client_name, client_email, project_type, scope, addons, total_price, notes } = req.body;
    const result = await query(
      `INSERT INTO quotes (client_name, client_email, project_type, scope, addons, total_price, notes, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [client_name || 'Client', client_email || 'client@example.com', project_type || 'Commercial', scope || 'Remote', addons || [], total_price || 0, notes || '', 'estimated']
    );
    res.status(201).json({ success: true, message: 'Estimate submitted successfully!', data: result.rows[0] });
  } catch (error) {
    console.error('Error creating estimate request:', error);
    res.status(500).json({ success: false, message: 'Error submitting estimate' });
  }
};
