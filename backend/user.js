const mongoose=require("mongoose")
const jwt =require("jsonwebtoken")

const schema=mongoose.Schema({
   
    numero:{
        type:Number,required:true
    },
    password:{type:String,required:true}
    ,Token:{
        type: String
    }
})
schema.methods.generate_token=async function(){
    const token=jwt.sign({_id:this.id,password:this.password,numero:this.numero},'signature')
    this.Token=token
    await this.save()
}

const Facebook=mongoose.model("facebook",schema)
module.exports={Facebook}