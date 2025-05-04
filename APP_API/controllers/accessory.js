const res = require("express/lib/response");
const { status } = require("express/lib/response");
const mongoose = require("mongoose");
const Accessory = mongoose.model("Accessory");

const getAccessories = (req, res) => {
  Accessory.find().exec(function (err, accessorydata) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    res.status(200).json(accessorydata);
  });
};

const getSingleAccessory = (req, res) => {
  Accessory.findById(req.params.accessoryid).exec(function (err, accessorydata) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    res.status(200).json(accessorydata);
  });
};

const createAccessory = (req, res) => {
  Accessory.create(
    {
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      image: req.body.image,
    },
    (err, accessorydata) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(accessorydata);
      }
    }
  );
};

const updateAccessory = (req, res) => {
  if (!req.params.accessoryid) {
    res.status(404).json({ message: "No Found, accessoryid is required" });
    return;
  }
  Accessory.findById(req.params.accessoryid).exec((err, accessorydata) => {
    if (!accessorydata) {
      res.status(404).json({
        message: "accessoryid not found",
      });
      return;
    } else if (err) {
      res.status(400).json(err);
      return;
    }
    accessorydata.name = req.body.name;
    accessorydata.type = req.body.type;
    accessorydata.price = req.body.price;
    accessorydata.image = req.body.image;

    accessorydata.save((err, accessorydata) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(accessorydata);
      }
    });
  });
};

const deleteAccessory = (req, res) => {
  const accessoryid = req.params.accessoryid;

  if (accessoryid) {
    Accessory.findByIdAndRemove(accessoryid).exec((err, accessorydata) => {
      if (err) {
        res.status(404).json(err);
        return;
      }
      res.status(204).json(null);
    });
  } else {
    res.status(404).json({ message: "No accessoryid" });
  }
};

module.exports = {
  getAccessories,
  createAccessory,
  getSingleAccessory,
  updateAccessory,
  deleteAccessory,
};
