/* eslint-disable no-undef */

import React from 'react'
import { useState , useContext,useEffect } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md"
import {loadStripe} from '@stripe/stripe-js';


const Cart = () => {
    const [data,setData] = useState([])
    const [loading,setLoading]= useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill()


    const fetchData = async()=>{
        const response = await fetch(SummaryApi.addToCartProductView.url,{
            method:SummaryApi.addToCartProductView.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
        })
        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data)
        }
       }

       const handleLoading=async()=>{
         await fetchData()
       }

       useEffect(()=>{
        setLoading(true)
         handleLoading()  
        setLoading(false)         
       },[])

       const increaseQty = async(id,qty)=>{
        const response = await fetch(SummaryApi.UpdateCartProduct.url,{
            method: SummaryApi.UpdateCartProduct.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({  
                    _id:id,                                
                    quantity:qty + 1
             })
        })
        const responseData=await response.json()

        if (responseData.success) {
            fetchData()
        }
       }

       const decreseQty = async(id,qty)=>{
        if (qty >= 2) {
            const response = await fetch(SummaryApi.UpdateCartProduct.url,{
                method: SummaryApi.UpdateCartProduct.method,
                credentials:"include",
                headers:{
                    "content-type":"application/json"
                },
                body: JSON.stringify({ 
                        _id:id,              
                        quantity:qty - 1
                 })
            })
            const responseData=await response.json()
    
            if (responseData.success) {
                fetchData()
            }
        }
       }

       const deleteCartProduct = async(id)=>{
        const response = await fetch(SummaryApi.deleteCartProduct.url,{
            method: SummaryApi.deleteCartProduct.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({ 
                    _id:id,              
             })
        })
        const responseData=await response.json()

        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
       }


       const handlePayment = async()=>{
        
        const stripePromise = await loadStripe('pk_test_51N0V7kSAq8kJSdzMN1S7t19YjgVmOhSdmkp0fngt4fqe9LVT2n6LmGW73I2aQ3k9ekF7MHXS3et4lC2V1HV5k9Zx00uJTt7n0O');
        // const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
        const response = await fetch(SummaryApi.payment.url,{
            method : SummaryApi.payment.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify({
                cartItems : data
            })
        })               

        const responseData = await response.json()

        if(responseData?.id){
            // stripePromise.redirectToCheckout({ sessionId : responseData.id})
            stripePromise.redirectToCheckout({ sessionId : responseData.id})
        }

        console.log("payment response",responseData)
    }

    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
    const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice) ,0)







//        const handlepayment = async()=>{

//         console.log("process.env.REACT_APP_STRIPE_PUBLIC_KEY",`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`)
//         const stripePromise = await loadStripe(`process.env.REACT_APP_STRIPE_PUBLIC_KEY`)
//         const response = await fetch(SummaryApi.payment.url,{
//             method:SummaryApi.payment.method,
//             credentials:'include',
//             headers:{
//                 "content-type":"application/json"
//              },
//              body:JSON.stringify({
//                 cartItems :data
//              })
//         })

//         const responseData= await response.json()

//         if (responseData?.id) {
//             stripePromise.redirectToCheckout({sessionId : responseData.id})
//         }

//         console.log("payment response", responseData)
//        }

// const totalQty = data.reduce((previousValue,currentValue)=>previousValue + currentValue.quantity,0)
// const totalPrice = data.reduce((preve,curr)=> preve + (curr?.quantity * curr?.productId?.sellingPrice),0)



