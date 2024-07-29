import express from "express";
import {products,people} from "../data.js";
const router=express.Router();

router.post("/api/people",(req,res)=>{
    const {user}=req.body;
    if(user){
        res.status(201).json({
            sucess:true,
            code:201
        });
    }
    else return res.status(400).json({
        sucess:false,
        code:400,
        msg:"Please provide a value"
    });

}) 
router.put("/api/people",(req,res)=>{
    res.status(200).json({
        sucess:true,
        code:200
    });
})

router.get("/",(req,res)=>{
    res.status(200).json(people);
})

export default router;