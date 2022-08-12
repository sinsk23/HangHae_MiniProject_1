const express = require('express');
const Users = require('../controller/users');

const UsersController = new Users();

const router = express.Router();

router
  .route('/')
  .get(UsersController.createAccountPage)





module.exports = router;