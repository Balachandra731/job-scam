const Report = require('../models/Report');

// @route   POST /api/reports
// @desc    Create a new scam report
// @access  Private
exports.createReport = async (req, res) => {
  try {
    const { companyName, jobTitle, description, redFlags, evidenceLink } = req.body;

    // Validation
    if (!companyName || !jobTitle || !description) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide company name, job title, and description' 
      });
    }

    if (description.length < 20) {
      return res.status(400).json({ 
        success: false, 
        message: 'Description must be at least 20 characters' 
      });
    }

    // Check if report for this company already exists
    const existingReport = await Report.findOne({ 
      companyName: { $regex: companyName, $options: 'i' },
      status: 'verified'
    });

    if (existingReport) {
      // Increment scam count if verified report exists
      existingReport.scamCount += 1;
      await existingReport.save();
      
      return res.status(200).json({
        success: true,
        message: 'Similar scam report already verified. Count incremented.',
        report: existingReport
      });
    }

    // Create new report
    const report = new Report({
      companyName,
      jobTitle,
      description,
      redFlags: redFlags || [],
      evidenceLink: evidenceLink || '',
      reportedBy: req.user.id
    });

    await report.save();
    await report.populate('reportedBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Report submitted successfully. Admin will verify soon.',
      report
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/reports
// @desc    Get all verified reports
// @access  Public
exports.getAllReports = async (req, res) => {
  try {
    const { company } = req.query;
    let query = { status: 'verified' };

    if (company) {
      query.companyName = { $regex: company, $options: 'i' };
    }

    const reports = await Report.find(query)
      .populate('reportedBy', 'name email')
      .populate('verifiedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      reports
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/reports/:id
// @desc    Get a specific report
// @access  Public
exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('reportedBy', 'name email')
      .populate('verifiedBy', 'name email');

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    res.status(200).json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/reports/user/my-reports
// @desc    Get reports submitted by current user
// @access  Private
exports.getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ reportedBy: req.user.id })
      .populate('verifiedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      reports
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   PUT /api/reports/:id/verify
// @desc    Verify a report (Admin only)
// @access  Private/Admin
exports.verifyReport = async (req, res) => {
  try {
    const { verificationNotes } = req.body;

    let report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    report.status = 'verified';
    report.verifiedBy = req.user.id;
    report.verificationNotes = verificationNotes || '';

    await report.save();
    await report.populate('reportedBy', 'name email');
    await report.populate('verifiedBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Report verified successfully',
      report
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   PUT /api/reports/:id/reject
// @desc    Reject a report (Admin only)
// @access  Private/Admin
exports.rejectReport = async (req, res) => {
  try {
    const { verificationNotes } = req.body;

    let report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    report.status = 'rejected';
    report.verifiedBy = req.user.id;
    report.verificationNotes = verificationNotes || '';

    await report.save();

    res.status(200).json({
      success: true,
      message: 'Report rejected',
      report
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/reports/admin/pending
// @desc    Get pending reports for admin verification
// @access  Private/Admin
exports.getPendingReports = async (req, res) => {
  try {
    const reports = await Report.find({ status: 'pending' })
      .populate('reportedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      reports
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/reports/search
// @desc    Search company scams
// @access  Public
exports.searchCompany = async (req, res) => {
  try {
    const { company } = req.query;

    if (!company) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide company name' 
      });
    }

    const reports = await Report.find({
      companyName: { $regex: company, $options: 'i' },
      status: 'verified'
    })
      .populate('reportedBy', 'name email')
      .populate('verifiedBy', 'name email')
      .sort({ scamCount: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      reports,
      message: reports.length === 0 ? 'No scam reports found for this company' : undefined
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
