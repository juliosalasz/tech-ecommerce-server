import OrdersDisplay from "../models/orderModels.js";
export const getOrders = async (req, res) => {
  //get me all orders
  OrdersDisplay.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
export const postOrders = async (req, res) => {
  try {
    const order = req.body;
    console.log(order);
    //pass infro through the model
    const newOrder = new OrdersDisplay(order);
    //save into database
    await newOrder.save();
    console.log("order Created");

    res.json(order);
  } catch (err) {
    console.log("error in postOrders controller", error);
  }
};
