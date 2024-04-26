const express = require('express');
const { User, Auth, sequelize } = require('./models');

const app = express();
app.use(express.json());

app.post('/users', async (req, res) => {
    const {username, email, name, isActive, password} = req.body;
    const t = await sequelize.transaction();    

  try {

    const user = await User.create({
        username: username,
        email: email,
        name: name,
        isActive: isActive
    }, { transaction: t });

    const auth = await Auth.create({
        username: username,
        password: password,
        userId: user.id
    }, { transaction: t })

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/users', async (req, res) => {
    const t = await sequelize.transaction()
    console.log(Auth.associations)
    console.log('Auth Associations:', require('./models').Auth.associations);
  try {
    const users = await Auth.findAll({
        include: [{
          model: User, // Ensure Auth model is imported and available
          as: 'user'  // Optional: Use if you set an alias in the association
        }]
      });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});