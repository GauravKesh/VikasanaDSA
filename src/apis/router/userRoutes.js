const express = require("express");
const router = express.Router();
const { userCont } = require("../controllers/userController");

router.post("/user", userCont);


module.exports  = router;