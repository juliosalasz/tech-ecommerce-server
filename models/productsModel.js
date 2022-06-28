import mongoose from "mongoose";
const productsSchema = mongoose.Schema([
  {
    id: { type: String, required: true },
    Category: {
      type: String,
      required: true,
    },
    PRODUCTS: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        brand: { type: String, required: true },
        description: { type: String, required: true },
        featured: { type: Boolean },
        featured: { type: String },
        skus: [
          {
            sku: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            feature: { type: String },
          },
        ],
      },
    ],
    POPULAR: {
      type: Boolean,
      required: false,
    },
  },
]);

const ProductModel = mongoose.model("products", productsSchema);

export default ProductModel;
