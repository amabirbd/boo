'use strict';

const express = require('express');
const Profile = require('../models/profileModel')

const {
  createProfile,
  renderFirstProfile,
  getProfileById
} = require("../controllers/profileController")

const router = express.Router();

module.exports = function() {

  router.get('/', renderFirstProfile);

  router.post('/profiles', createProfile);

  router.get('/profiles/:id', getProfileById);

  return router;
}

