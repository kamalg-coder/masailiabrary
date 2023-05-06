const express = require("express");
const { Router } = require("express");
const BookModel = require("../model/book.model");
const { authenticate } = require("../middleware/Authenticate.middleware");

const app = express();
const BookRouter = Router();



BookRouter.get("/api/books", async (req, res) => {
  const author = req.query.author;
  const category = req.query.category;
  if (category) {
        try {
          let books = await BookModel.find({category:{ $regex: `${category}`,$options:"i"} });
          res.status(200).send(books);
        } catch (err) {
          console.log(err);
          res.status(500).send({ message: err.message });
        }
      } 
  else if (author && category) {
    try {
      let books = await BookModel.find({
        $and: [{ author: { $regex: `${author}`,$options:"i"} }, { category: { $regex: `${category}`,$options:"i"} }],
      });
      res.status(200).send(books);
    } catch (error) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  }  
  else {
    try {
      let books = await BookModel.find();
      res.status(200).send(books);
    } catch (error) {
      res.status(500).send({ message: err.message });
    }
  }
});

BookRouter.get("/api/books/:id", async (req, res) => {
    const ID = req.params.id;
    try {
      let books = await BookModel.find({ _id: ID });
      res.status(200).send(books);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });
  
app.use(authenticate)

BookRouter.post("/api/books", async (req, res) => {
  try {

    await BookModel.insertMany(req.body);
    res.status(201).send({ msg: "Books has been added" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

BookRouter.patch("/api/books/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    await BookModel.findByIdAndUpdate({ _id: ID }, payload);
    res.status(204).send({ msg: "Books has been updated" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

BookRouter.delete("/api/books/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await BookModel.findByIdAndDelete({ _id: ID });
    res.status(202).send({ msg: "Books has been Deleted" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = { BookRouter };