"use client";

import { motion } from "framer-motion";

const ORDERS = [
  { id: "ORD-001", customer: "Priya Sharma", email: "priya@example.com", items: 2, amount: 125000, status: "Processing", date: "2026-03-24" },
  { id: "ORD-002", customer: "Rohit Mehra", email: "rohit@example.com", items: 1, amount: 85000, status: "Shipped", date: "2026-03-23" },
  { id: "ORD-003", customer: "Ananya Gupta", email: "ananya@example.com", items: 3, amount: 45000, status: "Delivered", date: "2026-03-22" },
  { id: "ORD-004", customer: "Vikram Singh", email: "vikram@example.com", items: 1, amount: 175000, status: "Pending", date: "2026-03-21" },
  { id: "ORD-005", customer: "Meera Joshi", email: "meera@example.com", items: 2, amount: 32000, status: "Cancelled", date: "2026-03-20" },
];

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-[#442a22]">Orders</h1>
        <p className="font-sans text-sm text-[#5e604d] mt-1">Manage and track customer orders</p>
      </div>

      <div className="bg-[#f5f5dc] rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left font-sans text-xs text-[#5e604d] uppercase tracking-wider">
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Items</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-t border-[#d4c3be]/10 font-sans text-sm"
                >
                  <td className="px-6 py-4 text-[#442a22] font-semibold">{order.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-[#1b1d0e]">{order.customer}</p>
                    <p className="text-xs text-[#827470]">{order.email}</p>
                  </td>
                  <td className="px-6 py-4 text-[#5e604d]">{order.items}</td>
                  <td className="px-6 py-4 text-[#735c00] font-semibold">₹{order.amount.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-4 text-[#5e604d]">{order.date}</td>
                  <td className="px-6 py-4">
                    <select className="bg-white border border-[#d4c3be]/30 rounded px-2 py-1 font-sans text-xs focus:border-[#D4AF37] focus:outline-none">
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
