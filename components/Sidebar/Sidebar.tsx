// app/dashboard/layout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import { LuMessageSquare } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { AiOutlineProduct } from "react-icons/ai";


const Sidebar = () => (
    <div className="w-[15%] h-full fixed bg-white p-4 border border-gray-300">
        <nav className='mt-20'>
            <h2 className='text-4xl font-bold'>Dashboard</h2>
            <ul className='flex flex-col gap-y-4 mt-10'>
                <li className='flex items-center gap-x-1'><FiShoppingBag className='text-3xl' /><Link href="/dashboard/orders" className='text-2xl font-semibold'>Orders</Link></li>
                <li className='flex items-center gap-x-1'><AiOutlineProduct className='text-3xl' /><Link href="/dashboard/products" className='text-2xl font-semibold'>Products</Link></li>
                <li className='flex items-center gap-x-1'><LuUser className='text-3xl' /><Link href="/dashboard/users" className='text-2xl font-semibold'>Users</Link></li>
                <li className='flex items-center gap-x-1'><LuMessageSquare className='text-3xl' /><Link href="/dashboard/messages" className='text-2xl font-semibold'>Messages</Link></li>
            </ul>
        </nav>
    </div>
);

export default Sidebar