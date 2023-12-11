

const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql2');

const app=express();
app.use(bodyParser.json());


const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'mobile',
    port:3306

});

db.connect((err)=>{
    if(err){
        console.log("Connection Error");
    }else{
        console.log("Db Connected SuccessFully");
    }
});



//post Data

app.post('/post',(req,res)=>{

    const {name,color,price,brand}=req.body;

    db.query('insert into mob (name,color,price,brand)values (?,?,?,?)',[name,color,price,brand],(error,result,field)=>{

        if(error){
            console.error(error.stack);
            res.status(400).send("Error PostIng Data");
        }else{
            console.log("Data Posted Success");
            res.status(200).send("Data Posted SuccessFully");
        }

    })


});

//get
app.get('/getAll',(req,res)=>{

    db.query('select * from mob',(error,result,field)=>{

        if(error){
            console.error(error.stack);
            res.status(400).send("Error Getting Data");
        }else{
            console.log("Data Get Success");
            res.status(200).send(result);
        }

    })

})


//Update
app.put('/update/:id',(req,res)=>{

    const {id}=req.params;
    const {name,color,price,brand}=req.body;

    db.query('update mob set name=?,color=?,price=?,brand=? where id=?',[name,color,price,brand,id],(error,result,field)=>{
        if(error){
            console.error(error.stack);
            res.status(400).send("Error Updating Data");
        }else{
            console.log("Data Update Success");
            res.status(200).send("Updated SuccessFully");
        }

    })
    

});


//Delete
app.delete('/delete/:id',(req,res)=>{

    const {id}=req.params;

    db.query('delete from mob where id=?',[id],(error,result,field)=>{

        if(error){
            console.error(error.stack);
            res.status(400).send("Error Deleting Data");
        }else{
            console.log("Data Delete Success");
            res.status(200).send("Deleted SuccessFully");
        }

    })



})











app.listen(3000);