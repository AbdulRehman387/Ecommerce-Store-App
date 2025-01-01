// app/dashboard/layout.tsx
import { ReactNode } from "react";
import Link from "next/link";
import { LuMessageSquare, LuUser } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import { AiOutlineProduct } from "react-icons/ai";

const Sidebar = () => (
  <div className="w-[15%] p-4 border border-gray-300 bg-gray-50">
    <nav className="mt-20">
      <h2 className="text-4xl font-bold">Dashboard</h2>
      <ul className="flex flex-col gap-y-4 mt-10">
        <li className="flex items-center gap-x-2">
          <FiShoppingBag className="text-3xl" />
          <Link href="/dashboard/orders" className="text-2xl font-semibold">
            Orders
          </Link>
        </li>
        <li className="flex items-center gap-x-2">
          <AiOutlineProduct className="text-3xl" />
          <Link href="/dashboard/products" className="text-2xl font-semibold">
            Products
          </Link>
        </li>
        <li className="flex items-center gap-x-2">
          <LuUser className="text-3xl" />
          <Link href="/dashboard/users" className="text-2xl font-semibold">
            Users
          </Link>
        </li>
        <li className="flex items-center gap-x-2">
          <LuMessageSquare className="text-3xl" />
          <Link href="/dashboard/messages" className="text-2xl font-semibold">
            Messages
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 w-[85%] bg-white">{children}</main>
    </div>
  );
}

