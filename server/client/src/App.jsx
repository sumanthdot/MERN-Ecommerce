/* eslint-disable react-hooks/exhaustive-deps */


import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  
 const dispatch = useDispatch()
 const [cartProductCount,setCartProductcount]= useState(0)

  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    // console.log("Login",dataApi)
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
  }

  const fetchUserAddTocart =async ()=>{   
      const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
        method : SummaryApi.addToCartProductCount.method,
        credentials : 'include'
      })
  
      const dataApi = await dataResponse.json()
      setCartProductcount(dataApi.data?.count)
    }

  useEffect(()=>{
    // user Details
    fetchUserDetails()
    // user Details cart product
    fetchUserAddTocart()
  },[])

  return (
    <>
    <Context.Provider value={{
      fetchUserDetails ,// user details fetch
      cartProductCount, //current user add to cart
      fetchUserAddTocart
    }}>
    <ToastContainer
    position='top-center'
    />
    <Header/>
    <main className='min-h-[calc(100vh-120px)] pt-16'>
   <Outlet/>
   </main>
    <Footer/>
    </Context.Provider>
    </>
    
  )
}

export default App
