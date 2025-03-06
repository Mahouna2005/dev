const express=require("express")
const Router=new express.Router()
const{User}=require("../user/user")
const { Task } = require("../task/task")
const { authentification } = require("../middleware")

app.use(express.json())



Router.post('/inscription',async(req,res)=>{

const infos_user=req.body
if(!infos_user) throw  new Error("les donnees envoyer pour enregistrer l'utilisateur  son null")
    try{
const utilisateur=new User(infos_user)
await utilisateur.token_function()
res.json({user:utilisateur}).status(200)
}
catch(e){
    res.status(400).json({message:e})
}
})

Router.post('/connexion',async(req,res)=>{
    const infos_user=req.body
    if(!infos_user) throw new Error('les donnes envoyer pour se connecter sont vident')
        try{
    const user= await User.findOne({ email:infos_user.email})
    if (!user) throw new Error("l'utilisateur n'est pas dzans la base de donnée")
        else{
    const ispassword= await bcrypt.compare(user.password,infos_user.password)
if(ispassword){
    res.status(200).json({message:"connexion reussir",id:user.id})
}
else{
    res.status(400).json({message:'authentification echoué'})
}}
}
catch(e){
    res.status(400).json({message:e.message})
}
  
})
Router.post("/deconnexion",async(req,res)=>{
    const infos_user=req.body
    if(!infos_user)throw new Error("votre requetes est vide")
        try{
    const user=  await User.findById({_id:infos_user.id
    })
    if(!user) throw new Error("l'utilisateur n'est pas dans  la base de donnée")
        user.Token=""
    await user.save()
    res.status(200).json({message:"utilisateur deconnecté"})
    }
    catch(e){
        res.status(400).json({message:e.message})
    }
})

Router.post('/ajouter', authentification,async(req,res)=>{
    const donné=req.body
    if(!donné)throw new Error("les donnes sont  vides")
        try{
     const task=new Task({userid:req.user,title:donné.title,description:donné.description})
     await task.save()
    res.json({task:task,message:"succes"}).status(200)}

     catch(e){
        res.json({message:e.message}).status(400)

     }
})

Router.put("/renommer", authentification,async(req,res)=>{
    const {id,title,description}=req.body
    if(!id)throw new Error("l'id est vide")
        try{
    const task= await Task.findById({_id:id})
    if(title,description){
        task.title=title
        task.description=description 
    }
    await task.save()
res.json({message:"taches modifier"})}
catch(e){
    res.json({message:e}).status(400)
}

})
Router.delete("/supprimer/:id", authentification,async(req,res)=>{
    const id=req.params.id
    if(!id)throw new Error("l'id est vide")
        try{
    const task= await Task.deleteById({_id:id})
    res.json({message:"tache supprimer"}).status(200)}
    catch(e){
        res.json({message:e}).status(400)
    }

    
})





