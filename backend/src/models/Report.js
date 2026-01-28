const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Please provide company name'],
    trim: true
  },
  jobTitle: {
    type: String,
    required: [true, 'Please provide job title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide description of the scam'],
    minlength: [20, 'Description must be at least 20 characters']
  },
  redFlags: [{
    type: String,
    enum: [
      'No interview process',
      'Unrealistic salary',
      'Upfront payment required',
      'Poor communication',
      'Fake job posting',
      'Identity theft attempts',
      'Spelling/grammar errors',
      'Unknown company'
    ]
  }],
  evidenceLink: {
    type: String,
    trim: true
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verificationNotes: {
    type: String
  },
  scamCount: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);
