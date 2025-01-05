/* eslint-disable no-unused-vars */
import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct.jsx'
import VerticalCardProduct from '../components/VerticalCartProduct.jsx'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>
      <HorizontalCardProduct category={"processor"} heading={"Popular's Processor"}/>
       
       <VerticalCardProduct category={"mobiles"} heading={"mobile"}/>
       <VerticalCardProduct category={"Mouse"} heading={"Mouse"}/>
       <VerticalCardProduct category={"televisions"} heading={"Television"}/>
       <VerticalCardProduct category={"camera"} heading={"Camera & Photograhpy"}/>
       <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"}/>
       <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
       <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
       <VerticalCardProduct category={"printers"} heading={"Printers"}/>
      


    </div>
  )
}

export default Home
