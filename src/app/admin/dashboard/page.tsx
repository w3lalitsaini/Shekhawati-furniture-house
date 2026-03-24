"use client";

import { motion } from "framer-motion";
import { Package, ShoppingBag, Users, TrendingUp, IndianRupee, ArrowUpRight } from "lucide-react";

const STATS = [
  { label: "Total Revenue", value: "₹24,50,000", change: "+12%", icon: IndianRupee, color: "text-[#D4AF37]", bg: "bg-[#D4AF37]/10" },
  { label: "Total Orders", value: "156", change: "+8%", icon: ShoppingBag, color: "text-[#735c00]", bg: "bg-[#735c00]/10" },
  { label: "Total Products", value: "48", change: "+3", icon: Package, color: "text-[#442a22]", bg: "bg-[#442a22]/10" },
  { label: "Total Users", value: "1,240", change: "+24%", icon: Users, color: "text-[#5e604d]", bg: "bg-[#5e604d]/10" },
];

const RECENT_ORDERS = [
  { id: "ORD-001", customer: "Priya Sharma", amount: "₹1,25,000", status: "Processing", date: "Today" },
  { id: "ORD-002", customer: "Rohit Mehra", amount: "₹85,000", status: "Shipped", date: "Yesterday" },
  { id: "ORD-003", customer: "Ananya Gupta", amount: "₹45,000", status: "Delivered", date: "2 days ago" },
  { id: "ORD-004", customer: "Vikram Singh", amount: "₹1,75,000", status: "Pending", date: "3 days ago" },
  { id: "ORD-005", customer: "Meera Joshi", amount: "₹32,000", status: "Processing", date: "3 days ago" },
];

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-[#442a22]">Dashboard</h1>
        <p className="font-sans text-sm text-[#5e604d] mt-1">Welcome to Shekhawati Furniture House Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#f5f5dc] p-6 rounded-md space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-md ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} strokeWidth={1.5} />
              </div>
              <span className="flex items-center gap-1 font-sans text-xs text-green-600">
                {stat.change} <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <div>
              <p className="font-serif text-2xl text-[#442a22]">{stat.value}</p>
              <p className="font-sans text-xs text-[#5e604d] mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-[#f5f5dc] p-8 rounded-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl text-[#442a22]">Revenue Overview</h2>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
            <span className="font-sans text-sm text-[#735c00] font-semibold">+12% this month</span>
          </div>
        </div>
        <div className="h-48 flex items-end gap-2">
          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="flex-1 bg-gradient-to-t from-[#442a22] to-[#5d4037] rounded-t-sm"
            />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
            <span key={m} className="font-sans text-[10px] text-[#827470] flex-1 text-center">{m}</span>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-[#f5f5dc] rounded-md overflow-hidden">
        <div className="p-6 border-b border-[#d4c3be]/20">
          <h2 className="font-serif text-xl text-[#442a22]">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left font-sans text-xs text-[#5e604d] uppercase tracking-wider">
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id} className="border-t border-[#d4c3be]/10 font-sans text-sm">
                  <td className="px-6 py-4 text-[#442a22] font-semibold">{order.id}</td>
                  <td className="px-6 py-4 text-[#1b1d0e]">{order.customer}</td>
                  <td className="px-6 py-4 text-[#735c00] font-semibold">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-4 text-[#5e604d]">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
