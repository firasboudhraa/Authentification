const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema(
    {
        email:{
            type: String,
        },
        userName: {
            type: String,
        },
        password:{
            type: String,
        },
        Age:{
            type: Number, 
        },
        tel:{
            type: Number,
        },
        adress:{
            type: String,
        },
    },
        {
            timestamps: true,
        }
    
)
module.exports = mongoose.models.User || mongoose.model("User", userSchema);