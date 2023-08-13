import mongoose from "mongoose";

const userSAchrema= new mongoose.Schema({
    id: {type: String, require: true},
    username: {type: String, require: true, unique: true},
    name: {type: String, require: true},
   image: {type : String},
   bio: {type : String},
   threads:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Threads"
    }
   ],
   onboarded: {
    type: Boolean,
    default:false,
   },
   communities:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community"
   }]
});

const user = mongoose.models.User || mongoose.model("User", userSAchrema);

export default user;