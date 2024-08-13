import { Router } from "express";
import ExpressBrute from "express-brute";
import bcrypt from "bcrypt";
import db from "../db/conn.mjs"
import jwt from "jsonwebtoken"


const router = Router() ;

var store = new ExpressBrute.MemoryStore();
var bruteforce = new ExpressBrute(store);

router.post("/signup", async (req,res)=>{
    const password = bcrypt.hash(req.body.password, 10);
    let user = {
        name: req.body.name,
        password: (await password).toString()
    };
    let collection = await db.collection("users");
    let result = await collection.insertOne(user);
    console.log(result);
    
    res.send(result).status(204);
})

router.post("/login", bruteforce.prevent, async (req,res)=>{
    const {name, password} = req.body;
    console.log(name + " "+ password);
    
    try {
        let collection = await db.collection("users");
        let user = await collection.findOne({name: name});
        if(!user){
            res.status(401).json({message: "Authentication Failed"})
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            res.status(401).json({message: "Authentication Failed"})
        }

        const token = jwt.sign({username: name, password: user.password}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({message: "Authentication Successful", token: token, name:name})
        console.log("Token: " + token);
    } catch (error) {
        console.error(error);
        res.status(401).json({message: "Authentication Failed"})
    }
})

export default router;