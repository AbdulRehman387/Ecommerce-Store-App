"use client";
import React, { useEffect } from 'react'
import { useState } from 'react'
import { BiSolidWallet } from "react-icons/bi";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import Link from 'next/link';
import { MdArrowForward } from 'react-icons/md';
import { toast } from 'react-toastify';
import { getSession } from 'next-auth/react';

const Page = ({ params }) => {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState()
  useEffect(() => {
    fetch(`/api/products`)
      .then(res => res.json())
      .then((data) => {
        const temp1 = data.find((product) => product.id === params.id)
        setProduct(temp1)
        const temp2 = data.filter((product) => product.category === temp1.category)
        setProducts(temp2)
      })
  }, [])

const onClickHandler = async (id) => {
    toast.success('Item added to cart', {
      position: "top-right",
      autoClose: 1000, // Closes after 3 seconds
    });
    const session = await getSession()
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: session?.user?.id,
        productId: id
      }),
    });
  }

  return (
    <div className='bg-gray-100'>
      <div className='flex mt-20 px-32 justify-center items-center gap-x-10 laptop:px-10 tablet:px-10 mobile:flex-col mobile:px-5'>
        <div className='w-1/2 bg-white flex justify-center items-center mt-12 mobile:w-full'>
          <img className='h-[75vh] laptop:h-auto tablet:h-auto mobile:h-auto' src={product.image} alt="" />
        </div>
        <div className='w-1/2 mt-12 mobile:w-full mobile:mt-5'>
          <h2 className='text-4xl font-semibold text-gray-800 tablet:text-3xl mobile:text-3xl'>{product.title}</h2>
          <p className='text-2xl font-medium text-gray-600'>{product.category}</p>
          <p className='text-4xl font-semibold text-gray-800 mt-2'>${product.price}</p>
          <p className='text-xl font-semibold text-gray-800 mt-3'>Description:</p>
          <p className='text-lg font-medium text-gray-500 leading-[23px]'>{product.description}</p>
          <div className='flex flex-col justify-center items-center w-full gap-y-3 mt-4'>
            <button onClick={()=>onClickHandler(params.id)} className='bg-black text-white text-xl font-semibold p-x-4 py-3 w-full rounded-sm hover:scale-[1.01] duration-150'>
              <div className='flex justify-center items-center gap-x-2'>
                <PiShoppingCartSimpleFill className='text-white text-3xl' />
                <p>Add to cart</p>
              </div>
            </button>
            <Link href={`/checkout/${params.id}`} className='bg-black text-white text-xl font-semibold p-x-4 py-3 w-full rounded-sm hover:scale-[1.01] duration-150'>
              <div className='flex justify-center items-center gap-x-2'>
                <BiSolidWallet className='text-white text-3xl' />
                <p>Buy now</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className='h-[1px] w-full bg-[#c2c2c2] mt-20 mobile:mt-20'></div>
      <section className='flex flex-col justify-center items-center mt-5 gap-y-20 bg-gray-100 mobile:mt-5'>
      <div className='flex flex-col justify-center items-center mt-10 gap-y-4'>
          <h1 className='text-5xl font-semibold text-center mobile:text-3xl'>Related Products</h1>
        </div>
        <div className='grid grid-cols-4 justify-center items-center gap-x-5 gap-y-10 laptop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-2 mobile:gap-x-3'>
          {
            products?.map((item) => {
              return (
                <div key={item.id} className="bg-white w-[300px] overflow-hidden max-w-sm py-5 text-[#5a5757] mobile:w-[45vw] mobile:py-2">
                  <div className="relative flex justify-center">
                    <Link href={`/products/${item.id}`}><img className="h-[200px]" src={item.image} alt="Product Image" /></Link>
                    <div className="absolute bottom-0 left-0 bg-red-500 text-white px-3 py-0.5 m-2 rounded-full text-sm">Sale
                    </div>
                  </div>
                  <div className="p-4 mobile:p-1">
                    <h3 className="text-lg font-medium mb-2 mobile:text-sm">Silicon Power 256GB SSD</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg mobile:text-sm">${item.price}</span>
                      <div className='flex justify-center items-center cursor-pointer group'>
                        <button onClick={()=>onClickHandler(item.id)} className='mobile text-sm group-hover:text-gray-900 group-active:text-gray-400'>Add to cart</button>
                        <MdArrowForward className='text-2xl mobile:text-xl group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-100' />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
      <div className='h-[1px] w-full bg-[#c2c2c2] mt-20 mobile:mt-20'></div>
    </div>
  )
}

export default Page