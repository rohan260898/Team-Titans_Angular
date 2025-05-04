const request = require("request");

const apiOptions = {
  server: "http://localhost:3000",
};

const _renderContactPage = function (req, res) {
  res.render("contact", {
    title: "Contact Us",
  });
};

const showContactPage = function (req, res) {
  _renderContactPage(req, res);
};

//Controller : submitContactForm
const submitContactForm = function (req, res) {
  const path = "/api/contact";
  const postdata = {
    name: req.body.name,
    message: req.body.message,
  };
  const requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: postdata,
  };
  request(requestOptions, (err, response, body) => {
    if (response.statusCode === 201) {
      res.redirect("/thankyou");
    } else {
      _showError(req, res, response.statusCode);
    }
  });
};

const showThankYouPage = function (req, res) {
  res.render("thankyou", {
    title: "Thank You",
  });
};

module.exports = {
  showContactPage,
  submitContactForm,
  showThankYouPage,
};
