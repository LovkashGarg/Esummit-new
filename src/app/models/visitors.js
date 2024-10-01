const mongoose = require('mongoose');

const visitorCountSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
    default: 1, // Start with 0 visitors by default
  },
});

const VisitorCount = mongoose.model('VisitorCount', visitorCountSchema);

module.exports = VisitorCount;