const UsersService = require('../services/users.service');
require('dotenv').config();
const jwt = require('jsonwebtoken');

class UsersController {
    
  
    createAccountPage = (req, res, next) => {
      return res.send('This is Create Account Page');
    };

}

module.exports = UsersController;

