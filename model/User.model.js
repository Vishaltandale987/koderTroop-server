const mongoose = require("mongoose")





const userSchema = mongoose.Schema({
    
 
  username: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },

  

    
      
    

}

)

const User = mongoose.model("todo-user", userSchema)
module.exports = {
    User
}