const res = require("express/lib/response");
const { status } = require("express/lib/response");
const mongoose = require("mongoose");
const Contact = mongoose.model("Contact");

const createContact = (req, res) => {
  const { name, email, message } = req.body;
  const newContact = new Contact({ name, email, message });
  newContact.save((err, contact) => {
    if (err) {
      res.status(400).json({ message: "Failed to create contact", error: err });
    } else {
      res.status(201).json(contact);
    }
  });
};

const getContacts = (req, res) => {
  Contact.find()
    .sort("-created_at")
    .exec((err, contacts) => {
      if (err) {
        res.status(400).json({ message: "Failed to get contacts", error: err });
      } else {
        res.status(200).json(contacts);
      }
    });
};

module.exports = {
  createContact,
  getContacts,
};
