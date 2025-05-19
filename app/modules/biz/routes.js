const express = require('express');
const router = express.Router();
const { searchByLocation, searchByGeoCoordinates, getBizByName } = require('./controller');

router.get('/category/location', searchByLocation);
router.get('/category/:latitude/:longitude', searchByGeoCoordinates);
router.get('/:bizName', getBizByName);

module.exports = router;
