import express from 'express';
import cartController from '../controllers/carts.controller.js'

const router = express.Router();

router.get('/:cid',cartController.getCartById)
router.post('/:cid/products/:pid',cartController.addProduct)
router.post('/:id', cartController.deleteCartById)
router.post('/purchase/:cid',cartController.confirm);
router.put('/:cid',cartController.updateProductCartById)
router.delete('/:cid/products/:pid',cartController.deleteProductInCart)

export default router;