const express = require('express')
const app = express();
const {products} = require('./data.js')


app.get('/',(req,res)=>{
    //method json sends a json response. Text will be converted into JSON with JSON stringify
    res.json(products)
})

app.listen(5000,()=>{
    console.log('server is listening on port 5000')
})
