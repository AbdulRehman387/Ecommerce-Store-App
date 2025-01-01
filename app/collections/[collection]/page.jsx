"use client"
import React from 'react'
import { MdArrowForward } from 'react-icons/md'
import { useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { toast } from 'react-toastify'

const Page = ({ params }) => {
  const [products, setProducts] = React.useState([])
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(json => {
        const temp = json.filter((item) => item.category === params.collection)
        setProducts(temp)
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
      <section className='flex flex-col justify-center items-center mt-20 gap-y-20 bg-gray-100 mobile:mt-5'>
        <div className='flex flex-col justify-center items-center mt-20 gap-y-4'>
          <h1 className='text-5xl font-semibold text-center mobile:text-3xl'>{params.collection.charAt(0).toUpperCase() + params.collection.slice(1)}</h1>
          <p className='text-lg text-[#919191] text-center mobile:text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        </div>
        <div className='grid grid-cols-4 justify-center items-center gap-x-5 gap-y-10 laptop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-2 mobile:gap-x-3'>
          {
            products?.map((item) => {
              return (
                <div key={item.id} className="bg-white w-[300px] overflow-hidden max-w-sm py-5 text-[#5a5757] mobile:w-[45vw] mobile:py-2">
                  <div className="relative flex justify-center">
                    <img className="h-[200px]" src={item.image} alt="Product Image" />
                    <div className="absolute bottom-0 left-0 bg-red-500 text-white px-3 py-0.5 m-2 rounded-full text-sm">Sale
                    </div>
                  </div>
                  <div className="p-4 mobile:p-1">
                    <h3 className="text-lg font-medium mb-2 mobile:text-sm">Silicon Power 256GB SSD</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg mobile:text-sm">${item.price}</span>
                      <div className='flex justify-center items-center cursor-pointer group'>
                        <button onClick={() => onClickHandler(item.id)} className='mobile text-sm group-hover:text-gray-900 group-active:text-gray-400'>Add to cart</button>
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
      <div className='h-[1px] w-full bg-[#c2c2c2] mt-20'></div>
    </div>
  )
}

export default Page