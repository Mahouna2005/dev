const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcrypt")
const jwt =require("jsonwebtoken")


const schema=mongoose.Schema({
name:{
    type:String,
    required:true}
    ,email:{
        validator(v){
            if(! validator.isEmail(v)) throw new Error("l'email n'est pas valide")
           
        },
        type:String,
        required:true,
        unique:true
    }
    ,password:{
        validator(v){
            if(!validator.isLength(v,{min:6,max:16})) throw new Error("mot de passe trop court")
        },
        type:String,
        required:true
    },
    Token:{
        type:String,
        required:true
    }
})

schema.pre("save",async function(){
    if(this.isModified('password')
    ){
this.password= await bcrypt.hash(this.password,8)}

})
Schema.method.token_function=async function(){
    const token= await jwt.sign({_id:this.id,name:this.name},"signature")
    this.Token=token
    await this.save()

   

}
const User=mongoose.model("Utilisateur",schema)
module.exports={User}