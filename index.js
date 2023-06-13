












































const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
require("dotenv").config();

const { TODOModel } = require("./model/TODO.model");
let app = express();
app.use(express.json());
app.use(cors());
// app.use("/todo", TODO_Route);



//get all post from TODOModel
app.get("/todo/", async (req, res) => {
    try {
        const notes = await TODOModel.find();
        res.send(notes.reverse());
    } catch (error) {
        console.log(error)
    }

});







// search 

app.get("/todo/search/:q", async (req, res) => {
  const data = req.params.q;

  try {
    const user = await TODOModel.find(  { task: { $regex: data || "", $options: 'i' } },);

    res.status(200).json(user);
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




app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the db");
  } catch (error) {
    console.log(error);
  }
  console.log(`server running on ${process.env.port} `);
});
