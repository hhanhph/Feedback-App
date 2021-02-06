const axios = require("axios");
const qs = require("qs");
const Feedback = require("../models/Meeting");
// MongoDB
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("Connected to MongoDB");
});
module.exports = {
  getMeetingID: async (req, res) => {
    try {
      const meetings = await db
        .collection("meetings")
        .find({ meetingID: req.params.id })
        .toArray();
      const meeting = meetings[0];
      console.log(meeting);
      res.status(200);
      res.json(meeting);
    } catch (e) {
      console.log({ e });
      res.status(500);
      res.json({ error: `Unable to fetch meeting ${req.params.id}` });
    }
  },
  getEvaluationID: async (req, res) => {
    try {
      const feedback = await Feedback.findById(req.params.id);
      console.log(feedback);
      res.status(200);
      res.json({ feedback });
    } catch (e) {
      console.log(e);
      res.status(500);
      res.json({ error: `Unable to fetch meeting ${req.params.id}` });
    }
  },
  getMeetings: async (req, res) => {
    try {
      //try to find all meetings in database
      const meetings = await db.collection("meetings").find().toArray();
      //console.log(meetings[0].participations[0].emoticon);
      res.status(200);
      res.json({ meetings });
    } catch (e) {
      console.log(e);
      res.status(500);
      res.json({ error: "Unable to fetch meeting" });
    }
  },
  postFeedback: async (req, res) => {
    try {
      res.status(200);
      res.json(req.body);

      var finished = req.body.finished;
      const {
        meetingid,
        name,
        emoticon,
        attendance,
        preparation,
        comment,
      } = req.body;

      if (finished) {
        console.log(req.body);

        // pull out meeting of database
        const meeting = await db
          .collection("meetings")
          .find({ meetingID: meetingid })
          .toArray();

        var feedback;
        // if meeting does not exist
        if (meeting[0] == null) {
          // create new meeting

          // get token
          const TOKEN_ENDPOINT =
            "https://login.microsoftonline.com/1270dbb7-7731-44cb-8738-0969d20e2df4/oauth2/v2.0/token";
          const postData = {
            client_id: process.env.OAUTH_APP_ID,
            scope: "https://graph.microsoft.com/.default",
            client_secret: process.env.OAUTH_APP_SECRET,
            grant_type: "client_credentials",
          };

          axios.defaults.headers.post["Content-Type"] =
            "application/x-www-form-urlencoded";

          let token = "";

          const auth = await axios.post(TOKEN_ENDPOINT, qs.stringify(postData));
          token = auth.data.access_token;

          // Fetch name and date of meeting from outlook
          const outlookMeeting = await axios.get(
            "https://graph.microsoft.com/v1.0/users/hanh.phan@brandung.de/calendar/events/" +
              meetingid,
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-type": "application/json",
                ConsistencyLevel: "eventual",
              },
            }
          );
          const meetingname = outlookMeeting.data.subject;
          const meetingdate = outlookMeeting.data.start.dateTime;

          feedback = new Feedback({
            meetingID: meetingid,
            meetingName: meetingname,
            meetingDate: meetingdate,
          });
          feedback.participations.push({
            name: name,
            emoticon: emoticon,
            attendance: attendance,
            preparation: preparation,
            comment: comment,
          });
          console.log("New meeting was created");
        } else {
          // if meeting does already exist
          feedback = await Feedback.findById(meeting);
          feedback.participations.push({
            name: name,
            emoticon: emoticon,
            attendance: attendance,
            preparation: preparation,
            comment: comment,
          });
        }

        // create new participation
        console.log("new participation!");

        // push to MongoDB
        feedback.save(function (err, newFeedback) {
          if (err) return console.error(err);
          console.log(newFeedback);
          console.log("Feedback was saved to database!");
        });

        finished = false; // set back to false
      }
    } catch (e) {
      console.log(e);
      res.status(500);
      res.json({ error: "Unable to post feedback" });
    }
  },
};
