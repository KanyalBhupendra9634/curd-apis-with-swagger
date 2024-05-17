const express = require('express');
const { getData, createData, updateData } = require('../controller/exploredData.controller');
const router = express.Router();


router.get('/', getData);
router.post('/createData',createData)
router.post('/updateData',updateData)

module.exports = router;
