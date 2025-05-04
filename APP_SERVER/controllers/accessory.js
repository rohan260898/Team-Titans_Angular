const request = require("request");

const apiOptions = {
  server: "http://localhost:3000",
};

const _renderHomepage = function (req, res, responseBody) {
  res.render("accessorylist", {
    accessories: responseBody,
    title: "List of Accessories",
  });
};

const accessorylists = function (req, res) {
  const path = "/api/accessories";
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
  res.render("accessorydetails", {
    currentAccessory: responseBody,
  });
};

//Controller : accessoryInfo
const accessoryInfo = function (req, res) {
  const path = `/api/accessories/${req.params.accessoryid}`;
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
  res.render("createaccessory", {
    title: "Create New Accessory",
  });
};

const addNewAccessory = function (req, res) {
  _renderCreatePage(req, res);
};

//Controller : doAddNewAccessory
const doAddNewAccessory = function (req, res) {
  const path = "/api/accessories/";
  const postdata = {
    name: req.body.name,
    type: req.body.type,
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
      res.redirect("/accessorylist");
    } else {
      _showError(req, res, response.statusCode);
    }
  });
};

const _renderUpdatePage = function (req, res, responseBody) {
  res.render("updateaccessory", {
    currentAccessory: responseBody,
    title: "Update Accessory",
  });
};

//Controller : updateAccessory
const updateAccessory = function (req, res) {
  const path = `/api/accessories/${req.params.accessoryid}`;
  const requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
  };
  request(requestOptions, (err, response, body) => {
    _renderUpdatePage(req, res, body);
  });
};

//Controller : doUpdateNewAccessory
const doUpdateNewAccessory = function (req, res) {
  const path = `/api/accessories/${req.params.accessoryid}`;
  const postdata = {
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    image: req.body.image,
  };
  const requestOptions = {
    url: apiOptions.server + path,
    method: "PUT",
    json: postdata,
  };
  request(requestOptions, (err, response, body) => {
    res.redirect("/accessorylist");
  });
};

//Controller : deleteAccessory
const deleteAccessory = function (req, res) {
  const path = "/api/accessories/${req.params.accessoryid}";
  const requestOptions = {
    url: apiOptions.server + path,
    method: "DELETE",
    json: {},
  };
  request(requestOptions, (err, response, body) => {
    if (response.statusCode === 204) {
      res.redirect("/accessorylist");
    } else {
      _showError(req, res, response.statusCode);
    }
  });
};

const index = function (req, res) {
  res.render("index", { title: "Accessory Catalogue" });
};

module.exports = {
  accessorylists,
  accessoryInfo,
  addNewAccessory,
  doAddNewAccessory,
  updateAccessory,
  doUpdateNewAccessory,
  deleteAccessory,
  index,
};
