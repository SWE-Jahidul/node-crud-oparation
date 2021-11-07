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
  const usersCollection = client.db("events").collection("eventusers");
  const populardestinationCollection = client
    .db("popularDestination")
    .collection("popularDestinationusers");

  const getintouchCollection = client
    .db("getintouch")
    .collection("usergetintouch");

  const orderCollection = client.db("order").collection("userorder");

  // perform actions on the collection object
  // Event Adding

  app.post("/addevents", async (req, res) => {
    // console.log(req.body);
    const result = await usersCollection.insertOne(req.body);
    // console.log(result);
    res.send(result.acknowledged);
  });

  // Adding Popular Destination

  app.post("/adddestination", async (req, res) => {
    // console.log(req.body);
    const populardes = await populardestinationCollection.insertOne(req.body);
    res.send(result.acknowledged);
  });

  // get in touch data
  app.post("/usergetintouch", async (req, res) => {
    const gettuchdata = await getintouchCollection.insertOne(req.body);
    res.send(gettuchdata.acknowledged);
  });

  // Order post api

  app.post("/order", async (req, res) => {
    const order = req.body;
    console.log("hit the post api");
    console.log(order);

    const result = await orderCollection.insertOne(order);
    res.json(result);
  });

  //order get api
  app.get("/order", async (req, res) => {
    const cursor = orderCollection.find({});
    const order = await cursor.toArray();
    res.send(order);
  });

   // DELETE API
   app.delete('/order/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const query = { "_id": ObjectId(id) };
    const result = await orderCollection.deleteOne(query);
    res.json(result);
})

  //  get Method

  app.get("/eventusers", async (req, res) => {
    const result = await usersCollection.find({}).toArray();
    // console.log(result);
    res.send(result);
  });

  app.get("/popularDestinationusers", async (req, res) => {
    const populardes = await populardestinationCollection.find({}).toArray();

    res.send(populardes);
  });

  app.delete("/deleteevents/:id", async (req, res) => {
    const id = req.params.id;

    const item = {
      _id: ObjectId(id),
    };
    const result = await usersCollection.deleteOne(item);
    res.send(result.acknowledged);
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
