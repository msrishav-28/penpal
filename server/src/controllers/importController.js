import {
  importGoodreadsData,
  getImportTemplate
} from '../services/csvImportService.js';
import multer from 'multer';

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'));
    }
  }
});

/**
 * Import Goodreads CSV
 * POST /api/import/goodreads
 */
export const importGoodreads = [
  upload.single('file'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'CSV file is required' });
      }

      const results = await importGoodreadsData(req.user.id, req.file.buffer);

      res.json({
        message: 'Import completed',
        ...results
      });
    } catch (error) {
      console.error('Import Goodreads error:', error);
      res.status(500).json({ message: error.message });
    }
  }
];

/**
 * Get import template
 * GET /api/import/template
 */
export const getTemplate = async (req, res) => {
  try {
    const template = getImportTemplate();
    res.json(template);
  } catch (error) {
    console.error('Get template error:', error);
    res.status(500).json({ message: 'Failed to get import template' });
  }
};

export default {
  importGoodreads,
  getTemplate
};
