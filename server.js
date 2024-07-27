import express from "express";
import {products,people} from "./data.js";
const app=express();

function middleware(a,b,c){
    console.log("hello");
    c();
}
app.use(middleware);

app.get("/",(req,res)=>{
    res.send("Hello");
    res.end();
});
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