const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3600;

// Middleware
app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m2hfneo.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("tech-shop-DB");
        const products = database.collection("products");
        const brands = database.collection("brands");

        app.get('/products', async (req, res) => {
            const allProduct = products.find();
            const result = await allProduct.toArray();
            res.send(result);

        });
        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await products.insertOne(product);
            res.send(result);

        });
        app.post('/brands', async (req, res) => {
            const product = req.body;
            const result = await brands.insertOne(product);
            res.send(result);

        });


        console.log('name');
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.listen(port, () => { console.log('port is:', port) });
