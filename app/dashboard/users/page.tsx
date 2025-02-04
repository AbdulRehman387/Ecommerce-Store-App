"use client"
import { useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { toast } from 'react-toastify';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { userSchema } from '@/schema/schemas';

const Users = (props: any) => {
    const [orders, setOrders] = useState<any>([])
    const [users, setUsers] = useState<any>([])
    const [cart, setCart] = useState<any>([])
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        isAdmin: false,
    })
    const [error, setError] = useState("")
    const [loader, setLoader] = useState(false)

    const fetchUsers = async () => {
        const res = await fetch(`/api/getUsers`, {
            cache: 'no-store',
            headers: {
                "api-key": process.env.NEXT_PUBLIC_API_KEY,
            }
        });
        const result = await res.json();
        setUsers(result);
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    
    const onChangeHandler = async (e: any) => {
        setError("")
        setForm((prevForm: any) => ({
            ...prevForm,
            [e.target.name]:
                e.target.name === "isAdmin"
                    ? (e.target.value === "admin" ? true : false)
                    : (e.target.value)
        }));
        console.log(form);
    }
    const onClickHandler = async () => {
        userSchema.validate(form, { abortEarly: false })
        .then((res: any) => {
                setLoader(true)
                fetch("/api/signup", {
                    method: "POST",
                    headers: {
                        "api-key": process.env.NEXT_PUBLIC_API_KEY,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ...form, provider: "credentials" })
                })
                    .then((res) => res.json())
                    .then((res) => {
                        if (res.message === "success") {
                            setLoader(false)
                            setUsers([...users, { ...res.user, email: form.email }])
                            setForm({
                                username: "",
                                email: "",
                                password: "",
                                isAdmin: form.isAdmin,
                            })
                            toast.success('User added', {
                                position: "top-right",
                                autoClose: 5000, // Closes after 5 seconds
                            });
                        }
                        else if (res.message === "error") {
                            setLoader(false)
                            setError("email already exists")
                        }
                    })
            })
            .catch((err: any) => setError(err.errors[0]))
    }

    const onClickOrders = async (id: any) => {
        const res = await fetch(`/api/getUserOrders2?userId=${id}`, {
            headers: {
                "api-key": process.env.NEXT_PUBLIC_API_KEY,
            }
        })
        const result = await res.json()
        setOrders(result)
    }
    const onClickCart = async (id: any) => {
        const res = await fetch(`/api/getUserCart?userId=${id}`, {
            headers: {
                "api-key": process.env.NEXT_PUBLIC_API_KEY,
            }
        })
        const result = await res.json()
        setCart(result)
    }


    return (
        <main className='h-[100vh]'>
            <section className="bg-gray-100 h-full flex flex-col gap-y-8 items-center mt-20">
                <h2 className="text-4xl font-bold mt-5">Users</h2>
                <div className='w-full overflow-x-auto h-[80vh] overflow-y-auto'>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 mobile:px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 mobile:px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    PROFILE
                                </th>
                                <th scope="col" className="px-6 mobile:px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    ORDERS
                                </th>
                                <th scope="col" className="px-6 mobile:px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    CART
                                </th>
                                <th scope="col" className="px-6 py-3 mobile:px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    PROVIDER
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                (users?.map((item: any, i: any) => {
                                    return (
                                        <tr key={i}>
                                            <td className="px-6 mobile:px-2 py-4 whitespace-nowrap text-base text-gray-500">{item.id}</td>
                                            <td className="px-6 mobile:px-2 py-4 whitespace-nowrap text-base text-gray-500 w-[450px] mobile:w-[1200px]">
                                                <Dialog>
                                                    <DialogTrigger className='flex items-center gap-x-2 mobile:w-[290px] tablet:w-[350px]'>

                                                        <div className='px-0'>
                                                            <img src={item.image} className="w-14 h-14 rounded-full mobile:w-10 mobile:h-10" alt="" />
                                                        </div>
                                                        <div className='flex flex-col'>
                                                            <div className='px-1 text-xl text-left py-0 mobile:text-lg'>{item.username.length <= 16 ? (item.username) : (item.username.slice(0, 16) + "...")}</div>
                                                            <div className='px-1 py-0 text-base text-left font-medium text-gray-500 mobile:text-sm'>{item.email.length <= 25 ? (item.email) : (item.email.slice(0, 25) + "...")}</div>
                                                        </div>

                                                    </DialogTrigger>
                                                    <DialogContent className="w-auto mobile:max-w-[425px] mobile:min-w-[350px]">
                                                        <DialogHeader className='flex items-center gap-x-2'>
                                                            <a href={item.image} target='_blank'>
                                                                <img src={item.image} alt="" className='rounded-full w-28 h-28 mobile:w-20 mobile:h-20' /></a>
                                                        </DialogHeader>
                                                        <div className="">
                                                            <table className="table-auto w-full text-left text-gray-800 text-xl">
                                                                <tbody>
                                                                    {/* Name */}
                                                                    <tr>
                                                                        <th className="pr-4 text-gray-800 font-semibold align-top w-28">Name:</th>
                                                                        <td style={{ overflowWrap: "anywhere" }} className='mobile:text-lg'>{item.username}</td>
                                                                    </tr>
                                                                    {/* Address */}
                                                                    <tr>
                                                                        <th className="pr-4 text-gray-800 font-semibold align-top mobile:text-lg">Email:</th>
                                                                        <td style={{ overflowWrap: "anywhere" }} className='mobile:text-lg'>
                                                                            {item.email}
                                                                        </td>
                                                                    </tr>
                                                                    <tr className='mobile:text-lg' style={{ display: item.password ? '' : "none"}}>
                                                                        <th className="pr-4 text-gray-800 font-semibold align-top">Password:</th>
                                                                        <td style={{overflowWrap: "anywhere"}}>{item.password}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="pr-4 text-gray-800 font-semibold align-top mobile:text-lg">Role:</th>
                                                                        <td className='mobile:text-lg'>{item.isAdmin ? "Admin" : "User"}</td>
                                                                    </tr>
                                                                    {/* City */}
                                                                    {/* Zip Code */}

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>

                                            </td>
                                            <td className="px-6 mobile:px-2 py-4 whitespace-nowrap text-base text-gray-500">

                                                <Dialog>
                                                    <DialogTrigger className=''>
                                                        <BsThreeDots onClick={() => onClickOrders(item.id)} className='ml-4 text-2xl border border-gray-400 rounded-xl hover:bg-gray-100 transition-all duration-100' />
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px] min-w-[600px] mobile:min-w-[300px]">
                                                        <DialogHeader>
                                                            <DialogTitle className='text-2xl font-semibold text-center'>Orders</DialogTitle>
                                                        </DialogHeader>
                                                        <div className='max-h-[50vh] mobile:max-h-[60vh] overflow-y-auto'>
                                                            {orders.length > 0 ? (orders?.map((order: any) => (
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
                                                                                Status: <span className="font-bold text-green-600">{order.status}</span>
                                                                            </p>
                                                                            <p className="text-lg font-bold mt-2">${order.price}</p>
                                                                        </div>
                                                                    </div>

                                                                    {/* Cancel Button */}
                                                                    <div className="flex flex-col items-center">
                                                                        <h3 className='text-2xl font-semibold'>x{order.quantity}</h3>

                                                                    </div>
                                                                </div>
                                                            ))) : (<div className='text-center text-red-600 text-xl'>No Orders</div>)}
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </td>
                                            <td className="px-6 mobile:px-2 py-4 whitespace-nowrap text-base text-gray-500">

                                                <Dialog>
                                                    <DialogTrigger className=''>
                                                        <BsThreeDots onClick={() => onClickCart(item.id)} className='ml-2 text-2xl border border-gray-400 rounded-xl hover:bg-gray-100 transition-all duration-100' />
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px] min-w-[600px] mobile:min-w-[300px]">
                                                        <DialogHeader>
                                                            <DialogTitle className='text-2xl font-semibold text-center'>Cart</DialogTitle>
                                                        </DialogHeader>
                                                        <div className='max-h-[50vh] mobile:max-h-[60vh] overflow-y-auto'>
                                                            {cart.length > 0 ? (cart?.map((order: any) => (
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
                                                                            <p className="text-base text-gray-500">{order.description.slice(0, 70)}</p>
                                                                            <p className="text-lg font-bold mt-2">${order.price}</p>
                                                                        </div>
                                                                    </div>


                                                                </div>
                                                            ))) : (<div className='text-center text-red-600 text-xl'>Cart is empty</div>)}
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </td>
                                            <td className="px-6 mobile:px-2 py-4 whitespace-nowrap text-base text-gray-500 pr-1">
                                                {item.provider.charAt(0).toUpperCase() + item.provider.slice(1)}
                                            </td>
                                        </tr>
                                    )
                                }))
                            }
                        </tbody>
                    </table>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className='fixed top-28 right-10 mobile:top-32 mobile:right-3 text-lg py-5 mobile:py-0 mobile:text-sm  mobile:px-1'>Add User</Button>
                        </DialogTrigger>
                        <DialogContent className="w-[600px] mobile:w-auto min-w-[350px]">
                            <DialogHeader>
                                <DialogTitle className='text-center text-2xl font-semibold'>User Details</DialogTitle>
                                <DialogDescription>
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4 mobile:grid-cols-3">
                                    <Label htmlFor="name" className="text-left text-lg font-semibold mobile:text-base">
                                        Username:
                                    </Label>
                                    <Input onChange={onChangeHandler} name='username' value={form.username} id="name" className="col-span-3 mobile:col-span-2" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4 mobile:grid-cols-3">
                                    <Label htmlFor="username" className="text-left text-lg font-semibold mobile:text-base">
                                        Email:
                                    </Label>
                                    <Input onChange={onChangeHandler} name='email' value={form.email} id="username" className="col-span-3 mobile:col-span-2" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4 mobile:grid-cols-3">
                                    <Label htmlFor="username" className="text-left text-lg font-semibold mobile:text-base">
                                        Password:
                                    </Label>
                                    <Input onChange={onChangeHandler} name='password' value={form.password} id="username" className="col-span-3 mobile:col-span-2" />
                                </div>
                                <div className='flex items-center gap-x-[100px] mobile:gap-x-[60px]'>
                                    <label className='text-lg font-semibold' htmlFor="role">Role:</label>
                                    <div className='flex gap-x-5'>
                                        <label>
                                            <input
                                                className='mr-1 accent-black'
                                                type="radio"
                                                name="isAdmin"
                                                value="user"
                                                checked={form.isAdmin === false}
                                                onChange={onChangeHandler}
                                            />
                                            User
                                        </label>
                                        <label>
                                            <input
                                                className='mr-1 accent-black'
                                                type="radio"
                                                name="isAdmin"
                                                value="admin"
                                                checked={form.isAdmin === true}
                                                onChange={onChangeHandler}
                                            />
                                            Admin
                                        </label>
                                    </div>
                                </div>


                                <h3 className="text-red-500 mb-3">{error}</h3>
                            </div>
                            <DialogFooter>
                                <Button onClick={onClickHandler}>{loader ? "Adding user...":"Add user"}</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </section>
        </main>
    )
}

export default Users