"use client"
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(0)
  const [error, setError] = useState("")
  const router = useRouter()

  const fetchProducts = async () => {
    console.log("fetch products");
    const session = await getSession()
    const res2 = await fetch(`/api/cart?userId=${session?.user?.id}`)
    const result = await res2.json()
    console.log(result);

    setProducts(result)

    let tempPrice = 0
    for (let i = 0; i < result.length; i++) {
      tempPrice += result[i]?.price
    }
    setPrice(tempPrice)
  }

  useEffect(() => {
    fetchProducts()
  }, []);

  const onClickRemoveHandler = async (id) => {
    const temp = products.filter((item) => item.id !== id ? item : false)
    console.log(id);
    setProducts(temp)
    let tempPrice = 0
    for (let i = 0; i < temp.length; i++) {
      tempPrice += temp[i]?.price
    }
    setPrice(tempPrice)
    const session = await getSession()
    const response = await fetch('/api/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productId: id,
        userId: session?.user?.id,
        products: "one"
      }),
    });
  }
  const onClickHandler = () => {
    if (products.length === 0) {
      toast.error('Cart is empty', {
        position: "top-right",
        autoClose: 3000, // Closes after 3 seconds
      });
    }
    else {
      router.push("/checkout")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center mt-20">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-5xl font-bold mb-6 text-center">Cart</h1>

        {products?.map((item) => {
          return (
            <div key={item.id} className="flex md:justify-between items-center border-b pb-4 mb-4">
              <div className="flex items-center gap-4 w-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-32 mobile:w-20 mobile:h-20 object-cover rounded aspect-square"
                />
                <div className="px-5 mobile:px-1">
                  <h2 className="text-lg font-semibold mobile:text-sm">{item.title}</h2>
                  <p className="text-gray-500 mobile:hidden">
                    {item.description.slice(0, 100)}...
                  </p>
                  <p className="text-lg font-bold mt-2">${item.price}</p>
                </div>
              </div>
              <div className="flex space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
                <button onClick={() => onClickRemoveHandler(item.id)} className="text-red-500 hover:text-red-700"><FaTrash className="text-2xl mobile:text-xl" /></button>
              </div>
            </div>
          )
        })}
        {products.length === 0 && (
          <div className="text-center text-xl py-10 text-red-500">
            <p>Cart is empty!</p>
          </div>
        )}

        <div className="flex justify-between items-center mt-6 space-y-4 md:space-y-0">
          <div onClick={onClickHandler}><button className="bg-black text-white py-2 px-6 hover:scale-105 transition-all duration-100 ease-in-out w-full md:w-auto">
            Checkout
          </button></div>
          <div className="text-lg font-semibold text-right w-full md:w-auto">
            <span>Total:</span> ${price.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
