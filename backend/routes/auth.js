const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, Auth, sequelize } = require('../models');

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
      return res.status(401).json({ error: "Password does not match" });
    }

    await t.commit();
    res.json(auth.user);  // Assuming you want to return the user details
  } catch (error) {
    if (t) await t.rollback();
    res.status(500).json({ error: error.message });
  }
});

// app.post('/login', async(req, res) => {
//     const {username, email, name, isActive, password} = req.body; 

//     const t = await sequelize.transaction()
//     console.log(Auth.associations)

//     try {
//       const t = await sequelize.transaction();
  
//       // Hash the password
//       const userHash = await bcrypt.hash(password, saltRounds);
  
//       // Attempt to find the user with the hashed password
//       const userTest = await Auth.findOne({
//         include: [{ model: User, as: 'user' }],
//         where: { username: username, password: userHash },
//         transaction: t
//       });
  
//       if (!userTest) {
//         await t.rollback();
//         return res.status(404).json({ error: "User not found" });
//       }
//       console.log(userTest.username);
//       // If the user is found, commit the transaction (if other operations require it)
//       await t.commit();
//       res.json(userTest);
//     } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// })

module.exports = router;
