const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
  },
  message: {
    type: String,
    required: true,
    minlength: 3,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("Contact", contactSchema);
