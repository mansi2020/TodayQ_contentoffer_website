const express = require("express");
const { getContent, addContent } = require("../controllers/contentController");
let router = express.Router();

router.post("/add", addContent);
router.get("/get", getContent);
module.exports = router;
