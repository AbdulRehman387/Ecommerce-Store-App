"use client"
import { getSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

const Page = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const session = await getSession()
            const response = await fetch(`/api/getUserOrders?userId=${session?.user?.id}`)
            const result = await response.json()
            setProducts(result)
        }
        fetchProducts()
    }, [])

    const onClickHandler = async (id) => {
        const temp = products.filter((item) => item.productId !== id ? item : false)
        setProducts(temp)
        const response = await fetch("/api/cancelOrder", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ orderId: products[0].orderId, productId: id })
        })
        toast.success('Order canceled', {
            position: "top-right",
            autoClose: 5000, // Closes after 5 seconds
        });
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex justify-center mt-20">
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
                <h1 className="text-5xl font-bold mb-6 text-center">Orders</h1>

                {products?.map((order) => (
                    <div
                        key={order.id}
                        className="flex md:justify-between items-center border-b pb-4 mb-4"
                    >
                        {/* Order Info */}
                        <div className="flex items-center gap-4 w-full">
                            <img
                                src={order.image}
                                alt={order.title}
                                className="w-32 h-32 mobile:w-20 mobile:h-20 object-cover rounded aspect-square"
                            />
                            <div className="px-5 mobile:px-1">
                                <h2 className="text-lg font-semibold mobile:text-sm">
                                    {order.title}
                                </h2>
                                <p className="text-gray-500">
                                    Status: <span className="font-semibold text-green-600">{order.status}</span>
                                </p>
                                <p className="text-lg font-bold mt-2">${order.price}</p>
                            </div>
                        </div>

                        {/* Cancel Button */}
                        <div className="flex flex-col items-center">

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline"
                                        disabled={order.status !== "Processing"} // Condition to disable button
                                        className={`px-4 py-2 rounded hover:text-white ${order.status === "Processing"
                                            ? "bg-red-500 text-white hover:bg-red-600"
                                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                            }`}
                                    >
                                        Cancel
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Cancel order?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to cancel this order?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>No</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => onClickHandler(order.productId)}>Yes</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                ))}

                {/* No Orders Message */}
                {products.length === 0 && (
                    <div className="text-center text-xl py-10 text-red-500">
                        <p>No orders found!</p>
                    </div>
                )}
            </div>
        </div>

    )
}

export default Page