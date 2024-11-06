const mongoose = require('mongoose');

// Define the classescollection schema
const classesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructorName: {
    type: String,
    required: true,
  },
  instructorEmail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['approved', 'pending', 'rejected'], // Assuming these are the possible statuses
    required: true,
  },
  submitted: {
    type: Date,
    required: true,
  },
  totalEnrolled: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    default: null,
  },
});

// Create the Classescollection model
const Classe = mongoose.model('Classe', classesSchema);

module.exports = Classe;