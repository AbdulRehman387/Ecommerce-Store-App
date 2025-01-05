"use client"
import Sidebar from '@/components/Sidebar/Sidebar'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MdDelete } from 'react-icons/md'
import { productSchema } from '@/schema/schemas'

const Products = (props: any) => {
    const [error, setError] = useState("")
    const[loader, setLoader] = useState(false)
    const [products, setProducts] = useState<any>([])
    const [form, setForm] = useState<any>({
        title: "",
        description: "",
        category: "",
        price: "",
        image: ""
    })

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`/api/products`, {
                cache: 'no-store',
            });
            const result = await res.json()
            setProducts(result)
        }
        fetchProducts()
    }, [])

    const onChangeHandler = async (e: any) => {
        setError("")
        setForm((prevForm: any) => ({
            ...prevForm,
            [e.target.name]:
                e.target.name === "price"
                    ? e.target.value.replace(/[^0-9.]/g, "")
                    : e.target.value,
        }));
    }
    const onClickHandler = async () => {
        productSchema.validate(form, { abortEarly: false })
            .then((res) => {
                setLoader(true)
                const finalForm = {
                    ...form,
                    price: parseFloat(form.price),
                };
                fetch("/api/products", {
                    method: "POST",
                    body: JSON.stringify(finalForm),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then((res) => res.json())
                    .then((result) => {
                        setProducts([...products, result[0]])
                        setForm({
                            title: "",
                            description: "",
                            category: "",
                            price: "",
                            image: ""
                        })
                        setLoader(false)
                        toast.success('Product added', {
                            position: "top-right",
                            autoClose: 5000, // Closes after 5 seconds
                        });
                    })
            })
            .catch((err) => setError(err.errors[0]))
    }

    const onClickDelete = async (id: any) => {
        const temp = products.filter((item: any) => item.id !== id)
        setProducts(temp)
        const res = await fetch(`/api/products?productId=${id}`, {
            method: "DELETE",
        })
        const result = await res.json()
        toast.success('Product deleted', {
            position: "top-right",
            autoClose: 3000, // Closes after 5 seconds
        });
    }

    return (
        <main className='h-[100vh]'>
            <section className="bg-gray-100 h-full flex flex-col gap-y-8 items-center mt-20">
                <h2 className="text-4xl font-bold mt-5">Products</h2>
                <div className='w-full overflow-x-auto overflow-y-auto h-[80vh]'>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 mobile:px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 mobile:px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    IMAGE
                                </th>
                                <th scope="col" className="px-6 py-3 mobile:px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    TITLE
                                </th>
                                <th scope="col" className="px-6 mobile:px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    DESCRIPTION
                                </th>
                                <th scope="col" className="px-6 mobile:px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    CATEGORY
                                </th>
                                <th scope="col" className="px-6 py-3 mobile:px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    PRICE
                                </th>
                                <th scope="col" className="px-6 py-3 mobile:px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">

                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                (products?.map((item: any, i: any) => {
                                    return (
                                        <tr key={i}>
                                            <td className="px-6 mobile:px-2 py-4 text-base text-gray-500">{item.id}</td>
                                            <td className="px-6 mobile:px-2 whitespace-nowrap text-base text-gray-500">
                                                <img src={item.image} alt="" className='w-16 h-16' />
                                            </td>
                                            <td className="px-6 mobile:px-2 py-4 text-base text-gray-500">{item.title}</td>
                                            <td className="px-6 mobile:px-2 py-4 text-base text-gray-500">
                                                <Dialog>
                                                    <DialogTrigger className=''>
                                                        <p className='text-start'>{item.description.length > 80 ? (item.description.slice(0, 80)+"..."):(item.description)}</p>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle className='text-2xl text-center'>Description</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="">
                                                            <p>{item.description}</p>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </td>
                                            <td className="px-6 mobile:px-2 py-4 text-base text-gray-500">{item.category}</td>
                                            <td className="px-6 mobile:px-2 py-4 text-base text-gray-500">${item.price}</td>
                                            <td className="px-6 mobile:px-2 py-4 text-base text-gray-500">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <MdDelete className='text-3xl cursor-pointer hover:scale-110 transition-all duration-100 text-red-600' />
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete this product?
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>No</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => onClickDelete(item.id)}>Yes</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </td>
                                        </tr>
                                    )
                                }))
                            }
                        </tbody>
                    </table>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className='fixed top-28 right-10 mobile:top-36 mobile:right-1 text-lg py-5 mobile:py-0 mobile:text-sm  mobile:px-1'>Add Product</Button>
                    </DialogTrigger>
                    <DialogContent className="w-[600px] mobile:w-auto min-w-[350px]">
                        <DialogHeader>
                            <DialogTitle className='text-center text-2xl font-semibold'>Product Details</DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4 mobile:grid-cols-3">
                                <Label htmlFor="name" className="text-left text-lg font-semibold mobile:text-base">
                                    Title:
                                </Label>
                                <Input onChange={onChangeHandler} name='title' value={form.title} id="name" className="col-span-3 mobile:col-span-2" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4 mobile:grid-cols-3">
                                <Label htmlFor="username" className="text-left text-lg font-semibold mobile:text-base">
                                    Description:
                                </Label>
                                <Input onChange={onChangeHandler} name='description' value={form.description} id="username" className="col-span-3 mobile:col-span-2" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4 mobile:grid-cols-3">
                                <Label htmlFor="username" className="text-left text-lg font-semibold mobile:text-base">
                                    Category:
                                </Label>
                                <Input onChange={onChangeHandler} name='category' value={form.category} id="username" className="col-span-3 mobile:col-span-2" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4 mobile:grid-cols-3">
                                <Label htmlFor="username" className="text-left text-lg font-semibold mobile:text-base">
                                    Price:
                                </Label>
                                <Input onChange={onChangeHandler} name='price' value={form.price} id="username" className="col-span-3 mobile:col-span-2" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4 mobile:grid-cols-3">
                                <Label htmlFor="username" className="text-left text-lg font-semibold mobile:text-base">
                                    Image URL:
                                </Label>
                                <Input onChange={onChangeHandler} name='image' value={form.image} id="username" className="col-span-3 mobile:col-span-2" />
                            </div>
                            <h3 className="text-red-500 mb-3">{error}</h3>
                        </div>
                        <DialogFooter>
                            <Button onClick={onClickHandler}>{loader ? "Adding product...":"Add product"}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </section>
        </main>
    )
}

export default Products