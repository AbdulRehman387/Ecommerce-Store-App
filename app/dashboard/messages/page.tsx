"use client"
import { useEffect, useState } from 'react'

const Messages = (props: any) => {

    const [messages, setMessages] = useState<any>([])

    useEffect(() => {
        const fetchMessages = async () => {
            const res = await fetch(`/api/contact`, {
                cache: 'no-store',
            });
            const result = await res.json()
            setMessages(result)
        }
        fetchMessages()
    }, [])

    return (
        <main className='h-[100vh] overflow-y-scroll'>
            <section className="bg-gray-100 h-full flex flex-col gap-y-8 items-center mt-20">
                <h2 className="text-4xl font-bold mt-5">Messages</h2>
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
                            <th scope="col" className="mobile:hidden px-6 mobile:px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                EMAIL
                            </th>
                            <th scope="col" className="mobile:hidden px-6 mobile:px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                CONTACT
                            </th>
                            <th scope="col" className="px-6 py-3 mobile:px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                MESSAGE
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            (messages?.map((item: any, i: any) => {
                                return (
                                    <tr key={i}>
                                        <td className="px-6 mobile:px-2 py-4 text-base text-gray-500">{item.id}</td>
                                        <td className="px-6 mobile:px-2 py-4 whitespace-nowrap text-base text-gray-500">{item.date.slice(0,10)}</td>
                                        <td className="px-6 mobile:px-2 py-4 whitespace-nowrap text-base text-gray-500">{item.name}</td>
                                        <td className="mobile:hidden px-6 py-4 whitespace-nowrap text-base text-gray-500">{item.email}</td>
                                        <td className="px-6 mobile:px-2 py-4 text-base text-gray-500">{item.contact}</td>
                                        <td className="px-6 mobile:px-2 py-4 text-base text-gray-500">{item.message}</td>
                                    </tr>
                                )
                            }))
                        }
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default Messages