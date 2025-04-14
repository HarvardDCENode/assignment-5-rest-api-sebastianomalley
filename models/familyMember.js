// Import the Mongoose library to work with MongoDB.
const mongoose = require('mongoose');

// Define the schema for a Family Member.
const familyMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthYear: Number,
  photoUrl: String,
  notes: String,
}, {
  // Include createdAt and updatedAt timestamps.
  timestamps: true
});

module.exports = mongoose.model('FamilyMember', familyMemberSchema);