return (
    <div className='container mx-auto'>
        <div className='text-center text-lg my-3'>
                {
                data.length === 0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )
            } 

            

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>   
                {/***view product */}
                <div className='w-full max-w-3xl'>
                            {
                                loading ? (
                                    loadingCart.map((el,index)=>{
                                        return(
                                            <div key={el+"Add To Cart loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                            </div>
                                        )
                                    })
                                   
                                ):(
                                    data.map((product,index)=>{
                                        return(
                                            <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                                            <div className='w-32 h-32 bg-slate-200'>
                                                <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                            </div>
                                            <div className='px-4 py-2 relative'>
                                                {/* delete Product */}
                                                <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                                    <MdDelete/>
                                                </div>
                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1 flex'>{product?.productId?.productName}</h2>
                                                <p className='capitalize text-slate-500 flex'>{product?.productId?.category}</p>
                                                <div className='flex items-center justify-between'>
                                                    <p className='text-red-600 font-medium text-lg '>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                                    <p className='text-slate-600 font-semibold text-lg '>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>

                                                </div>                                                
                                                <div className='flex items-center gap-3 mt-1'>
                                                    <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>decreseQty(product?._id,product?.quantity)} >-</button>
                                                    <span >{product?.quantity}</span>
                                                    <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                                </div>
                                            </div>
                                         </div>
                                        )
                                    })
                                )
                            }
                        </div>
                        </div>

                        {/* Summary */}
                        {
                            data[0] && (
                                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {
                            loading ? (
                                <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                    
                                </div>
                            ):(
                                <div className='h-36 bg-white'>
                                <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Quantity</p>
                                    <p>{totalQty}</p>
                                </div>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Total Price</p>
                                    <p>{displayINRCurrency(totalPrice)}</p>
                                </div>

                                <button className='bg-blue-600 p-2 text-white w-full' onClick={handlePayment}>Demo Payment</button>
                            </div>   
                            )
                        }
                                </div>
                            )
                        }
                        
                        
             
            

        </div>
    </div>
  )
}

export default Cart





// import React, { useContext, useState } from 'react'
// import SummaryApi from '../common'
// import { useEffect } from 'react'
// import Context from '../context'


// const Cart = () => {
//     // const [data,setData] = useState([])
//     const [data,setData] = useState([])
//     const [loading,setLoading] = useState(false)
//     const context = useContext(Context)
//      const loadingCart = new Array(context.cartProductCount).fill(null)
//     // const loadingCart = new Array(4).fill(null)
    
    
//     const fetchData = async()=>{
//         setLoading(true)
//         const response = await fetch(SummaryApi.addToCartProductView.url,{
//             method : SummaryApi.addToCartProductView.method,
//             credentials:"include",
//             headers:{
//                 "content-type":"application/json"
//             },
//             body : JSON.stringify(data)
//         })
//         setLoading(false)
//         const responseData = await response.json()

//         if (responseData.success) {
//             setData(responseData.data)
//         }
//     } 

//     useEffect(()=>{
//         fetchData()
//     },[])
//     console.log("Cart ",data)


//     return(
//     <div className='container mx-auto' >
            
//             <div className='text-center text-lg my-3'>
//             {
//                 data.length === 0 && !loading && (
//                     <p className='bg-white py-5'>No Data</p>
//                 )
//             }
//             </div>

//             <div className='flex flex-col lg:flex-row gap-10 lg:justify-between' >   
//                     {/* View product */}
//                     {/* <div className='w-full max-w-3xl '>
//                      {
//                         loading ? (
//                             loadingCart.map((el,index) =>{
//                                 return(
//                                     <div key={el+"Add To Cart Loading"} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded '>
//                                     </div>
//                                 )
//                             })
                           
//                         ):(
//                            data.map((product,index)=>{
//                            return(
//                             <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
//                              <div className='w-32 h-32 bg-slate-200'>
//                                 <img key={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                               
//                                 </div>
//                             </div>
//                            )
//                            })
//                         )
//                     } 
                                        
//                     </div> */}
//   <div className='w-full max-w-3xl'>
//                     {
//                         loading ? (
//                             loadingCart?.map((el,index) => {
//                                 return(
//                                     <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
//                                     </div>
//                                 )
//                             })
                             
//                         ) : (
//                           data?.map((product,index)=>{
//                            return(
//                             <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
//                                 <div className='w-32 h-32 '>
//                                     <img src={product?.productId.productImage[0]}  />
//                                 </div>
                                    
//                             </div>
//                            )
//                           })
//                         )
//                     }
//                 </div>
//             {/* Summary */}
//             <div className='mt-5 lg:mt-0 w-full max-w-sm  '>
//             {
//                 loading ? (
//                     <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                        
//                     </div>
//                 ):(
//                     <div className='h-36 bg-slate-200 '>
//                         Total
//                     </div>
//                 )
//             }
//             </div>
//            </div>
//     </div>
//   )
// }

// export default Cart

