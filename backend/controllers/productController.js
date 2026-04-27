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
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for getting a single product by id :
const singleProduct = async (req, res) => {
  try {
    // Support both params (/:id) and body ({ id })
    const productId = req.params.id || req.body.id;
    if (!productId) {
      return res.json({ success: false, message: "Product ID required" });
    }
    const product = await productModel.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for remove product by id :
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for updating product
const updateProduct = async (req, res) => {
  try {
    const { productId, name, description, price, category, subCategory, bestseller, sizes } = req.body;
    
    const product = await productModel.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    const updateData = {
      name: name || product.name,
      description: description || product.description,
      price: Number(price) || product.price,
      category: category || product.category,
      subCategory: subCategory || product.subCategory,
      bestseller: bestseller === true || bestseller === "true",
      sizes: sizes ? JSON.parse(sizes) : product.sizes,
    };

    // Handle new images if uploaded
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const newImages = [];
    const oldImages = product.images || [];

    // Map each slot - use new upload or keep existing
    const uploadImage = async (file, fallbackUrl) => {
      if (file) {
        const result = await cloudinary.uploader.upload(file.path, { resource_type: "image" });
        return result.secure_url;
      }
      return fallbackUrl;
    };

    if (image1 || oldImages[0]) newImages.push(await uploadImage(image1, oldImages[0]));
    if (image2 || oldImages[1]) newImages.push(await uploadImage(image2, oldImages[1]));
    if (image3 || oldImages[2]) newImages.push(await uploadImage(image3, oldImages[2]));
    if (image4 || oldImages[3]) newImages.push(await uploadImage(image4, oldImages[3]));

    if (newImages.length > 0) {
      updateData.images = newImages;
    }

    await productModel.findByIdAndUpdate(productId, updateData);
    res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, singleProduct, removeProduct, updateProduct };
