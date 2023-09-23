const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Users", userSchema);

// admin: 0
// normalUser: 1
