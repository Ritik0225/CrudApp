import express from "express";
import User from "./models/users.js";
import jwt from "jsonwebtoken"
import crudUser from "./models/crudUsers.js";
// const connectDB = require('./config/db');
// const dotenv = require('dotenv');
// const { default: mongoose } = require('mongoose');
// const bodyParser = require('body-parser');
import cors from "cors";
import mongoose from "mongoose";


// dotenv.config();

const app = express();
// connectDB();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/curdApp");

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (err) {
        console.log(err)
    res.json({ status: "error", error: "Duplicate email or invalid password" });
  }
});

app.post("/api/login", async(req, res) => {
        const user = await User.findOne({
                email: req.body.email,
                password: req.body.password,
        })

        if(user){

          const token = jwt.sign({
            email: user.email,
          }, "secret123")
                return res.json({ status: 'ok', user: token })
        }else{
                return res.json({ status: 'error', user: false})
        }
})

app.get('/user', (req, res) => {
  crudUser.find({})
  .then(users => res.json(users))
  .catch(err => res.json(err))
})

// app.get('/getUser/:id', (req, res) =>{
//   const id = req.params.id
//   crudUser.findById({id})
//   .then(users => res.json(users))
//   .catch(err => res.json(err))
// })
app.get('/getUser/:id', async (req, res) => {
  try {
    const user = await crudUser.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

app.put('/updateUser/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone } = req.body;
    const user = await crudUser.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      phone
    }, { new: true });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    res.json({ status: 'ok', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id
  crudUser.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err =>  res.json(err))
})

app.post("/api/createUser", async(req, res) => {
  console.log(req.body)

  try {
    await crudUser.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
  })
  res.json({ status: "ok" })
}catch(err){
  console.log(err)
  res.json({status: "error", error: "something went wrong with add user"})
}
})
app.listen(1337, () => {
  console.log("server started on port 1337");
});

// mongoose.connect('mongodb://127.0.0.1:27017/authentication')
//         .then(()=> console.log('connnected to MongoDB!'))
//         .catch((error) => console.log('Failed to connect to MongoDB: ', error))

//         app.use('/api/auth', require('./routes/auth'));

// const PORT = process.env.PORT || 3000;
//         app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
