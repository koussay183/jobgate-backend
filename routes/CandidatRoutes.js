require('dotenv').config(); // Load environment variables

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const Candidat = require("../modules/Candidat");
const Offre  = require("../modules/Offre");
const Postule = require('../modules/Postule');

// ---------------------------Start-Admin-Login---------------------------------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const c = await Candidat.findOne({ email, password });
    if (c) {
      // Generate JWT token
      const token = jwt.sign({ id: c._id  }, process.env.SECRET_KEY , {expiresIn : "1h"});
      // Set token in cookie
      res.cookie('token', token, { httpOnly: true }); // Set token as HTTP-only for security
      res.json({token : token});
    } else {
      res.status(401).json('Invalid credentials');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/signup',async(req, res) => {
  try {
    const c = new Candidat(req.body);
    await c.save();
    res.status(201).json(c);
  } catch (error) {
    res.status(400).json(error);
  }
})

router.post('/postule/:idC/:idOffre',async(req, res) => {
  try {
    const offre = await Offre.findOne({_id : req.params.idOffre});
    const c = await Candidat.findOne({_id : req.params.idC});
    if(!offre || !c){
      return res.statusCode(401).json("Ids Wrong")
    }
    const postule = new Postule({...req.body , idOffre : req.params.idOffre , idCandidat : req.params.idC})
    await postule.save()
    res.status(201).json(postule);
  } catch (error) {
    res.status(400).json(error);
  }
})

module.exports = router