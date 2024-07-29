import express from "express";
import {products,people} from "../data.js";
import {peopleGet,peoplePost,peoplePut} from "../controller/people.js"
const router=express.Router();

router.post("/",peoplePost) 
router.put("/",peoplePut)
router.get("/",peopleGet)

export default router;