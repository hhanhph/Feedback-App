const router = require("express").Router(),
apiController = require("../controllers/api");
router.get("/meetings", apiController.getMeetings);
router.get("/meeting/:id", apiController.getMeetingID);
router.get("/evaluation/:id", apiController.getEvaluationID);
router.post("/feedback", apiController.postFeedback);
module.exports = router;
