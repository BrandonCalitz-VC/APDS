import express, { Router } from "express";
import db from "../db/conn.mjs"
import { ObjectId } from "mongodb";
import authMiddleware from "../middleware/authmiddleware.mjs";


const router = Router( ) ;



router.get("/", async (req, res) =>{
    let collection = await db.collection("posts");
    let results = await collection. find({}) .toArray();
    res.send(results).status(200);
});

router.post("/upload", authMiddleware,async (req, res) =>{
    let newDocument = {
        user: req.body.user,
        content: req.body.content,
        image: req.body.image
    }
    let collection = await db.collection("posts");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204) 
    });


router.patch("/:id" , async (req, res) =>{
    const query = {_id: new ObjectId(req.params.id)};
    const update = {
        $set: {
            user: req.body.user,
            content: req.body.content,
        }
    }
    let collection = await db.collection("posts");
    let result = await collection.updateOne(query, update);

    res.send(result).status(200);
});

router.get("/:id", async (req, res) =>{
    let collection = await db.collection("posts");
    const query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if(!result) res.send("Not found").status(404);
    res.send(result).status(200);
});


router.delete("/:id", authMiddleware, async (req, res) =>{
    const query = {_id: new ObjectId(req.params.id)};

    let collection = await db.collection("posts");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

export default router;