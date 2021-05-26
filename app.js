
const express = require('express')
const app = express()
app.set('view engine','ejs')
app.use(express.static('public'));
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb+srv://mongo_user:haslo123@cluster0.2pvjp.mongodb.net/testowa?retryWrites=true&w=majority', { useUnifiedTopology: true }
).then((client)=>{
        console.log('połączono z bazą danych')
        app.locals.db = client.db('testowa')
            
})


app.listen(3000, ()=>{
    console.log("serwer włączony")
})


app.get('/',(req,res)=>{
    res.render("index")
})
app.get('/random',(req,res)=>{
    const db = req.app.locals.db
    db.collection("test")
    .aggregate(
       [ { $sample: { size: 5 } } ])
   .toArray()
   .then((results)=>{
        return res.json(results)
   })
          
})
app.post('/findList',(req,res)=>{
    const db = req.app.locals.db
    if (req.body.valueText === "") {
        return res.json([])
    }
    db.collection("test")
    .find({name:{"$regex":req.body.valueText}})
    .toArray()
    .then((results)=>{
       
       return res.json(results)
       
    })
})
app.post('/newProduct',(req, res)=>{
    const db = req.app.locals.db
    db.collection("test")
    .insertOne(req.body)
    .then(()=>{
        return res.json("Zapisano produkt w bazie danych")
    })
    
})


