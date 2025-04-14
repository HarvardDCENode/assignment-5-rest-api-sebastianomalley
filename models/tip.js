const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      category: { type: String, required: true },
      author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'FamilyMember' 
      }, // If not provided, the tip can be anonymous.
      content: { type: String, required: true }
    },
    {
      // Add createdAt and updatedAt fields.
      timestamps: true
    }
  );
  
  module.exports = mongoose.model('Tip', tipSchema);
  
