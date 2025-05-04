var express = require('express');
var router = express.Router();

const ctrlScooter = require('../controllers/Scooter');

router.get('/scooters', ctrlScooter.getScooters);
router.post('/scooters', ctrlScooter.createScooter);

router.get('/scooters/:scooterid', ctrlScooter.getSingleScooter);
router.put('/scooters/:scooterid', ctrlScooter.updateScooter);
router.delete('/scooters/:scooterid', ctrlScooter.deleteScooter);

module.exports = router;
