const express = require('express');
const coinsRequest = require('./coinsRequest');
const auth = require('../../middelwares/auth');

const router = express.Router();

router.post('/add',auth, coinsRequest.add);
router.get('/get',auth, coinsRequest.get);
router.put('/update',auth, coinsRequest.responseFromAdmin);
router.put("/notes",auth,coinsRequest.coinNotes)


module.exports = router  