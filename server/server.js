//import modules
const express = require("express");
var cors = require("cors");
const next = require("next");
require("dotenv").config();
const bodyParser = require("body-parser");
const callOutlook = require("../routes/outlook");
const apiRoutes = require("../routes/api");
const cron = require("node-cron");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

//prepare custom server

app.prepare().then(() => {
  const server = express();

  //cron.schedule("0 0 * * *", function () {
    callOutlook();
  //});

  server.use(cors());
  server.use(express.json());

  server.use(bodyParser.json());
  server.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  //GET
  server.get("/", (req, res) => {
    return app.render(req, res, "/newMeeting", req.query);
  });
  server.use("/api", apiRoutes);

  server.get("*", (req, res) => {
    handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server listening on ${port}`);
  });
});
