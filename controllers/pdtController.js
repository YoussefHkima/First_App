const Product = require("../models/Product")
const category = require("../models/category")
const addCategory = async(req, res) => {
    const name = req.body.name;
    try {

        const existingCategory = await category.findOne({ where: { name } });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category already exists' });
        }
        const Category = await category.create({ name });

        res.status(201).json(Category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getAll = async(req, res) => {

    try {
        const products = await Product.find()
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const add = async(req, res) => {
    const { id } = req.params;
    try {
        const Category = await category.findById(id);
        if (!Category) {
            return res.status(404).json({ error: `Category with ID ${id} not found` });
        }
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            image: `http://localhost:3000/${req.file.filename}`,
            category: id

        })
        await newProduct.save()
        return res.status(201).json("product added")
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const getOne = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err)
    }
}
const modify = async(req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updateProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}

const remove = async(req, res) => {
    try {
        const deltedProduct = await Product.findOneAndDelete({
            _id: req.params.id
        })
        if (!deltedProduct) return res.status(404).json("product not found")
        return res.status(200).json("product deleted")
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    add,
    modify,
    remove,
    getAll,
    getOne,
    addCategory
}