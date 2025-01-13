"use client"
import { useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { toast } from 'react-toastify';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

const Orders = (props: any) => {

    const [orders, setOrders] = useState<any>([])
    const [products, setProducts] = useState<any>([])

    const fetchOrders = async () => {
        const res = await fetch(`/api/getOrders`, {
            cache: 'no-store',
            headers: {
                "api-key": process.env.NEXT_PUBLIC_API_KEY,
            }
        });
        const result = await res.json();
        setOrders(result);
    };
    useEffect(() => {
        fetchOrders();
    }, []);

    const onClickStatus = async (status: string, id: string) => {
        const res = await fetch(`/api/updateOrderStatus`, {
            method: 'PUT',
            headers: {
                "api-key": process.env.NEXT_PUBLIC_API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: status, orderId: id })
        })
        const result = await res.json()
        setOrders(result)
    }

    const onClickProducts = async (id: any) => {
        const res = await fetch(`/api/getOrderProducts?orderId=${id}`, {
            headers: {
                "api-key": process.env.NEXT_PUBLIC_API_KEY,
            }
        })
        const result = await res.json()
        setProducts(result)
    }

    const onClickCancel = async (id: number) => {
        const response = await fetch(`/api/cancelAllOrders?orderId=${id}`, {
            method: "DELETE",
            headers: {
                "api-key": process.env.NEXT_PUBLIC_API_KEY,
                "Content-Type": "application/json"
            }
        })
        const result = await response.json()
        const temp = orders.filter((item: any) => item.id !== id ? item : false)
        setOrders(temp)
        toast.success('Order canceled', {
            position: "top-right",
            autoClose: 5000, // Closes after 5 seconds
        });
    }


    return (
        <main className='h-[100vh]'>
            <section className="bg-gray-100 h-full flex flex-col gap-y-8 items-center mt-20">
                <h2 className="text-4xl font-bold mt-5">Orders</h2>
                <div className='w-full overflow-x-auto overflow-y-auto h-[80vh]'>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 mobile:px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    ORDER #
                                </th>
                                <th scope="col" className="px-6 py-3 mobile:px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    DATE
                                </th>
                                <th scope="col" className="px-6 py-3 mobile:px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    SHIPPING DETAILS
                                </th>
                                <th scope="col" className="px-6 mobile:px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    ORDER DETAILS
                                </th>
                                <th scope="col" className="px-6 mobile:px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    AMOUNT
                                </th>
                                <th scope="col" className="px-6 py-3 mobile:px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    STATUS
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                (orders?.map((item: any, i: any) => {
                                    return (
                                        <tr key={i}>
                                            <td className="px-6 mobile:px-2 py-4 whitespace-nowrap text-base text-gray-500">{item.id}</td>
                                            <td className="px-6 mobile:px-2 py-4 whitespace-nowrap text-base text-gray-500">{item.orderDate.slice(0, 10)}</td>
                                            <td className="px-6 mobile:px-2 py-4 whitespace-nowrap text-base text-gray-500">

                                                <Dialog>
                                                    <DialogTrigger className=''>
                                                        <BsThreeDots className='ml-11 text-2xl border border-gray-400 rounded-xl hover:bg-gray-100 transition-all duration-100' />
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle className='text-2xl text-center'>Shipping Details</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="overflow-x-auto">
                                                            <table className="table-auto w-full text-left text-gray-800">
                                                                <tbody>
                                                                    {/* Name */}
                                                                    <tr>
                                                                        <th className="pr-4 text-gray-800 font-semibold align-top">Name:</th>
                                                                        <td>{item.orderDetails.name}</td>
                                                                    </tr>
                                                                    {/* Address */}
                                                                    <tr>
                                                                        <th className="pr-4 text-gray-800 font-semibold align-top">Address:</th>
                                                                        <td>
                                                                            {item.orderDetails.address}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="pr-4 text-gray-800 font-semibold align-top">Province:</th>
                                                                        <td>{item.orderDetails.province}</td>
                                                                    </tr>
                                                                    {/* City */}
                                                                    <tr>
                                                                        <th className="pr-4 text-gray-800 font-semibold align-top">City:</th>
                                                                        <td>{item.orderDetails.city}</td>
                                                                    </tr>
                                                                    {/* Zip Code */}
                                                                    <tr>
                                                                        <th className=" text-gray-800 font-semibold align-top">Zip Code:</th>
                                                                        <td>{item.orderDetails.postalCode}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="pr-4 text-gray-800 font-semibold align-top">Contact:</th>
                                                                        <td>{item.orderDetails.contact}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="pr-4 text-gray-800 font-semibold align-top">Instructions:</th>
                                                                        <td>{item.orderDetails.instructions}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                                                <Dialog>
                                                    <DialogTrigger className=''>
                                                        <BsThreeDots onClick={() => onClickProducts(item.id)} className='ml-9 text-2xl border border-gray-400 rounded-xl hover:bg-gray-100 transition-all duration-100' />
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px] min-w-[600px] mobile:min-w-[300px]">
                                                        <DialogHeader>
                                                            <DialogTitle className='text-2xl font-semibold text-center'>Order Details</DialogTitle>
                                                        </DialogHeader>
                                                        <div className='max-h-[50vh] mobile:max-h-[60vh] overflow-y-auto'>

                                                        {products?.map((order: any) => (
                                                            <div
                                                            key={order.id}
                                                            className="flex md:justify-between items-center border-b pb-4 mb-4"
                                                            >
                                                                {/* Order Info */}
                                                                <div className="flex items-center gap-4 w-full">
                                                                    <img
                                                                        src={order.image}
                                                                        alt={order.title}
                                                                        className="w-20 h-20 mobile:w-20 mobile:h-20 object-cover rounded aspect-square"
                                                                    />
                                                                    <div className="px-5 mobile:px-1">
                                                                        <h2 className="text-lg font-semibold mobile:text-sm">
                                                                            {order.title}
                                                                        </h2>
                                                                        <p className="text-gray-800">
                                                                            Quantity: <span className="font-bold">{order.quantity}</span>
                                                                        </p>
                                                                        <p className="text-lg font-bold mt-2">${order.price}</p>
                                                                    </div>
                                                                </div>

                                                                {/* Cancel Button */}
                                                                <div className="flex flex-col items-center">
                                                                    <h3 className='text-2xl font-semibold pr-1'>x{order.quantity}</h3>

                                                                </div>
                                                            </div>
                                                        ))}
                                                        </div>
                                                        <DialogFooter>
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button variant="outline"
                                                                        className={`px-4 py-2 rounded hover:text-white bg-red-500 text-white hover:bg-red-600`}
                                                                    >
                                                                        Cancel Orders
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
                                                                        <AlertDialogAction onClick={() => onClickCancel(item.id)}>Yes</AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </td>
                                            <td className="px-6 mobile:px-2 py-4 whitespace-nowrap text-base text-gray-500">${item.amount}</td>
                                            <td className="px-6 mobile:px-2 py-4 whitespace-nowrap text-base text-gray-500">

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className='pr-1'>{item.status}</DropdownMenuTrigger>
                                                    <DropdownMenuContent className='px-2 w-32'>
                                                        <DropdownMenuItem onClick={() => onClickStatus("Processing", item.id)} className='flex items-center gap-x-3 text-blue-500 text-base'>
                                                            Processing
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => onClickStatus("Packed", item.id)} className='flex items-center gap-x-3 text-yellow-500 text-base'>
                                                            Packed
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => onClickStatus("Dispatched", item.id)} className='flex items-center gap-x-3 text-orange-500 text-base'>
                                                            Dispatched
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => onClickStatus("Shipped", item.id)} className='flex items-center gap-x-3 text-teal-500 text-base'>
                                                            Shipped
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => onClickStatus("Delivered", item.id)} className='flex items-center gap-x-3 text-green-500 text-base'>
                                                            Delivered
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    )
                                }))
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}

export default Orders