require('dotenv').config();  // This line should come before any other code
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, Auth, sequelize } = require('../models');
const user = require('../models/user');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const t = await sequelize.transaction();

    // Find the user authentication entry
    const auth = await Auth.findOne({
      include: [{ model: User, as: 'user' }],
      where: { username: username },
      transaction: t
    });

    if (!auth) {
      await t.rollback();
      return res.status(404).json({ error: "User not found" });
    }

    // Compare hashed passwords
    const match = await bcrypt.compare(password, auth.password);
    if (!match) {
      await t.rollback();
      return res.status(404).json({ error: "Password does not match" });
    }

    await t.commit();

    let expiresIn = '24h';
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        username: auth.user.username,
        user: auth.user.name,
        userId: auth.user.id,
    }
    const token = jwt.sign(data, jwtSecretKey, {expiresIn});
    res.set('Authorization', `Bearer ${token}`);
    res.set('Access-Control-Expose-Headers', `Authorization`);
    res.json(token);  // Assuming you want to return the user details
  } catch (error) {
    if (t) await t.rollback();
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
