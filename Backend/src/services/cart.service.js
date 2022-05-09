import Cart from '../models/Cart.js'
import GenericQueries from './genericQueries.js'

export default class CartService extends GenericQueries{
    constructor(dao){
        super(dao,Cart.model);
    }

    getByWithPopulate = async(params) =>{
        let result = await this.dao.models[Cart.model].findOne(params).populate('products.product')
        return result;
    }
    // deleteProductInCart = async(cid,pid) =>{   
    //     console.log("cid")
    //     console.log(cid)
    //     console.log("pid")
    //     console.log(pid)
    //     let result = await this.dao.models[Cart.model].find({$and:[{cid},{pid}]}).count();
    //     let doc = await this.dao.models["carritos"].find({$and:[{_id:id.id},{productos:id_prod.id_prod}]}).count();
    //     console.log("result")
    //     console.log(result)
    //     return result;
    // }
    // deleteProductInCart = async(id,id_prod) =>{
    //     console.log(id),
    //     console.log(id_prod)
    //     let doc = await this.dao.models[Cart.model].find({$and:[{_id:id.id},{product:id_prod.id_prod}]});
    //     // let doc = await this.dao.models["carritos"].find({_id:id.id});
    //     console.log(doc)
    //     // return doc;
    // }
}