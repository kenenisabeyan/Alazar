import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/**
 * POST /api/auth/login
 * Validates admin credentials from env vars and returns a JWT.
 */
export const login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@alazar.studio';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Alazar@2025!';

    if (email.toLowerCase() !== adminEmail.toLowerCase() || password !== adminPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: adminEmail, role: 'admin' },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: { email: adminEmail, role: 'admin', name: 'Alazar Asdesach' }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

/**
 * GET /api/auth/me
 * Returns the currently authenticated admin's profile.
 */
export const me = (req, res) => {
  res.json({
    success: true,
    admin: {
      email: req.admin.email,
      role: req.admin.role,
      name: 'Alazar Asdesach'
    }
  });
};
