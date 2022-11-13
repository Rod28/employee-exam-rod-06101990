const express = require('express');
const router = express.Router();
// Controllers
const employees = require('../controllers/employees');

router.get('/list-employees', employees.getDataEmployees);
router.post('/create-employees', employees.createNewEmployees);

module.exports = router;
