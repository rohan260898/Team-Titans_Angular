const request = require("request");

const apiOptions = {
  server: "http://localhost:3000",
};

const _renderHomepage = function (req, res, responseBody) {
  res.render("carlist", {
    cars: responseBody,
    title: "List of Cars",
  });
};

const carlists = function (req, res) {
  const path = "/api/cars";
  const requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
  };
  request(requestOptions, (err, response, body) => {
    _renderHomepage(req, res, body);
  });
};

const _renderDetailPage = function (req, res, responseBody) {
  res.render("cardetails", {
    currentCar: responseBody,
  });
};

//Controller : carInfo
const carInfo = function (req, res) {
  const path = `/api/cars/${req.params.carid}`;
  const requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
  };
  request(requestOptions, (err, response, body) => {
    _renderDetailPage(req, res, body);
  });
};

const _renderCreatePage = function (req, res) {
  res.render("createcar", {
    title: "Create New Car",
  });
};

const addNewCar = function (req, res) {
  _renderCreatePage(req, res);
};

//Controller : doAddNewCar
const doAddNewCar = function (req, res) {
  const path = "/api/cars/";
  const postdata = {
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    price: req.body.price,
    image: req.body.image,
  };
  const requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: postdata,
  };
  request(requestOptions, (err, response, body) => {
    if (response.statusCode === 201) {
      res.redirect("/carlist");
    } else {
      _showError(req, res, response.statusCode);
    }
  });
};

const _renderUpdatePage = function (req, res, responseBody) {
  res.render("updatecar", {
    currentCar: responseBody,
    title: "Update Car",
  });
};

//Controller : updateCar
const updateCar = function (req, res) {
  const path = `/api/cars/${req.params.carid}`;
  const requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
  };
  request(requestOptions, (err, response, body) => {
    _renderUpdatePage(req, res, body);
  });
};

//Controller : doUpdateNewCar
const doUpdateNewCar = function (req, res) {
  const path = `/api/cars/${req.params.carid}`;
  const postdata = {
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    price: req.body.price,
    image: req.body.image,
  };
  const requestOptions = {
    url: apiOptions.server + path,
    method: "PUT",
    json: postdata,
  };
  request(requestOptions, (err, response, body) => {
    res.redirect("/carlist");
  });
};

const deleteCar = function (req, res) {
  const path = `/api/cars/${req.params.carid}`;
  const requestOptions = {
    url: apiOptions.server + path,
    method: "DELETE",
    json: {},
  };
  request(requestOptions, (err, response, body) => {
    if (response.statusCode === 204) {
      res.redirect("/carlist");
    } else {
      _showError(req, res, response.statusCode);
    }
  });
};

const index = function (req, res) {
  res.render("index", { title: "Car Catalogue" });
};

module.exports = {
  carlists,
  carInfo,
  addNewCar,
  doAddNewCar,
  updateCar,
  doUpdateNewCar,
  deleteCar,
  index,
};
