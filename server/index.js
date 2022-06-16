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


app.post('/todo', async (req, res) => {
    const { content, times } = req.body;
    const itm = new todolist({ content, times });
    await itm.save();
    res.send("inserted")
});
app.get('/todos', async (req, res) => {
    try {
        const resp = await todolist.find().sort({ times: -1 });
        res.json(resp);
    }
    catch {
        res.send('error');
    }
})
app.get('/todos/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const resp = await todolist.find({ _id: id })
        res.json(resp);
    }
    catch {
        res.send('error');
    }
})
app.put('/todos/:id', async (req, res) => {
    const { content, times } = req.body;
    await todolist.findByIdAndUpdate(req.params.id, { content, times });
    const resp = await todolist.findOne({ id: req.params.id });
    res.json(resp);
})

app.delete('/todos/:tid', async (req, res) => {
    await todolist.findByIdAndDelete(req.params.tid)
    res.send('Delete successfully');
})












