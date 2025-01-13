"use client"
import React, { useState } from 'react'
import { contactSchema } from '@/schema/schemas'
import { toast } from 'react-toastify'

const Page = () => {
    const [message, setMessage] = useState({
        name: "",
        email: "",
        contact: "",
        message: ""
    })
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState("")

    const onChangeHandler = (e: any) => { 
        setError("")
        setMessage({ ...message, [e.target.name]: e.target.value }) 
    }

    const onClickHandler = async () => {
        contactSchema.validate(message, { abortEarly: false })
            .then((res) => {
                setLoader(true)
                fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        "api-key": process.env.NEXT_PUBLIC_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(message),
                })
                    .then((res) => res.json())
                    .then((result) => {
                        if (result.message === "success") {
                            setMessage({
                                name: "",
                                email: "",
                                contact: "",
                                message: ""
                            })
                        }
                        setLoader(false)
                        toast.success('Message sent', {
                            position: "top-right",
                            autoClose: 5000, // Closes after 5 seconds
                          });
                    })
            })
            .catch((err) => setError(err.errors[0]))

    }
    return (
        <div>
            <div className='flex flex-col justify-center items-center bg-gray-100 px-4 py-28'>
                <div className='text-gray-900 text-5xl font-bold mb-16 mt-10'>Contact Us</div>
                <div className='mb-4 w-full max-w-lg'>
                    <input
                        onChange={onChangeHandler}
                        className='flex-grow text-left p-4 border border-black rounded-sm w-full focus:outline-none focus:ring-2 focus:ring-black transition-shadow duration-200'
                        type="text"
                        name='name'
                        value={message.name}
                        placeholder="Name"
                        aria-label="Username" // Added aria-label for accessibility
                        required // Mark as required
                    />
                </div>
                <div className='mb-4 w-full max-w-lg'>
                    <input
                        onChange={onChangeHandler}
                        className='flex-grow text-left p-4 border border-black rounded-sm w-full focus:outline-none focus:ring-2 focus:ring-black transition-shadow duration-200'
                        type="email"
                        name='email'
                        value={message.email}
                        placeholder="Email"
                        aria-label="Email address" // Added aria-label for accessibility
                        required // Mark as required
                    />
                </div>
                <div className='mb-4 w-full max-w-lg'>
                    <input
                        onChange={onChangeHandler}
                        className='flex-grow text-left p-4 border border-black rounded-sm w-full focus:outline-none focus:ring-2 focus:ring-black transition-shadow duration-200'
                        type="text"
                        name='contact'
                        value={message.contact}
                        placeholder="Phone Number"
                        aria-label="Password" // Added aria-label for accessibility
                        required // Mark as required
                    />
                </div>
                <div className='mb-4 w-full max-w-lg'>
                    <textarea
                        onChange={onChangeHandler}
                        className='flex-grow text-left p-4 border border-black rounded-sm w-full focus:outline-none focus:ring-2 focus:ring-black transition-shadow duration-200 h-40'
                        placeholder="Message"
                        name='message'
                        value={message.message}
                        aria-label="Email address" // Added aria-label for accessibility
                        required // Mark as required
                    />
                </div>
                <h3 className="text-red-500 mb-3">{error}</h3>
                <button onClick={onClickHandler} className='bg-black text-white px-4 py-3 w-40 max-w-xs rounded-sm duration-300 hover:scale-105'>
                    {loader ? "Submitting..." : "Submit"}
                </button>
            </div>
            <div className='h-[1px] w-full bg-[#c2c2c2]'></div>
        </div>
    )
}

export default Page