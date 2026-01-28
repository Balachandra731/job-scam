const express = require('express');
const {
  createReport,
  getAllReports,
  getReportById,
  getMyReports,
  verifyReport,
  rejectReport,
  getPendingReports,
  searchCompany
} = require('../controllers/reportController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllReports);
router.get('/search', searchCompany);
router.get('/:id', getReportById);

// Private routes
router.post('/', auth, createReport);
router.get('/user/my-reports', auth, getMyReports);

// Admin routes
router.get('/admin/pending', auth, adminAuth, getPendingReports);
router.put('/:id/verify', auth, adminAuth, verifyReport);
router.put('/:id/reject', auth, adminAuth, rejectReport);

module.exports = router;
