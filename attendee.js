const mongoose = require('mongoose');

const AttendeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const Attendee = mongoose.model('Attendee', AttendeeSchema);

module.exports = Attendee;
