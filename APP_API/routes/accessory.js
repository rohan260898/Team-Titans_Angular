var express = require('express');
var router = express.Router();

const ctrlAccessory = require('../controllers/accessory');

router.get('/accessories', ctrlAccessory.getAccessories);
router.post('/accessories', ctrlAccessory.createAccessory);

router.get('/accessories/:accessoryid', ctrlAccessory.getSingleAccessory);
router.put('/accessories/:accessoryid', ctrlAccessory.updateAccessory);
router.delete('/accessories/:accessoryid', ctrlAccessory.deleteAccessory);

module.exports = router;
