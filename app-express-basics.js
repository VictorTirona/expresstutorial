const express = require ('express')
const path = require('path'); // we need this to create an absolute value for res.send-ing the index.html

const app = express();

//This sets up static and middleware.
//Tor's understanding: imports all of the CSS, JS, and IMG files in a certain folder.

//Tor's understanding: we dump all the assets in "public" because it should be
//accessible via any app.get. So I don't think you can have two files that have the
//same name

//static vs dynamic
//static --> Images don't change. Javscript scripts don't change
//dynamic --> the html changes based on the user's information! I think
app.use(express.static('./public'))

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./navbar-app/index.html'))
})

app.all('*',(req,res)=>{
    res.status(404).send('resource not found');
})

app.listen(5000,()=>{
    console.log('server is listening on port 5000...');
})