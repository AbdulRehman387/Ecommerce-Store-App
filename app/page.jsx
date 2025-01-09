"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { BiSolidWallet } from 'react-icons/bi';
import ProductLoader from '@/components/ProductLoader/ProductLoader';
const Page = () => {
  const [products, setProducts] = useState([])
  const { data: session, state } = useSession()
  useEffect(() => {
    fetch('/api/products', {
      cache: 'no-store',
    })
      .then(res => res.json())
      .then(json => setProducts(json))
  }, [])

  const onClickHandler = async (id) => {
    if (session) {
      toast.success('Item added to cart', {
        position: "top-right",
        autoClose: 1000, // Closes after 3 seconds
      });
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
    else {
      toast.error('Please Login first!', {
        position: "top-right",
        autoClose: 1000, // Closes after 3 seconds
      });
    }
  }

  return (
    <div className='bg-gray-100'>
      <section className="h-[100vh] background mobile:px-5 bg-gray-500">
        <div className="flex justify-center items-center h-[85%]">
          <div className="text-center w-[80%] flex flex-col justify-center items-center mobile:w-auto mt-32">
            <h1 className="text-5xl font-semibold text-white w-auto mobile:w-auto mobile:text-4xl">Industrial design meets fashion</h1>
            <p className="text-xl text-white mt-5 mobile:text-lg">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
            <button className="bg-transparent border-2 border-l-white px-9 py-3 text-md font-semibold text-white mt-10 mobile:text-md">See more</button>
          </div>
        </div>
      </section>
      <section className="h-auto mt-24 flex justify-center items-center mobile:mt-14">
        <div className="flex flex-col justify-center items-center w-[90%] gap-y-16">
          <div className="text-center flex flex-col justify-center items-center">
            <h1 className="text-5xl font-semibold w-[600px] mobile:text-3xl mobile:w-full">Shop Our Collections</h1>
            <p className="mt-5 text-lg text-[#919191]">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
          </div>
          <div className="flex justify-center gap-x-8 mobile:flex-col mobile:px-5 mobile:gap-y-10">
            <div className="flex flex-col items-center gap-y-5 w-[30%] h-auto text-center mobile:w-auto relative group">
              <img className="rounded-lg flex-[1]" src="https://cdn.prod.website-files.com/5d6fe845a10b7881ddcc9c9c/635639544d0d414c0bad916d_Picture15.png" alt="Campus" />
              <Link href={"/collections/clothing"} className='rounded-lg absolute top-0 w-full h-full bg-black opacity-0 group-hover:opacity-[0.4] transition-opacity ease-in-out duration-500'><div className=""></div></Link>
              <h3 className="text-3xl text-gray-100 hover:text-white font-normal absolute -bottom-10 group-hover:bottom-[45%] transition-all ease-in-out duration-500 tablet:text-2xl">CLOTHING</h3>
            </div>
            <div className="flex flex-col items-center gap-y-5 w-[30%] h-auto text-center mobile:w-auto relative group">
              <img className="rounded-lg flex-[1]" src="https://t4.ftcdn.net/jpg/03/64/41/07/360_F_364410756_Ev3WoDfNyxO9c9n4tYIsU5YBQWAP3UF8.jpg" alt="Campus" />
              <Link href={"/collections/electronics"} className='rounded-lg absolute top-0 w-full h-full bg-black opacity-0 group-hover:opacity-[0.4] transition-opacity ease-in-out duration-500'><div className=""></div></Link>
              <h3 className="text-3xl text-gray-100 hover:text-white font-normal absolute -bottom-10 group-hover:bottom-[45%] transition-all ease-in-out duration-500 tablet:text-2xl">ELECTRONICS</h3>
            </div>
            <div className="flex flex-col items-center gap-y-5 w-[30%] h-auto text-center mobile:w-auto relative group">
              <img className="rounded-lg flex-[1]" src="https://static01.nyt.com/images/2022/04/13/t-magazine/13tmag-raymond-slide-K086/13tmag-raymond-slide-K086-superJumbo.jpg" alt="Campus" />
              <Link href={"/collections/jewelery"} className='rounded-lg absolute top-0 w-full h-full bg-black opacity-0 group-hover:opacity-[0.4] transition-opacity ease-in-out duration-500'><div className=""></div></Link>
              <h3 className="text-3xl text-gray-100 hover:text-white font-normal absolute -bottom-10 group-hover:bottom-[45%] transition-all ease-in-out duration-500 tablet:text-2xl">JEWELRY</h3>
            </div>
          </div>
        </div>
      </section>
      <div className='h-[1px] w-full bg-[#c2c2c2] mt-32 mobile:mt-20'></div>
      <section className='flex flex-col justify-center items-center mt-10 gap-y-20 bg-gray-100 mobile:mt-5'>
        <div className='flex flex-col justify-center items-center mt-10 gap-y-4'>
          <h1 className='text-5xl font-semibold text-center mobile:text-3xl'>Featured Products</h1>
          <p className='text-lg text-[#919191] text-center mobile:text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        </div>
        <div className='grid grid-cols-4 justify-center items-center gap-x-5 gap-y-10 laptop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-2 mobile:gap-x-3'>

          {products.length !== 0 ? (products?.map((item) => {
            return (
              <div key={item.id} className="bg-white w-[300px] overflow-hidden max-w-sm py-5 text-[#5a5757] mobile:w-[45vw] mobile:py-2">
                <Link href={`/products/${item.id}`} className="relative flex justify-center">
                  <div><img className="h-[200px] mobile:h-[150px]" src={item.image} alt="Product Image" /></div>
                  <div className="absolute bottom-0 left-0 bg-red-500 text-white px-3 py-0.5 m-2 rounded-full text-sm">Sale
                  </div>
                </Link>
                <div className="p-4 mobile:p-1">
                  <h3 className="text-lg font-medium mb-2 mobile:text-sm">{item.title.slice(0, 24) + "..."}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xl text-gray-800 mobile:text-sm">${item.price}</span>
                  </div>
                  <div className='flex flex-col justify-center items-center w-full gap-y-2 mt-4 mobile:relative mobile:bottom-2'>
                    <button onClick={() => onClickHandler(item.id)} className='bg-white text-black text-base font-medium px-4 py-2 w-full rounded-sm hover:scale-[1.01] duration-150 border border-black mobile:text-sm mobile:py-1.5'>
                      <div className='flex justify-center items-center gap-x-2'>
                        <PiShoppingCartSimpleFill className='text-black text-xl mobile:text-lg' />
                        <p>Add to cart</p>
                      </div>
                    </button>
                    <Link href={`/checkout/${item.id}`} className='bg-black text-white text-base font-medium px-4 py-2 w-full rounded-sm hover:scale-[1.01] duration-150 mobile:text-sm mobile:py-1.5'>
                      <div className='flex justify-center items-center gap-x-2'>
                        <BiSolidWallet className='text-white text-xl mobile:text-lg' />
                        <p>Buy now</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })) : (
            <>
            <ProductLoader />
            <ProductLoader />
            <ProductLoader />
            <ProductLoader />
            </>
          )
          }
        </div>
      </section>
      <div className='h-[1px] w-full bg-[#c2c2c2] mt-20'></div>
    </div>
  )
}

export default Page