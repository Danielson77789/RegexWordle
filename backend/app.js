const express = require('express');
const { User, Auth, sequelize } = require('./models');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { where } = require('sequelize');

const app = express();
app.use(express.json());

const saltRounds = 10;

// app.post('/users', async (req, res) => {
//     const {username, email, name, isActive, password} = req.body;
//     const t = await sequelize.transaction();    

//     const salt = await bcrypt.genSalt(saltRounds);
//     const hash = await bcrypt.hash(password, salt);

//     return sequelize.transaction(async (t) => { 
//       const user = await User.create({
//         username: username,
//         email: email,
//         name: name,
//         isActive: isActive
//       }, { transaction: t });

//       await Auth.create({
//         username: username,
//         password: hash, 
//         userId: user.id
//       }, { transaction: t });

//       return user; 
//     })
//     .then(user => {
//       res.json(user); 
//     })
//     .catch(error => {
//       res.status(400).json({ error: error.message }); 
//     });
// });

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const t = await sequelize.transaction();

//     // Find the user authentication entry
//     const auth = await Auth.findOne({
//       include: [{ model: User, as: 'user' }],
//       where: { username: username },
//       transaction: t
//     });

//     if (!auth) {
//       await t.rollback();
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Compare hashed passwords
//     const match = await bcrypt.compare(password, auth.password);
//     if (!match) {
//       await t.rollback();
//       return res.status(401).json({ error: "Password does not match" });
//     }

//     await t.commit();
//     res.json(auth.user);  // Assuming you want to return the user details
//   } catch (error) {
//     if (t) await t.rollback();
//     res.status(500).json({ error: error.message });
//   }
// });

// // app.post('/login', async(req, res) => {
// //     const {username, email, name, isActive, password} = req.body; 

// //     const t = await sequelize.transaction()
// //     console.log(Auth.associations)

// //     try {
// //       const t = await sequelize.transaction();
  
// //       // Hash the password
// //       const userHash = await bcrypt.hash(password, saltRounds);
  
// //       // Attempt to find the user with the hashed password
// //       const userTest = await Auth.findOne({
// //         include: [{ model: User, as: 'user' }],
// //         where: { username: username, password: userHash },
// //         transaction: t
// //       });
  
// //       if (!userTest) {
// //         await t.rollback();
// //         return res.status(404).json({ error: "User not found" });
// //       }
// //       console.log(userTest.username);
// //       // If the user is found, commit the transaction (if other operations require it)
// //       await t.commit();
// //       res.json(userTest);
// //     } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // })

// app.get('/users', async (req, res) => {
//     const t = await sequelize.transaction()
//     console.log(Auth.associations)
//     console.log('Auth Associations:', require('./models').Auth.associations);
//   try {
//     const users = await Auth.findAll({
//         include: [{
//           model: User, // Ensure Auth model is imported and available
//           as: 'user'  // Optional: Use if you set an alias in the association
//         }],
//          transaction: t
//       });
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth'); // Similarly define `auth.js` for authentication routes

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});