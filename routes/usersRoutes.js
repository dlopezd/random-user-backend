const express = require('express');

const usersController = require('../controllers/usersController');
const { firebaseToken } = require('../middlewares/firebaseToken');


const router = express.Router();

router.get('/', firebaseToken, usersController.get);

module.exports = router;
