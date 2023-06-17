
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
// database connection database name is consumer
mongoose.connect('mongodb://127.0.0.1:27017/consumers', (err) => {
  if (err) {
    console.log('Error connecting to the database');
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});
// schema create
const userSchema = new mongoose.Schema({
  user_name: String,
 user_email: { type: String, unique: true },
  phone: String,
  dob: String,
});
// creat a model
const User = mongoose.model('User', userSchema);

const server = express();

server.use(cors());
server.use(bodyParser.json());
//api 
server.post('/demo', async (req, res) => {
  const { user_name, user_email, phone, dob } = req.body;

  //  query to check if the phone number already exists
  const phoneExists = await User.exists({ phone });

  if (phoneExists) {
    // console.log('Phone number already exists ');
    res.json({ error: 'Phone number already exists' });
  } else {
    //user object created
    let user = new User({
     user_name,
      user_email,
      phone,
      dob,
    });

    try {
      //save data in database 
      const doc = await user.save();
      console.log(doc);
      //respons the data to frontend
      res.json(doc);
    } catch (error) {
      console.error('Error saving user:', error);
      res.json({ error: 'Error saving user' });
    }
  }
});
//port number 
server.listen(8080, () => {
  console.log('Server started');
});

