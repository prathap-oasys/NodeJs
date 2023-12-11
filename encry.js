

const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql2');
const bcrypt=require('bcrypt');

const app=express();
app.use(bodyParser.json());


const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'userdeteils',
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

app.post('/post',async(req,res)=>{



    const {username,password,mail}=req.body;

    const hashPassword= await bcrypt.hash(password,10);



    db.query('insert into user (username,password,mail)values (?,?,?)',[username,hashPassword,mail],(error,result,field)=>{

        if(error){
            console.error(error.stack);
            res.status(400).send("Error PostIng Data");
        }else{
            console.log("Data Posted Success");
            res.status(200).send("Data Posted SuccessFully");
        }

    })


});


app.post('/login',async (req,res)=>{

    const {username,password,mail}=req.body;

    db.query('select * from user where mail=?',[mail],async (error,result,field)=>{

        if(error){
            console.log('Error');
            res.send("Login Error");
        }else{
            if (result.length > 0) {
                const pass = await bcrypt.compare(password, result[0].password);
                if (username === result[0].username && pass) {
                    console.log("Success");
                    res.send("Login Success");
                } else {
                    console.log("Invalid password");
                    res.send("Invalid Password");
                }
            
            } else {
                console.log("User not found");
                res.send("User not found");
            }
            

        }

    })



})













app.listen(3000);