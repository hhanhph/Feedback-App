const mongoose = require("mongoose");

const participationSchema = new mongoose.Schema({

    name: String,
    emoticon: String,
    attendance: String,
    preparation: Number,
    comment: String,
  
  });

  module.exports = participationSchema;
