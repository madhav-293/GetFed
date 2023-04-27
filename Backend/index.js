const express = require('express')
const app = express()
const port = 5000 
const mongoDB=require("./db")
mongoDB(); 

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");//CORS(crossorigin resourse sharing)
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})

app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));
app.get('/',(req,res)=>{
    res.send('Hello World!')
})
app.listen(port,()=>{
    console.log('Connection Started...')
})