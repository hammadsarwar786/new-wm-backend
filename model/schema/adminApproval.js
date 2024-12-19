const mongoose = require("mongoose");

const adminApproval = new mongoose.Schema({
  leadName: {
    type: String,
  },
  leadId: {
    type: String,
  },
  agentName: {
    type: String,
  },
  agentId: {
    type: String,
  },
  mangerName: {
    type: String,
  },
  managerId: {
    type: String,
  },
  approvalStatus: {
    type: String,
  },
  leadPhoneNumber: {
    type: String,
  },
  leadEmail: {
    type: String,
  },
  nationality: {
    type: String,
  },
  interest: {
    type: String,
  },
  leadStatus: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AdminApproval", adminApproval);
