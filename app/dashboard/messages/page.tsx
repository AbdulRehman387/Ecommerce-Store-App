"use client"
import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const Messages = () => {

    const [messages, setMessages] = useState<any>([])

    useEffect(() => {
        const fetchMessages = async () => {
            const res = await fetch(`/api/contact`, {
                cache: 'no-store',
                headers: {
                    "api-key": process.env.NEXT_PUBLIC_API_KEY,
                }
            });
            const result = await res.json()
            setMessages(result)
        }
        fetchMessages()
    }, [])

    return (
        <main className='h-[100vh]'>
            <section className="bg-gray-100 h-full flex flex-col gap-y-8 items-center mt-20">
                <h2 className="text-4xl font-bold mt-5">Messages</h2>
                <div className='w-full overflow-x-auto overflow-y-auto h-[80vh]'>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 mobile:px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    S/N
                                </th>
                                <th scope="col" className="px-6 py-3 mobile:px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    DATE
                                </th>
                                <th scope="col" className="px-6 py-3 mobile:px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    NAME
                                </th>
                                <th scope="col" className="px-6 mobile:px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    EMAIL
                                </th>
                                <th scope="col" className="px-6 mobile:px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    CONTACT
                                </th>
                                <th scope="col" className="px-6 py-3 mobile:px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    MESSAGE
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                messages?.map((item: any, i: any) => {
                                    return (
                                        <tr key={i}>
                                            <td className="px-6 mobile:px-2 py-4 text-base text-gray-500">{i+1}</td>
                                            <td className="px-6 mobile:px-2 py-4 whitespace-nowrap text-base text-gray-500">{item.date.slice(0, 10)}</td>
                                            <td className="px-6 mobile:px-2 py-4 whitespace-nowrap text-base text-gray-500">{item.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">{item.email}</td>
                                            <td className="px-6 mobile:px-2 py-4 text-base text-gray-500">{item.contact}</td>
                                            <td className="px-6 mobile:px-2 py-4 text-base text-gray-500">
                                                <Dialog>
                                                    <DialogTrigger className=' w-[300px]'>
                                                        <p className='text-start'>{item.message.length > 80 ? (item.message.slice(0, 80)+"..."):(item.message)}</p>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle className='text-2xl text-center'>Message</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="">
                                                            <p>{item.message}</p>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </td>                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}

export default Messages