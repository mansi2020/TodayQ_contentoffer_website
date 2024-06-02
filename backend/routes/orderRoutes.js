const express = require("express");
const { getOrder, addOrder } = require("../controllers/orderController");
let router = express.Router();

router.post("/add", addOrder);
router.get("/get", getOrder);
module.exports = router;
