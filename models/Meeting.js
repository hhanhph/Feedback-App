const mongoose = require("mongoose");
const participationSchema = require("./Participation")

const meetingSchema = new mongoose.Schema({
  meetingName: String,
  meetingDate: Date,
  meetingID: String,
  participations: [ participationSchema ],

});

module.exports = mongoose.model("meetings", meetingSchema);

