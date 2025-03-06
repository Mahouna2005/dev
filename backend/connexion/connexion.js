const mongoose=require("mongoose")
async function connexion(){
  await  mongoose.connect("mongodb+srv://fadelkdj:mahouna2005@cluster0.fpnbc.mongodb.net/")
  console.log("vous etes connecté a votre base de donné")
    
}

 module.exports={connexion}