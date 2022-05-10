import express from 'express';
import cartController from '../controllers/carts.js'

const router = express.Router();

//GET
router.get('/:cid',cartController.getCartById)
//POST
router.post('/:cid/products/:pid',cartController.addProduct)
router.post('/:id', cartController.deleteCartById)
router.post('/purchase/:cid',cartController.confirm);
//PUT
router.put('/:cid',cartController.updateProductCartById)
//DELETE
router.delete('/:cid/products/:pid',cartController.deleteProductInCart)

export default router;