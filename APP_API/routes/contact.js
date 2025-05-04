var express = require("express");
var router = express.Router();

const ctrlContact = require("../controllers/contact");

router.post("/contact", ctrlContact.createContact);
router.get("/contact", ctrlContact.getContacts);
module.exports = router;
