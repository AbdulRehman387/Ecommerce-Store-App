"use client"
import { useState } from "react";
import { ReactNode } from "react";
import Link from "next/link";
import { LuMessageSquare, LuUser } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import { AiOutlineProduct } from "react-icons/ai";


const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const links = [
    { icon: <FiShoppingBag />, text: "Orders", href: "/dashboard/orders" },
    { icon: <AiOutlineProduct />, text: "Products", href: "/dashboard/products" },
    { icon: <LuUser />, text: "Users", href: "/dashboard/users" },
    { icon: <LuMessageSquare />, text: "Messages", href: "/dashboard/messages" },
  ];

  return (
    <div
      className={`h-screen bg-gray-100 border-r border-gray-300 text-black transition-width duration-300 ${isExpanded ? "w-56" : "w-16"
        } mobile:${isExpanded ? "w-44" : "w-16"} flex flex-col items-start`}
    >
      <button
        onClick={toggleSidebar}
        className="text-3xl p-4 focus:outline-none hover:bg-gray-200 mt-20"
      >
        ☰
      </button>
      <div className="flex flex-col mt-4 space-y-2 mobile:space-y-1">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="flex items-center p-3 hover:bg-gray-200 rounded-md text-2xl font-semibold mobile:text-xl"
          >
            <span className="text-3xl mobile:text-2xl">{link.icon}</span>
            {isExpanded ? <span className="ml-4">{link.text}</span> : null}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar