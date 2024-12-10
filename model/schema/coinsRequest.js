const mongoose = require('mongoose');


const coinsRequest = new mongoose.Schema({
    userName: {
        type: String
    },
    userId: {
        type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    role: {
        type: String
    },
    email:{
        type:String
    },
    coins:{
      type:String
    },
    requestStatus: {
        type: String
    },
    requestNotes: [
        {
            note:{
                type:String
            },
            by:{
                type: String,
            }
        }
    ]
   
      
},{
    timestamps:true
})

module.exports = mongoose.model("CoinsRequest",coinsRequest)