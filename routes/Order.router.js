const { Router } = require("express");
const { authenticate } = require("../middleware/Authenticate.middleware");
const OrderRouter = Router();
const BookModel = require("../model/book.model");
const { OrderModel } = require("../model/order.model");
OrderRouter.get("/api/orders", authenticate, async (req, res) => {
try {
    await OrderModel.find({ user })
      .populate("book")
      .then((r) => {
        return res.status(200).send(r);
      });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

OrderRouter.post("/api/order", authenticate, async (req, res) => {
  let { book, user} = req.body; 
  try {
       let bookv=await BookModel.findOne({book})
     let sum=0;
     sum+=bookv.price*bookv.quantity
    
      let orderItem = new OrderModel({ book, user, totalAmount:sum });
      await orderItem.save();
      return res.status(200).send(orderItem);
    

  } catch (e) {
    return res.status(400).send(e.message);
  }
});


module.exports = { OrderRouter };