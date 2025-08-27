const express = require('express');
const router = express.Router();
const controller = require('../controllers/pelucheController');

router.get('/', controller.getPeluches);
router.get('/:id', controller.getPeluche);
router.post('/', controller.createPeluche);
router.put('/:id', controller.updatePeluche);
router.delete('/:id', controller.deletePeluche);

module.exports = router;
