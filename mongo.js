

const bodyParser = require('body-parser');
const express=require('express');
const db=require('mongoose');
const app=express();
app.use(bodyParser.json());

db.connect('mongodb://localhost:27017/mobile',({family:4}));

db.connection.on('error',console.error.bind(console,"Error"));

db.connection.once('open',()=>{
    console.log("DB Connected")

});

const mobile=db.model('mob',new db.Schema({
    name:String,
    color:String,
    price:Number,
    brand:String


}));


//post
app.post('/post',async(req,res)=>{

    const mob=await new mobile(req.body).save();

    res.send(mob);

});

//getAll
app.get('/getAll',async(req,res)=>{

    const mob =await mobile.find();
    res.send(mob);

});

//Update
app.put('/update/:name1',async(req,res)=>{

    const {name1}=req.params;
    const {name,color,price,brand}=req.body;

    const mob= await mobile.updateOne({name:name1},{$set:{name:name,color:color,price:price,brand:brand}});
    
    res.send(mob);


});



//delete
app.delete('/delete/:name',async(req,res)=>{

    const {name}=req.params;
    const del= await mobile.deleteOne({name:name});

    res.send("Delete Success");

})











app.listen(3000);



