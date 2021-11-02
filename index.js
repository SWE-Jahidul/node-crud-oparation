const express = require("express");
var cors = require("cors");
const { MongoClient } = require("mongodb");


const ObjectId  = require("mongodb").ObjectId;
const app = express();
const port = 5000;

const uri =
  "mongodb+srv://test:test@cluster0.2du46.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello gfhfjh!");
});

client.connect((err) => {
  const usersCollection = client.db("events").collection("eventusers");
  // perform actions on the collection object

  app.post("/addevents", async (req, res) => {
    console.log(req.body);
    const result = await usersCollection.insertOne(req.body);
    // console.log(result);
    res.send(result.acknowledged);
  
  });

//  get Method 

app.get('/eventusers' , async(req, res) => {
  const result = await usersCollection.find({}).toArray();
  // console.log(result);
  res.send(result)
});


app.delete("/deleteevents/:id",async (req,res)=>{
  const id = req.params.id;

  const item = {
    _id:ObjectId(id)}
  const result = await usersCollection.deleteOne(item);
    res.send(result.acknowledged);
});


});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
