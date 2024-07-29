import express from "express";
import {products,people} from "./data.js";
import { middleware } from "./middleware.js";
const app=express();



app.use(middleware);
app.use(express.static("./static"));
app.use(express.urlencoded({
    extended:false,
}));
app.use(express.json());
app.post("/login",(req,res)=>{
    console.log(req.body);
    res.status(201).send("Sucess");
})
app.post("/api/people",(req,res)=>{
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
app.put("/api/people",(req,res)=>{
    res.status(200).json({
        sucess:true,
        code:200
    });
})

app.get("/api/people",(req,res)=>{
    res.status(200).json(people);
})
app.get("/api/products",(req,res)=>{
    res.json(products.map((v)=>{
       const {name,price,image}=v;
       return {name,price,image}
    }));
});
app.get("/api/products/:id",(req,res)=>{
    return res.json(products.find((product)=>product.id===Number(req.params.id)));
});
app.get("/api/v1/query",(req,res)=>{
    const {limit,search}=req.query
    let queriedProducts=[...products];
    if(search){
        queriedProducts=queriedProducts.filter((v)=>{
            const {name}=v;
            if(name.includes(search))return true;
            return false
        })
    }
    if(limit){
        queriedProducts=queriedProducts.slice(0,Number(limit));
    }


    return res.json(queriedProducts).status(200);
})



app.listen(3000,()=>{
    console.log("Server is listening at port 3000");
})