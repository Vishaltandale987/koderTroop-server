












































const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TODOModel } = require("./model/TODO.model");
const { User } = require("./model/User.model");
let app = express();
app.use(express.json());
app.use(cors());




//get all post from TODOModel
app.get("/todo", async (req, res) => {
    try {
        const notes = await TODOModel.find();
        res.send(notes.reverse());
    } catch (error) {
        console.log(error)
    }

});


app.get("/todo/:id", async (req, res) => {
  try {
      const notes = await TODOModel.find({userID:req.params.id});
      res.send(notes.reverse());
  } catch (error) {
      console.log(error)
  }

});






// search 

app.get("/todo/search/:q/:id", async (req, res) => {
  const data = req.params.q;
  console.log(data)

  try {

    const notes = await TODOModel.find({userID:req.params.id, task: { $regex: data || "", $options: 'i' } });
  

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});



















  
// create todo

app.post("/todo/add", async (req, res) => {
    const newSeat = new TODOModel(req.body);
    try {
        const savedPost = await newSeat.save();
        res.status(200).json("Todo has been successfully created.")
    } catch (err) {
        res.status(500).json("Please try again.");
    }
});


// delete TODO by ID

app.delete("/todo/delete/:id", async (req, res) => {

    try {
        await TODOModel.findByIdAndDelete(req.params.id);
        res.status(200).json("TODO has been deleted");
    } catch (err) {
        return res.status(500).json(err);
    }

});

//make imp  jPx9pjcLMIHIqilEyUhDh7xO1dY5Mfb4

app.put("/todo/imp/:id", async (req, res) => {
  let todo_id = req.params.id

    const {imp} = req.body;

    const update = { $set: { important: imp} };

 
    try {
        const user = await TODOModel.findByIdAndUpdate(todo_id, update);
        res.status(200).json("Tast status Successfully change.");
    } catch (err) {
        return res.status(500).json(err);
    }

});



// Edit
app.put("/todo/:id", async (req, res) => {

    let post_id = req.params.id
    let obj = req.body
  
    // console.log(post_id, obj)
  
  
  
      try {
        const user = await TODOModel.findByIdAndUpdate(post_id, {
          $set: obj,
        });
        res.status(200).json(`TODO has been updated`);
      } catch (err) {
        return res.status(500).json(err);
      }
    
  
  
  });


  //all users

  app.get("/user", async (req, res) => {
  try {
    const notes = await User.find();
    res.send(notes.reverse());
  } catch (error) {
    console.log(error)
  }

});


  app.post("/register" , async(req,res)=>{
    const {email,password,username}=req.body
  
    const userEmail=await User.findOne({email})
  
    if(userEmail){
        res.send({"message":"This Email is already registered"})
    }
    else{
  
        try{
            bcrypt.hash(password, 5, async(err, secure_password)=> {
                if(err){
                    console.log(err)
                }else{
                        const user = new User({email,password:secure_password,username})
                        await user.save()
                        console.log(user)
                            res.send({"message" :"Registered Successfully"})
                 }
        });
           
        }
        catch(err){
            console.log(err)
            console.log({"message":"SignUp failed, please try again"})
        }
    }
    
  
  })
  
  
  
  //login
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.find({ email });
      if (user.length > 0) {
        bcrypt.compare(password, user[0].password, (err, result) => {
          // result == true
          if (result) {
            const token = jwt.sign({ userID: user[0]._id }, "masai");
  
            res.send({ massege: "login successful", token: token, userID: user[0]._id, role: user[0].role });
          } else {
            res.send({ massege: "something went wrong" });
          }
        });
      } else {
        res.send({ massege: "wrong coredentials" });
      }
    } catch (error) {
      res.send({ massege: "something went wrong" });
    }
  });


  //get a user by id
  app.get("/singleuser/:id", async (req, res) => {

    let id = req.params.id

  try {
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
 


app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the db");
  } catch (error) {
    console.log(error);
  }
  console.log(`server running on ${process.env.port} `);
});
