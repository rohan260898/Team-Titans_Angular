var express = require('express');
var router = express.Router();

const ctrlCar = require('../controllers/car');

router.get('/cars', ctrlCar.getCars);
router.post('/cars', ctrlCar.createCar);

router.get('/cars/:carid', ctrlCar.getSingleCar);
router.put('/cars/:carid', ctrlCar.updateCar);
router.delete('/cars/:carid', ctrlCar.deleteCar);

module.exports = router;
