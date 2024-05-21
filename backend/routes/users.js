const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, Auth, sequelize } = require('../models');

const saltRounds = 10;

router.post('/new-user', async (req, res) => {
  const {username, email, name, isActive, password} = req.body;

  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  let usernameCheck;
  let emailCheck;

  const t = await sequelize.transaction();

  usernameCheck = await User.findOne({
    where: { username: username },
    transaction: t
  });

  emailCheck = await User.findOne({
    where: { email: email },
    transaction: t
  });


  if (usernameCheck) {
    res.status(409).json({ error: "Username already in use." });
  } else if (emailCheck) {
    res.status(409).json({ error: "Email already linked to account." });
  } else {
    return sequelize.transaction(async (t) => { 
      const user = await User.create({
        username: username,
        email: email,
        name: name,
        isActive: isActive
      }, { transaction: t });

      await Auth.create({
        username: username,
        password: hash, 
        userId: user.id
      }, { transaction: t });

      return user; 
    })
    .then(user => {
      res.json(user); 
    })
    .catch(error => {
      res.status(500).json({ error: error.message }); 
    });
  }
});

router.get('/users', async (req, res) => {
    const t = await sequelize.transaction()
    console.log(Auth.associations)
    console.log('Auth Associations:', require('./models').Auth.associations);
  try {
    const users = await Auth.findAll({
        include: [{
          model: User,
          as: 'user'   
        }],
         transaction: t
      });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
