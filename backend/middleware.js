const jwt= require("jsonwebtoken")
async function authentification( req,res ,next) {
    const token=req.header("Authorization").replace("Bearer ","")
    if(!token)throw new Error("le token est vide")
        const decoded=jwt.verify(token,"signature")
    if(decoded){
        res.status(200).json({message:"utilsateur verifier"})
        req.user=decoded 
    }
    else{
        res.status(400).json({message:"erreur dauthentification"})
    }
    next()
    
}
module.exports={authentification}