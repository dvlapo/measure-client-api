const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter client name'],
      maxLength: 40,
    },
    measurements: {
      lengthOfDress: Number,
      bust: Number,
      halfLength: Number,
      hips: Number,
      waist: Number,
      underbustLength: Number,
      underbustCircumference: Number,
      shoulder: Number,
      sleeve: Number,
      crotch: Number,
      skirtOrPantLength: Number,
      band: Number,
      bustPoint: Number,
      shoulderToKnee: Number,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Client', ClientSchema);
