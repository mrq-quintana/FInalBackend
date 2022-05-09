import { cartService, productService} from "../services/services.js";

const getCartById = async(req,res) =>{
    let id = req.params.cid;
    let cart = await cartService.getByWithPopulate({_id:id})
    res.send({status:"success",payload:cart})
}
const deleteCartById = async(req,res) =>{
    const _id = req.params.id;
    let cart = await cartService.delete({_id});
        res.send(cart);
};

const deleteProductInCart = async(req,res)=>{
    let {pid,cid} = req.params;
  
    let cart = await cartService.getByWithPopulate({_id:cid});
    
    if(cart.products.some(element=>element.product._id.toString()===pid)){
       
        let product = await productService.getBy({_id:pid});
        let productInCart = cart.products.find(element=>element.product._id.toString()===pid);

        product.stock = product.stock + productInCart.quantity;
        product._id = pid
        await productService.update(product);

        cart.products = cart.products.filter(element=>element.product._id.toString()!==pid);
        cart._id=cid
        await cartService.update(cart);

        res.send({status:"success",message:"Producto eliminado!"})
    }else{
        res.status(400).send({error:"El producto no se encuentra"})
    }
}

const addProduct = async(req,res)=>{
    let {cid,pid} = req.params;
    let {quantity} = req.body;
    let product = await productService.getBy({_id:pid});
    let cart = await cartService.getBy({_id:cid});
    if(!product) return res.send({status:"error",error:"No se encuentra el producto"}); 
    if(!cart) return res.send({status:"error",error:"No existe carrito"});
    if(product.stock===0) return res.send({status:"error",error:"No hay stock"});
    
    product.stock = product.stock - quantity;
    await productService.update(product);
    
    cart.products.push({product:pid,quantity});
    await cartService.update(cart);
    res.send({status:"success",message:"Producto agregado!"})
}

const updateProductCartById = async(req,res)=>{
    let {cid} = req.params;
    let cart = req.body;
    cart._id = cid
    await cartService.update(cart)
    res.send({status:"success",message:"Producto agregado!"})
};



export default {
    getCartById,
    addProduct,
    deleteCartById,
    deleteProductInCart,
    updateProductCartById
}