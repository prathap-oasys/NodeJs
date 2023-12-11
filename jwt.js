

const express=require('express');

const jwt=require('jsonwebtoken');

const app=express();
app.use(express.json());

require('dotenv').config();



const posts=[{

    username:"prathap",
    job:"trainee"

},{

    username:"prasanna",
    job:"trainee"


}];


app.get('/post',authTok,(req,res)=>{
    res.json(posts.filter(post=>post.username === req.user.name));
});

app.post('/login',(req,res)=>{
    const username=req.body.username;
    const user={name:username};

    const AccessToken=jwt.sign(user,process.env.SECRET);
    res.json({ AccessToken: AccessToken});
})


function authTok(req,res,next){

    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];

    if(token === null) return res.sendStatus(401);

    jwt.verify(token,process.env.SECRET,(err,user)=>{
        if(err)return res.sendStatus(403);
        req.user=user;
        next();
    })

}


app.listen(3000);

