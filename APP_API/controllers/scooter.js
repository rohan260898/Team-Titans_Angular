const res = require("express/lib/response");
const { status } = require("express/lib/response");
const mongoose = require("mongoose");
const Scooter = mongoose.model("Scooter");

const getScooters = (req, res) => {
  Scooter.find().exec(function (err, scooterdata) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    res.status(200).json(scooterdata);
  });
};

const getSingleScooter = (req, res) => {
  Scooter.findById(req.params.scooterid).exec(function (err, scooterdata) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    res.status(200).json(scooterdata);
  });
};

const createScooter = (req, res) => {
  Scooter.create(
    {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      price: req.body.price,
      image: req.body.image,
    },
    (err, scooterdata) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(scooterdata);
      }
    }
  );
};

const updateScooter = (req, res) => {
  if (!req.params.scooterid) {
    res.status(404).json({ message: "No Found, scooterid is required" });
    return;
  }
  Scooter.findById(req.params.scooterid).exec((err, scooterdata) => {
    if (!scooterdata) {
      res.status(404).json({
        message: "scooterid not found",
      });
      return;
    } else if (err) {
      res.status(400).json(err);
      return;
    }
    scooterdata.make = req.body.make;
    scooterdata.model = req.body.model;
    scooterdata.year = req.body.year;
    scooterdata.color = req.body.color;
    scooterdata.price = req.body.price;
    scooterdata.image = req.body.image;

    scooterdata.save((err, scooterdata) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(scooterdata);
      }
    });
  });
};

const deleteScooter = (req, res) => {
  const scooterid = req.params.scooterid;

  if (scooterid) {
    Scooter.findByIdAndRemove(scooterid).exec((err, scooterdata) => {
      if (err) {
        res.status(404).json(err);
        return;
      }
      res.status(204).json(null);
    });
  } else {
    res.status(404).json({ message: "No scooterid" });
  }
};

module.exports = {
  getScooters,
  createScooter,
  getSingleScooter,
  updateScooter,
  deleteScooter,
};
