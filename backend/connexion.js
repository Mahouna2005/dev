const mongoose=require("mongoose")

async function connexion(){
    await mongoose.connect("mongodb+srv://fadelkdj:mahouna2005@cluster0.fpnbc.mongodb.net/")
    console.log("connexion a mongo db")
}

module.exports={connexion}