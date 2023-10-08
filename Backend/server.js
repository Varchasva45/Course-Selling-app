const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();

const SECRET = "SECr3t";


app.use(express.json());

const userSchema = new mongoose.Schema({
  username : String,
  password : String,
  purchasedCourses : [{type : mongoose.Schema.Types.ObjectId, ref: 'Course'}],
});

const adminSchema = new mongoose.Schema({
  username : String,
  password : String
});

const courseSchema = new mongoose.Schema({
  title : String,
  description : String,
  price : Number,
  imageLink : String,
  published : Boolean
});

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

mongoose.connect('mongodb://127.0.0.1:27017/course-app', { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if(err){
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    })
  }else{
    res.sendStatus(401);
  }
} 

// Admin routes
app.post('/admin/signup', async (req, res) => {
  const {username, password} = req.body;
  const admin = await Admin.findOne({username});
  if(admin) {
    res.status(403).json({message : 'Admin already exists'});
  }else{
    const newAdmin = new Admin({username : username, password: password});
    newAdmin.save();
    const token = jwt.sign({username : username, role: 'admin'}, SECRET, {expiresIn : '1h'});
    res.status(200).json({message : 'Admin created successfully', token});
  }
});

app.post('/admin/login', async (req, res) => {
  const {username, password} = req.headers;
  const admin = await Admin.findOne({username: username, password: password});
  if(admin){
    const token = jwt.sign({username: username, role : 'admin'}, SECRET, {expiresIn : '1h'});
    res.status(200).json({message: 'Logged in successfully', token});
  }else{
    res.status(403).json({message : 'Invalid username or password'});
  }
});

app.post('/admin/courses', authenticateJwt, async (req, res) => {
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(200).json({message : 'Cousre created successfully', courseId : newCourse.id});
});

app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if(course){
    course.set(req.body);
    await course.save();
    res.status(200).json({message : 'Course updated successfully'});
  }else{
    res.status(404).json({message : 'Course not found'});
  }

  // or 

  // const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new : true});
  // if(course){
  //   res.status(200).json({message : 'Course updated successfully'});
  // }else{
  //   res.status(404).json({message : 'Course not found'});
  // }
});

app.get('/admin/courses', authenticateJwt, async (req, res) => {
  const courses = await Course.find({});
  res.status(200).json({courses});
});



app.post('/users/signup', async (req, res) => {
  const {username, password} = req.body;
  const user = await User.findOne({username: username});
  if(user){
    res.status(403).json({message : 'User already exists'});
  }else{
    const newUser = new User({username : username, password : password});
    await newUser.save();
    const token = jwt.sign({username: username, role : 'user'}, SECRET, {expiresIn : '1h'});
    res.status(200).json({message : 'user created successfully', token});
  }
});

app.post('/users/login', async (req, res) => {
  const {username, password} = req.headers;
  const user = await User.findOne({username : username, password: password});
  if(user){
    const token = jwt.sign({username : username, role : 'user'}, SECRET, {expiresIn : '1h'});
    res.status(200).json({message : "Logged In successfully", token});
  }else{
    res.status(403).json({message : "Invalid username or password"});
  }
});

app.get('/users/courses', authenticateJwt, async (req, res) => {
  const courses = await Course.find({published : true});
  res.status(200).json({courses});
});

app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if(course){
    const user = await User.findOne({username: req.user.username});
    if(user){
      user.purchasedCourses.push(course);
      await user.save();
      res.status(200).json({message : "Course purchased successfully"});
    }else{
      res.status(403).json({message : "User not found"});
    }
  }else{
    res.status(404).json({message: 'Course not found'});
  }
});

app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: 'User not found' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
