const  mongoose=require("mongoose")


const schema=mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,ref:'Utilisateur',required:true
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    Etat:{
        type:Boolean,
        required:true,
        default:false
    }
})

const Task=mongoose.model("Task",schema)
module.exports={Task}