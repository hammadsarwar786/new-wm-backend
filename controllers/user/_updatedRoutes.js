const express = require('express');
const user = require('./updatedUser');
const auth = require('../../middelwares/auth');

const router = express.Router();

router.get('/tree', auth, user.getTree); 




module.exports = router
