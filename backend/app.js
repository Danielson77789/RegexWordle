require('dotenv').config();  // This line should come before any other code
const cors = require('cors');
const express = require('express');
const { User, Auth, sequelize } = require('./models');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
// const dotenv = require('dotenv');
const { where } = require('sequelize');

const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});