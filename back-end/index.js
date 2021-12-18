var express = require("express");
var cors = require("cors");
require("dotenv").config();
var app = express();
const { MongoClient, ObjectId } = require("mongodb");
const serviceData = require("./Data/serviceData");

const port = process.env.PORT || 4000;

const dbURL = `mongodb+srv://ayan:${process.env.DB_PASSWORD}@cluster0.tcz9h.mongodb.net/SagarWash?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());

const client = new MongoClient(dbURL);

async function run() {
  try {
    await client.connect();

    const database = client.db("SagarWash");
    const Services = database.collection("service");
    const Orders = database.collection("orders");
    const Users = database.collection("users");

    // create services
    app.post("/api/v1/services", async (req, res) => {
      try {
        const services = await Services.insertMany(serviceData);

        console.log(services);
        res.status(201).json({
          status: "success",
          services,
        });
      } catch (err) {
        res.status(500).json({
          status: "fail",
          error: err.message,
        });
      }
    });

    // get all services

    app.get("/api/v1/services", async (req, res) => {
      try {
        const services = await Services.find({}).toArray();
        res.status(201).json({
          status: "success",
          services,
        });
      } catch (err) {
        res.status(500).json({
          status: "fail",
          error: err.message,
        });
      }
    });

    // get a service
    app.get("/api/v1/services/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const newID = ObjectId(id);
        const service = await Services.findOne({ _id: newID });
        res.status(200).json({
          status: "success",
          service,
        });
      } catch (err) {
        res.status(500).json({
          status: "fail",
          error: err.message,
        });
      }
    });

    // create user

    app.post("/api/v1/users", async (req, res) => {
      try {
        const user = await Users.insertOne(req.body);
        console.log(user);
        res.status(200).json({
          status: "success",
          user,
        });
      } catch (err) {
        res.status(500).json({
          status: "fail",
          error: err.message,
        });
      }
    });

    app.get("/", (req, res) => {
      res.send("Hello wrold");
    });

    // create order
    app.post("/api/v1/orders", async (req, res) => {
      try {
        console.log(req.body);
        const order = await Orders.insertOne(req.body);
        console.log(order);
        res.status(201).json({
          status: "success",
        });
      } catch (err) {
        res.status(500).json({
          status: "fail",
          error: err.message,
        });
      }
    });

    // get All orders
    app.get("/api/v1/orders", async (req, res) => {
      try {
        const orders = await Orders.find({}).toArray();
        res.status(200).json({
          status: "success",
          orders,
        });
      } catch (err) {
        res.status(500).json({
          status: "fail",
          error: err.message,
        });
      }
    });

    // get orders by user
    app.get("/api/v1/orders/:userID", async (req, res) => {
      try {
        const { userID } = req.params;
        const orders = await Orders.find({ userUid: userID }).toArray();
        console.log(orders);
        res.status(200).json({
          status: "success",
          orders,
        });
      } catch (err) {
        res.status(500).json({
          status: "fail",
          error: err.message,
        });
      }
    });
  } finally {
    // await client.close();
  }
}

// calling mongodb function
run().catch(console.dir());

app.listen(port, () => {
  console.log("Your server listening on PORT", port);
});
