const express = require('express');
const router = express.Router();

const userRoute = require('./user/_updatedRoutes');

//Api`s
router.use('/user', userRoute);


module.exports = router;