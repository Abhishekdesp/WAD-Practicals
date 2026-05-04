const express=require('express');
const mongoose=require('mongoose');

const app=express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/music");

const songSchema=new mongoose.Schema({
    name:String,
    film:String,
    director:String,
    singer:String,
    actor:String,
    actress:String
});

const Song=mongoose.model("sond_details",songSchema);

app.get("/insert",async(req,res)=>{
    await Song.insertMany([{name:"Abhishek",film:"ABC",director:"PQR",singer:"ASD",actor:"CBV",actress:"POI"},
                        {name:"Abhishek",film:"ABC",director:"PQR",singer:"ASD",actor:"CBV",actress:"POI"},
                        {name:"Akhilesh",film:"ABC",director:"PQR",singer:"ASD",actor:"CBV",actress:"POI"},
    ]);
    res.send("Inserted");
});

app.get("/all",async (req,res)=>{
    let list= await Song.find();
    let count=await Song.countDocuments();
    res.json({list,count});

});

app.get("/song/:director",async (req,res)=>{
    let data= await Song.find({director:req.params.director});
    res.json(data);
});

app.get("/song/:director/:singer",async (req,res)=>{
    let data=await Song.find({director:req.params.director,
                                singer:req.params.singer
    })
})

app.get("/del/:delName",async (req,res)=>{
    await Song.deleteOne({name:req.params.delName});
    res.send("Deleted");
});

app.get("/add",async (req,res)=>{
    await Song.create(req.body);
});

app.get("/:singer/:film",async (req,res)=>{
    let data=await Song.find({singer:req.params.singer,film:req.params.film});
    res.json(data);
});

app.listen(3000,()=>{console.log("Server Started")});