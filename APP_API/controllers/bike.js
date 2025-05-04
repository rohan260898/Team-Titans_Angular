const res = require("express/lib/response");
const { status } = require("express/lib/response");
const mongoose = require("mongoose");
const Bike = mongoose.model("Bike");

const getBikes = (req, res) => {
  Bike.find().exec(function (err, bikedata) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    res.status(200).json(bikedata);
  });
};
const getSingleBike = (req, res) => {
  Bike.findById(req.params.bikeid).exec(function (err, bikedata) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    res.status(200).json(bikedata);
  });
};

const createBike = (req, res) => {
  Bike.create(
    {
      name: req.body.name,
      description: req.body.description,
      model: req.body.model,
      seats: req.body.seats,
      launchYear: req.body.launchYear,
      image: req.body.image,
      color: req.body.color,
      price: req.body.price,
      brand: req.body.brand,
    },
    (err, bikedata) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(bikedata);
      }
    }
  );
};

const updateBike = (req, res) => {
  if (!req.params.bikeid) {
    res.status(404).json({ message: "No Found,bikeid is required" });
    return;
  }
  Bike.findById(req.params.bikeid).exec((err, bikedata) => {
    if (!bikedata) {
      res.status(404).json({
        message: "bikeid not found",
      });
      return;
    } else if (err) {
      res.status(400).json(err);
      return;
    }
    bikedata.name = req.body.name;
    bikedata.description = req.body.description;
    bikedata.model = req.body.model;
    bikedata.seats = req.body.seats;
    bikedata.launchYear = req.body.launchYear;
    bikedata.image = req.body.image;
    bikedata.color = req.body.color;
    bikedata.price = req.body.price;
    bikedata.brand = req.body.brand;
    bikedata.save((err, bikedata) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(bikedata);
      }
    });
  });
};
const deleteBike = (req, res) => {
  const bikeid = req.params.bikeid;

  if (bikeid) {
    Bike.findByIdAndRemove(bikeid).exec((err, bikedata) => {
      if (err) {
        res.status(404).json(err);
        return;
      }
      res.status(204).json(null);
    });
  } else {
    res.status(404).json({ message: "No bikeid" });
  }
};
module.exports = {
  getBikes,
  createBike,
  getSingleBike,
  updateBike,
  deleteBike,
};
