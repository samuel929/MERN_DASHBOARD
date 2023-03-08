import Product from "../Models/Product.js"
import ProductStat from "../Models/ProductStat.js"

export const getProducts= async(req,res)=>{
    try{
      const products=await Product.find();

      const productStats=await Promise.all(
          products.map(async(product)=>{
              const stat=await ProductStat.find({
                  productId:product._id
              })
              return{
                  ...product._doc,
                  stat
              }
          })
      )
      res.status(200).json(productStats)
    }catch(err){
      res.status(404).json({message:err.message})
    }
}