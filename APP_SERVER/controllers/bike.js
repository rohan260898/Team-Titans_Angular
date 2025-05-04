const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000'
    };

    const _renderHomepage = function(req, res, responseBody) {

        res.render('bikelist', {
            bikes: responseBody,
            title: 'List of Bikes'
        });
    };

const bikelists = function(req, res){
    const path = '/api/bikes';
    const requestOptions = {
        url : apiOptions.server + path,
        method: 'GET',
        json : {}
    };
    request(
    requestOptions,
    (err, response, body) => {
        _renderHomepage(req, res, body);
    }
    );
};


const _renderDetailPage = function (req,res,responseBody){
    res.render('details',{
      currentBike:responseBody
    });
  };
//Controller : bikeInfo
const bikeInfo = function (req,res){
    const path = `/api/bikes/${req.params.bikeid}`;
    const requestOptions ={
      url:apiOptions.server + path,
      method: 'GET',
      json:{}
    };
    request(
      requestOptions,(err,response, body)=>{
        _renderDetailPage(req, res,body);
      }
    );
  };
  


  const _renderCreatePage = function(req,res){
    res.render('create',{
      title:"Create New Bike"
    });
  }
  const addNewBike = function(req,res){
    _renderCreatePage(req,res);
  };
  
//Controller : doAddNewBike
  const doAddNewBike = function(req,res){
    const path = '/api/bikes/';
    const postdata ={
        name:req.body.name,
        description:req.body.description,
        model:req.body.model,
        seats:req.body.seats,
        launchYear:req.body.launchYear,
        image:req.body.image,
        color:req.body.color,
        
        price:req.body.price,
        brand:req.body.brand,
        rating:parseInt(req.body.rating, 10),
    };
    const requestOptions={
      url:apiOptions.server+path,
      method:'POST',
      json:postdata
    };
    request(
      requestOptions,(err,response,body)=>{
        if (response.statusCode === 201) {
          res.redirect('/list');
      } else
          _showError(req, res, response.statusCode);
      }
  );
}
      


const _renderUpdatePage = function (req,res,responseBody){
    res.render('update',{
      currentBike:responseBody,
      title: "Update Book"
    });
  };
  
  //Controller : updateBike
  const updateBike = function (req,res){
    const path = `/api/bikes/${req.params.bikeid}`;
    const requestOptions ={
      url:apiOptions.server + path,
      method: 'GET',
      json:{}
    };
    request(
      requestOptions,(err,response, body)=>{
        _renderUpdatePage(req, res,body);
      }
    );
  };
  //Controller : doUpdateNewBike
  const doUpdateNewBike = function(req,res){
    const path = `/api/bikes/${req.params.bikeid}`;
    const postdata ={
        name:req.body.name,
        description:req.body.description,
        model:req.body.model,
        seats:req.body.seats,
        launchYear:req.body.launchYear,
        image:req.body.image,
        color:req.body.color,
        price:req.body.price,
        brand:req.body.brand,
        image:req.body.image,
        rating:parseInt(req.body.rating, 10),
    };
    const requestOptions={
      url:apiOptions.server+path,
      method:'PUT',
      json:postdata
    };
    request(
      requestOptions,(err,response,body)=>{
          res.redirect('/list')
      }
    );
  }
  
  
  const deleteBike = function (req,res){
    const path = `/api/bikes/${req.params.bikeid}`;
    const requestOptions ={
      url:apiOptions.server + path,
      method: 'DELETE',
      json:{}
    };
    request(
      requestOptions,(err,response, body)=>{
        if(response.statusCode === 204){
          res.redirect("/list");
      }
    });
  };

  
const _renderIndexpage = function(req, res, responseBody) {

  res.render('index', {
      bikes: responseBody
  });
};

//Controller : index
const index = function(req, res){
const path = '/api/bikes';
const requestOptions = {
  url : apiOptions.server + path,
  method: 'GET',
  json : {}
};
request(
requestOptions,
(err, response, body) => {
  _renderIndexpage(req, res, body);
}
);
};

module.exports = {
    bikelists,
    bikeInfo,
    addNewBike,
    doAddNewBike,
    updateBike,
    doUpdateNewBike,
    deleteBike,
    index,
}