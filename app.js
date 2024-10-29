const express = require('express')
const app = express();
const {products} = require('./data.js')


app.get('/',(req,res)=>{
    res.send('<h1> Home Page</h1><a href="api/products">products</a>') //directs to the link api/products
})

app.get('/api/products',(req,res)=>{
    //map creates an array out of an existing array. In this case, we're just getting
    //certain values from the first array
    //the {} syntax is called destructuring
    //you're only taking the ID, NAME, and IMAGE from the array. and then putting them
    //into a new array
    //this returns only a part of the JSON data
    const newProducts = products.map((product)=>{
        const {id,name,image} = product;
        return {id,name,image}
    })
    res.json(newProducts)
    
})

//let's set up route parameters if we just want to return one entry from an array
//example: if you're shopping online and you choose a certain product.
//the website is not going to load the WHOLE json of ALL products
//the website is only going to load the PART of the JSON that has the product you're
//looking for
app.get('/api/products/:productID',(req,res)=>{
    //the ":productID" is sort of like a variable that you can access within this app.get
    console.log(req)
    console.log(req.params.productID)
    const {productID} = req.params;
    const singleProduct = products.find((product)=> {
        return (product.id === Number(productID)) //req.parms are strings. not numbers
    })
    if(!singleProduct){
        return res.status(404).send('Product Does Not Exist')
    }
    return res.json(singleProduct)
    
})

app.listen(5000,()=>{
    console.log('server is listening on port 5000')
})
