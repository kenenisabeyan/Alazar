import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|svg|mp4|mov|webm|pdf/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) return cb(null, true);
  cb(new Error('Only image, video, and PDF files are allowed'));
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760') }
});

/**
 * POST /api/media/upload — admin only
 * Accepts a single file field named "file"
 */
export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

  res.status(201).json({
    success: true,
    data: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: fileUrl,
      size: req.file.size,
      mimetype: req.file.mimetype,
    }
  });
};

/**
 * GET /api/media — admin only, lists all uploaded files
 */
export const listFiles = (req, res) => {
  try {
    const files = fs.readdirSync(uploadsDir).map(filename => {
      const stat = fs.statSync(path.join(uploadsDir, filename));
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      return {
        filename,
        url: `${baseUrl}/uploads/${filename}`,
        size: stat.size,
        uploadedAt: stat.mtime.toISOString(),
      };
    }).sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

    res.json({ success: true, count: files.length, data: files });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error reading media library', error: err.message });
  }
};

/**
 * DELETE /api/media/:filename — admin only
 */
export const deleteFile = (req, res) => {
  try {
    const filePath = path.join(uploadsDir, req.params.filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    fs.unlinkSync(filePath);
    res.json({ success: true, message: 'File deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting file', error: err.message });
  }
};
