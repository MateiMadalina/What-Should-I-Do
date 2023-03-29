const mongoose = require("mongoose");
const express = require('express');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

mongoose.connect("mongodb+srv://mateielenamadalina22:Serioux1999@cluster0.bqwvie8.mongodb.net/test");
let List = require('./model/Todo.js');


app.route("/api/todo")
.get(async(req,res) => {
    const infos = await List.find();
    res.json(infos)
})
.post((req, res) => {
    console.log(req.body)
    const title = req.body.title;
    const comment = req.body.comment;
    const createdAt = Date.now();
    const list = new List({
      title,
      comment,
      createdAt
    });
     list.save()
      .then(list => res.json(list))
      .catch(err => res.status(400).json({ success: false }));
  })
  .patch(async(req,res) => {
    console.log(req.body);
    const title = req.body.title;
    const comment = req.body.comment;
    const updatedAt = Date.now();
    const id = req.body._id;
    try {
      const updatedList = await List.findOneAndUpdate({_id:id},{title:title,comment:comment, createdAt:updatedAt});
      res.send(updatedList);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .delete(async(req,res) => {
    const title = req.body.title;
    // List.deleteOne({title:title})
    // .then(list => {console.log(list)})
    // .catch(err => {console.log(err)})
    try {
      const deletedList = await List.deleteOne({title:title});
      res.send(deletedList);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  app.listen(3000, () => console.log('http://127.0.0.1:3000'));


