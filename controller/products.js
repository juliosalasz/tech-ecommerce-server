import ProductModel from "../models/productsModel.js";
export const getProducts = async (req, res) => {
  ProductModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
