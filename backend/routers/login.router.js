const express = require('express');
const router = express.Router();
const Login = require('../models/login.model'); 

router.post('/login', async (req, res) => {
  // ... login logic using the Login model ...
});

module.exports = router;
