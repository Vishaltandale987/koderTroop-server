

const mongoose = require("mongoose")








const TODOSchema =  mongoose.Schema({
  task: { type: String, required: true },
  description: { type: String , required: true },
  important:{ type: Boolean, default: false  }
});

const TODOModel = mongoose.model("TODO_data", TODOSchema)
module.exports = {
  TODOModel
}

