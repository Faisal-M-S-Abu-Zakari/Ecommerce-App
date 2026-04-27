import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

// function for adding a new product :
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    const imagesUrl = await Promise.all(
      images.map(async (image) => {
        try {
          const result = await cloudinary.uploader.upload(image.path, {
            resource_type: "image",
          });
          return result.secure_url;
        } catch (err) {
          // Detailed logging to help diagnose TLS / network / auth errors
          console.error("Cloudinary upload error:", {
            message: err && err.message,
            code: err && err.code,
            name: err && err.name,
            stack: err && err.stack,
          });
          throw err; // rethrow so outer catch handles response
        }
      }),
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true",
      sizes: JSON.parse(sizes),
      images: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for getting all products :
const listProducts = async (req, res) => {};

// function for getting a single product by id :
const singleProduct = async (req, res) => {};

// function for remove product by id :
const removeProduct = async (req, res) => {};

export { addProduct, listProducts, singleProduct, removeProduct };
