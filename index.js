const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors())
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.buvu7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try {
        await client.connect();
        const productCollection = client.db('techland').collection('products');

        app.get('/product', async(req, res)=>{
            const query = {};
            const cursor  = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
    }
    finally {

    }

}
run().catch(console.dir);








app.get('/', (req, res)=>{
    res.send('techland is running')
});

app.listen(port, ()=>{
    console.log('techland Server is running on port', port);
})