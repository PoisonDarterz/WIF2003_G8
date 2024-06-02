const express = require('express');
const router = express.Router();
const Role = require('../models/role.model');

// Route to get all roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
 
  module.exports = router;