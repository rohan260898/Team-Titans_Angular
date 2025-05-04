const request = require('request');

const apiOptions = {
  server: 'http://localhost:3000'
};

const _renderHomepage = function (req, res, responseBody) {

  res.render('scooterlist', {
    cars: responseBody,
    title: 'List of Scooters'
  });
};

const scooterlists = function (req, res) {
  const path = '/api/scooters';
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      _renderHomepage(req, res, body);
    }
  );
};


const _renderDetailPage = function (req, res, responseBody) {
  res.render('details', {
    currentScooter: responseBody
  });
};
//Controller : scooterInfo
const scooterInfo = function (req, res) {
  const path = `/api/scooters/${req.params.scooterid}`;
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions, (err, response, body) => {
      _renderDetailPage(req, res, body);
    }
  );
};



const _renderCreatePage = function (req, res) {
  res.render('create', {
    title: "Create New Scooter"
  });
}
const addNewScooter = function (req, res) {
  _renderCreatePage(req, res);
};

//Controller : doAddNewScooter
const doAddNewScooter = function (req, res) {
  const path = '/api/scooters/';
  const postdata = {
    name: req.body.name,
    description: req.body.description,
    model: req.body.model,
    seats: req.body.seats,
    launchYear: req.body.launchYear,
    image: req.body.image,
    color: req.body.color,

    price: req.body.price,
    brand: req.body.brand,
    rating: parseInt(req.body.rating, 10),
  };
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    json: postdata
  };
  request(
    requestOptions, (err, response, body) => {
      if (response.statusCode === 201) {
        res.redirect('/list');
      } else
        _showError(req, res, response.statusCode);
    }
  );
}



const _renderUpdatePage = function (req, res, responseBody) {
  res.render('update', {
    currentScooter: responseBody,
    title: "Update Book"
  });
};

//Controller : updateScooter
const updateScooter = function (req, res) {
  const path = `/api/scooters/${req.params.scooterid}`;
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions, (err, response, body) => {
      _renderUpdatePage(req, res, body);
    }
  );
};
//Controller : doUpdateNewScooter
const doUpdateNewScooter = function (req, res) {
  const path = `/api/scooters/${req.params.scooterid}`;
  const postdata = {
    name: req.body.name,
    description: req.body.description,
    model: req.body.model,
    seats: req.body.seats,
    launchYear: req.body.launchYear,
    image: req.body.image,
    color: req.body.color,
    price: req.body.price,
    brand: req.body.brand,
    image: req.body.image,
    rating: parseInt(req.body.rating, 10),
  };
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'PUT',
    json: postdata
  };
  request(
    requestOptions, (err, response, body) => {
      res.redirect('/list')
    }
  );
}


const deleteScooter = function (req, res) {
  const path = `/api/scooters/${req.params.scooterid}`;
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'DELETE',
    json: {}
  };
  request(
    requestOptions, (err, response, body) => {
      if (response.statusCode === 204) {
        res.redirect("/list");
      }
    });
};


const _renderIndexpage = function (req, res, responseBody) {

  res.render('index', {
    scooters: responseBody
  });
};

//Controller : index
const index = function (req, res) {
  const path = '/api/scooters';
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      _renderIndexpage(req, res, body);
    }
  );
};

module.exports = {
  scooterlists,
  scooterInfo,
  addNewScooter,
  doAddNewScooter,
  updateScooter,
  doUpdateNewScooter,
  deleteScooter,
  index,
}