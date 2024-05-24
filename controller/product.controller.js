const products = require('../Public/product.json');


// CRUD



// Create => POST Method
exports.createProduct = (req , res) => {
    // console.log(req.body);
    products.push(req.body);
    res.status(201).json({message: 'New Product is Added...!!!'});
};


// READ => GET Method (ALL Products)
exports.getAllProduct = (req,res) => {
    res.status(200).json(products);
};


// READ => GET Method (Single)
exports.getProduct = (req,res)=>{
    const id = +req.params.id;
    // console.log(typeof(id));
    const item = products.find((e)=> e.id === id)
    res.status(200).json(item);
};


// Replace => PUT Method
exports.replaceProduct = (req,res)=>{
    const id = +req.params.id;
    // console.log(typeof(id));
    const itemindex = products.findIndex((e)=> e.id === id)
    // const product = products[itemindex];

    products.splice(itemindex , 1 , {...req.body});
    res.status(200).json({message : 'Product is Replaced...'})
};


// Update => PATCH Method
exports.updateProduct = (req,res)=>{
    const id = +req.params.id;
    // console.log(typeof(id));
    const itemIndex = products.findIndex((e)=> e.id === id)
    const product = products[itemIndex];

    products.splice(itemIndex , 1 , {...product, ...req.body});
    res.status(200).json({message : 'Product is Updated...'})
};


// Delete => DELETE Method
exports.deleteProduct = (req,res)=>{
    const id = +req.params.id;
    // console.log(typeof(id));
    const itemindex = products.findIndex((e)=> e.id === id)
    // const product = products[itemindex];

    products.splice(itemindex , 1);
    res.status(200).json({message : 'Product is Deleted...'})
}