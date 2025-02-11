const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const productRoutes = require('./routes/products');
const organisationRoutes = require('./routes/organisations');
const controlRoutes = require('./routes/controls');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: ['http://localhost:4000', 'https://sistem-kontrole-backend.vercel.app/']
}))

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/organisations', organisationRoutes);
app.use('/api/controls', controlRoutes);
const PORT = process.env.PORT || 3000
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(PORT, () => {
    console.log('Connected to the db and listening on port ', process.env.PORT);
  })
})
.catch(error => {
  console.log('Connection to the db failed ', error);
})