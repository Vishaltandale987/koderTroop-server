

const mongoose = require("mongoose")








const TODOSchema =  mongoose.Schema({
  task: { type: String, required: true },
  description: { type: String , required: true },
  important:{ type: String, default: "TODO" ,required: true },
  userID:{ type: String, required: true }
});

const TODOModel = mongoose.model("TODO_data", TODOSchema)
module.exports = {
  TODOModel
}

