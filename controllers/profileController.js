'use strict';

const express = require('express');
const Profile = require('../models/profileModel');

const router = express.Router();

const mockProfiles = [
  {
    "id": 1,
    "name": "A Martinez",
    "description": "Adolph Larrue Martinez III.",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://soulverse.boo.world/images/1.png",
  }
];

// Get all profiles and render a single profile
const renderFirstProfile = async (req, res) => {
    try {
        let profiles = await Profile.find();

        // res.render() gives an error when there is no profiles. so, a little hack.
        let finaleProfile = profiles.length === 0 ? mockProfiles : profiles
        res.render('profile_template', {
        profile: finaleProfile[0],
    });
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ error: 'Failed to fetch profiles' });
    }
};

// Create a profile
const createProfile = async (req, res) => {
    try {
        const profileData = req.body;
        const profile = new Profile(profileData);
        await profile.save();
        res.status(201).json({ message: 'Profile created successfully', profile });
      } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ error: 'Failed to create profile' });
      }
};

// Get a profile by ID
const getProfileById = async (req, res) => {
    try {
        const profileId = req.params.id;
    
        const profile = await Profile.findById(profileId);
    
        if (!profile) {
          return res.status(404).json({ error: 'Profile not found' });
        }
    
        res.status(200).json({ profile });
      } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
      }
};

module.exports = {
    renderFirstProfile,
    createProfile,
    getProfileById
};
