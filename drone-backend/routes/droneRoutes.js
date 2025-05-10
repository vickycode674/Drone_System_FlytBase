const express = require('express');
const router = express.Router();
const droneController = require('../controllers/droneController');

router.get('/', droneController.getAllDrones);
router.post('/', droneController.createDrone);
router.put('/:id', droneController.updateDrone);
router.delete('/:id', droneController.deleteDrone);

module.exports = router;
