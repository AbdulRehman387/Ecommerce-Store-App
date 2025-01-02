import Sidebar from "@/components/Sidebar/Sidebar";
import { ReactNode } from "react";


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 w-[85%] bg-white">{children}</main>
    </div>
  );
}

