const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/course-app', { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('MongoDB connected successfully');
});


app.listen(PORT, () => {
  console.log('Server is listening on port 3000');
});
