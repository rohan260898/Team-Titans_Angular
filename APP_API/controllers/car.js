const res = require("express/lib/response");
const { status } = require("express/lib/response");
const mongoose = require("mongoose");
const Car = mongoose.model("Car");

const getCars = (req, res) => {
  Car.find().exec(function (err, cardata) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    res.status(200).json(cardata);
  });
};

const getSingleCar = (req, res) => {
  Car.findById(req.params.carid).exec(function (err, cardata) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    res.status(200).json(cardata);
  });
};

const createCar = (req, res) => {
  Car.create(
    {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      price: req.body.price,
      image: req.body.image,
    },
    (err, cardata) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(cardata);
      }
    }
  );
};

const updateCar = (req, res) => {
  if (!req.params.carid) {
    res.status(404).json({ message: "No Found, carid is required" });
    return;
  }
  Car.findById(req.params.carid).exec((err, cardata) => {
    if (!cardata) {
      res.status(404).json({
        message: "carid not found",
      });
      return;
    } else if (err) {
      res.status(400).json(err);
      return;
    }
    cardata.make = req.body.make;
    cardata.model = req.body.model;
    cardata.year = req.body.year;
    cardata.color = req.body.color;
    cardata.price = req.body.price;
    cardata.image = req.body.image;

    cardata.save((err, cardata) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(cardata);
      }
    });
  });
};

const deleteCar = (req, res) => {
  const carid = req.params.carid;

  if (carid) {
    Car.findByIdAndRemove(carid).exec((err, cardata) => {
      if (err) {
        res.status(404).json(err);
        return;
      }
      res.status(204).json(null);
    });
  } else {
    res.status(404).json({ message: "No carid" });
  }
};

module.exports = {
  getCars,
  createCar,
  getSingleCar,
  updateCar,
  deleteCar,
};
