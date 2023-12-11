const express=require('express');
const db=require('mongoose');
const bodyparser=require('body-parser');
const bcrypt=require('bcrypt');
const app=express();
app.use(bodyparser.json());

db.connect("mongodb://localhost:27017/encry",{
    family:4
})

db.connection.on("error",console.error.bind(console,'Error'));
db.connection.once('open',()=>{
    console.log("DB CONNECTED");
});

const User=db.model("encry",new db.Schema({
    username:String,
    password:String
}))


app.post("/register", async (req, res) => {
    const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); 
      const newUser = new User({
        username: username,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(200).send("User registered successfully");
    });

    app.post("/login", async (req, res) => {
        const { username, password } = req.body;
          const user = await User.findOne({ username: username });
          if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
              res.status(200).send("Login successful");
            } else {
              res.status(401).send("Invalid username or password");
            }
          } else {
            res.status(401).send("Invalid username or password");
          }
        } );

app.listen(3000);


