const express = require('express');
const router = express.Router();
// Controllers
const employees = require('../controllers/employees');

router.get('/list-employees', employees.getDataEmployees);

module.exports = router;
