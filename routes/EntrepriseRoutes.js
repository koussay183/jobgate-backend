require('dotenv').config(); // Load environment variables

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const Entreprise = require("../modules/Entreprise");
const Offre = require("../modules/Offre");

// ---------------------------Start-Admin-Login---------------------------------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const e = await Entreprise.findOne({ email, password });
    if (e) {
      // Generate JWT token
      const token = jwt.sign({ id: e._id  }, process.env.SECRET_KEY , {expiresIn : "1h"});
      // Set token in cookie
      res.cookie('token', token, { httpOnly: true }); // Set token as HTTP-only for security
      res.json('Login successful!');
    } else {
      res.status(401).json('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/signup',async(req, res) => {
  try {
    const e = new Entreprise(req.body);
    await e.save();
    res.status(201).json(e);
  } catch (error) {
    res.status(400).json(error);
  }
})

router.post('/create-offre/:id',async(req, res) => {
    try {
        const { id } = req.params;

        const e = await Entreprise.findOne({_id : id});

        if(!e) {
            return res.statusCode(400).json("No Entreprise With This Id")
        }

        let offre = {
            ...req.body,
            idEntrePrise : id
        }

        const o = new Offre(offre);
        await o.save();
        res.status(201).json(o);
    } catch (error) {
      res.status(400).json(error);
    }
})

module.exports = router