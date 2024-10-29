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

app.get('/api/products/:productID/reviews/:reviewID',(req,res)=>{
    console.log(req.params)
    res.send('hello world')
})


//URL?<info that server will use>. For example localhost:5000/api/v1/search?tags=story&query=bar
//?"tags" is a key then "story" is a value
//these items are sent by the client to the server I guess an object of key-value pairs?

app.get('/api/v1/query', (req,res)=>{
    //console.log(req.query);
    //they key-value pairs are stored in whatever is before that "?"
    //in this case, they're stored in "query"
    const {search,limit} = req.query //deconstruct and get the variables
    let sortedProducts = [...products];

    if(search){
        sortedProducts = sortedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0,Number(limit))
    }
    if(sortedProducts.length <1){
        //res.status(200).send("No product matched your search")
        return res.status(200).json({success:true,data:[]})
    }
    res.status(200).json(sortedProducts)
})

app.listen(5000,()=>{
    console.log('server is listening on port 5000')
})
