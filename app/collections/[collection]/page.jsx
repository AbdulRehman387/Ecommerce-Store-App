"use client"
import React from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { BiSolidWallet } from 'react-icons/bi';
import ProductLoader from '@/components/ProductLoader/ProductLoader'

const Page = ({ params }) => {
  const { data: session, state } = useSession()
  const [products, setProducts] = React.useState([])
  useEffect(() => {
    fetch('/api/products', {
      headers: {
        "api-key": process.env.NEXT_PUBLIC_API_KEY,
      }
    })
      .then(res => res.json())
      .then(json => {
        const temp = json.filter((item) => item.category === params.collection)
        setProducts(temp)
      })
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
          "api-key": process.env.NEXT_PUBLIC_API_KEY,
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
      <section className='flex flex-col justify-center items-center mt-20 gap-y-20 bg-gray-100 mobile:mt-5'>
        <div className='flex flex-col justify-center items-center mt-20 gap-y-4'>
          <h1 className='text-5xl font-semibold text-center mobile:text-3xl'>{params.collection.charAt(0).toUpperCase() + params.collection.slice(1)}</h1>
          <p className='text-lg text-[#919191] text-center mobile:text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        </div>
        <div className='grid grid-cols-4 justify-center items-center gap-x-5 gap-y-10 laptop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-2 mobile:gap-x-3'>
          {
            products.length !== 0 ? (products?.map((item) => {
              return (
                <div key={item.id} className="bg-white w-[300px] overflow-hidden max-w-sm py-5 text-[#5a5757] mobile:w-[45vw] mobile:py-2">
                  <Link href={`/products/${item.id}`} className="relative flex justify-center">
                    <img className="h-[200px] mobile:h-[150px]" src={item.image} alt="Product Image" />
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
            })):(
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