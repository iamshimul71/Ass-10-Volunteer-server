const express = require('express')
const {ObjectId} = require('mongodb')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5j0vg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 5000



const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const volunteersCollection = client.db("VolunteerNetwork").collection("volunteerList");
  
   app.post('/addvolunteer',(req,res)=>{
     const volunteer = req.body
    volunteersCollection.insertMany(volunteer).limit(20)
    .then(result=>{

    })

   })
   app.get('/volunteerSingleList/:id',(req,res)=>{
     
     volunteersCollection.find({_id: ObjectId(req.params.id)})
     .toArray((err,documents)=>{
       res.send(documents[0])
     })
    

})

   app.get('/volunteerAllList',(req,res)=>{
         volunteersCollection.find({})
         .toArray((err,documents)=>{
           res.send(documents)
         })

   })

   

  
});




app.listen(port)