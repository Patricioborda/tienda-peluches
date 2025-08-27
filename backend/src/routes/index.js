const express = require('express');
const router = express.Router();
const pelucheRoutes = require('../modules/Peluches/routes/pelucheRoutes');

router.use('/peluches', pelucheRoutes);

module.exports = router;
