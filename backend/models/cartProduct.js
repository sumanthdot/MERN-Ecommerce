// const mongoose = require('mongoose')
// // console.log(addToCart)


const mongoose = require('mongoose')

const addToCart = mongoose.Schema({
   productId : {
        ref : 'product',
        type : String,
   },
   quantity : Number,
   userId : String,
   // const addToCart = mongoose.Schema({
//      productId :  {
//         // ref : 'product',
//         type:String,
   //     },
//    quantity : Number,
//    userId : String,
},{
    timestamps : true
})
// },{
//     timestamps : true
// })


const addToCartModel = mongoose.model("addToCart",addToCart)
// const addToCartModel = mongoose.model("addToCart",addToCart)

// module.exports = addToCartModel
module.exports = addToCartModel 