const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const http = require('http');
const mongodb = require('mongodb');
const todolist = require('./Model/todolist');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost/todolist")
    .then(() => console.log("Now connected to MongoDB!"))
    .catch(err => console.error("Something went wrong", err));


app.use(cors());

const server = http.createServer(app);

server.listen(3002, () => {
    console.log('listening on *:3002');
});


app.post('/', async (req, res) => {
    const { content } = req.body;
    const itm = new todolist({ content });
    await itm.save();
    res.send("Item insert Successfully");
});

app.get('/list', async (req, res) => {

    const resp = await todolist.find({});
    res.json(resp);
})


app.get('/getdata/:id', async (req, res) => {
    const resp = await todolist.findOne({ id: req.params.id })
    res.json(resp);
})


app.put('/updatedata/:userid', async (req, res) => {
   
    const { content } = req.body;
    const resp = await todolist.findByIdAndUpdate(req.params.userid, { content } );
    res.json(resp);
})

app.delete('/list', async (req, res) => {
    const { id } = req.body;
    await todolist.deleteOne({ id });
    res.json("Delete Successfully");

})












