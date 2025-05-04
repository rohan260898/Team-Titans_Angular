var express = require('express');
var router = express.Router();

const ctrlBike = require('../controllers/bike');

router.get('/bikes', ctrlBike.getBikes);
router.post('/bikes', ctrlBike.createBike);

router.get('/bikes/:bikeid', ctrlBike.getSingleBike);
router.put('/bikes/:bikeid', ctrlBike.updateBike);
router.delete('/bikes/:bikeid', ctrlBike.deleteBike);


module.exports = router;