import mongoose from "mongoose";

const ordersSchema = mongoose.Schema([
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    cartItems: [
      {
        feature: { type: String, required: true },
        id: { type: String, required: true },
        image: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    cartTotal: { type: Number, required: true },
    deliveryName: { type: String, required: true },
    deliveryLastName: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    deliveryPhone: { type: String, required: true },
    deliveryDate: { type: String, required: true },
  },
]);

const OrdersDisplay = mongoose.model("orders", ordersSchema);

export default OrdersDisplay;
