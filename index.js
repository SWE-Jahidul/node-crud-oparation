const express = require("express");
var cors = require("cors");
const { MongoClient } = require("mongodb");

const ObjectId = require("mongodb").ObjectId;
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
  const usersCollection = client.db("account").collection("accoutuser");

  const orderCollection = client.db("user").collection("userdetails");

  // Order post api

  app.post("/user", async (req, res) => {
    const order = req.body;
    console.log("hit the post api");
    console.log(order);

    const result = await orderCollection.insertOne(order);
    res.json(result);
  });

  //order get api
  app.get("/user", async (req, res) => {
    const cursor = orderCollection.find({});
    const order = await cursor.toArray();
    res.send(order);
  });


  app.get("/user/:id", async (req, res) => {
   const id = req.params.id;
   const query = {"_id": ObjectId(id) };
   const result = await orderCollection.findOne(query);
 
    res.send(result);
  });

  app.put("/user/:id", async (req, res) => {
  const id = req.params.id;
  const updateuser = req.body;
  const filter = { _id: ObjectId(id)}
  const options = { upsert : true};

  const updateDoc = {
    $set:{
      firstName : updateuser.firstName,
    }
  }

  const result = await orderCollection.updateOne(filter,updateDoc,options)
  console.log(req);
  res.send(result)
  
  })


// Delete Api 

  app.delete("/user/:id", async (req, res) => {
    const id = req.params.id;
    // console.log("id", id);
    const query = {"_id": ObjectId(id) };
    const result = await orderCollection.deleteOne(query);
    res.json(result);
  });



});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
