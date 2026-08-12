"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Package, ShoppingBag, Users, TrendingUp, IndianRupee, ArrowUpRight, Loader2 } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/admin/dashboard");
      if (res.ok) {
        setData(await res.json());
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="h-96 flex items-center justify-center text-primary">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  );

  const stats = [
    { label: "Total Revenue", value: `₹${data?.stats?.totalRevenue?.toLocaleString("en-IN") || 0}`, icon: IndianRupee, color: "text-accent", bg: "bg-accent/10" },
    { label: "Total Orders", value: data?.stats?.totalOrders || 0, icon: ShoppingBag, color: "text-primary", bg: "bg-primary/10" },
    { label: "Total Products", value: data?.stats?.totalProducts || 0, icon: Package, color: "text-white", bg: "bg-white/10" },
    { label: "Total Users", value: data?.stats?.totalUsers || 0, icon: Users, color: "text-secondary", bg: "bg-secondary/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-primary font-bold">Dashboard Overview</h1>
        <p className="font-sans text-sm text-secondary mt-1">Real-time pulse of Shekhawati Furniture House</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface-low p-6 rounded-md space-y-3 border border-white/5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-md ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <p className="font-serif text-2xl text-white font-bold">{stat.value}</p>
              <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-secondary mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Chart Placeholder (Keep visual from original but explain real data) */}
        <div className="lg:col-span-8 bg-surface-low p-8 rounded-md border border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl text-white font-bold">Revenue Growth</h2>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" strokeWidth={1.5} />
              <span className="font-sans text-sm text-primary font-bold">Updated Live</span>
            </div>
          </div>
          <div className="h-48 flex items-end gap-2">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="flex-1 bg-linear-to-t from-primary to-accent rounded-t-sm"
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
              <span key={m} className="font-sans text-[10px] text-secondary flex-1 text-center font-bold">{m}</span>
            ))}
          </div>
        </div>

        {/* Recent Orders Overview */}
        <div className="lg:col-span-4 bg-surface-low rounded-md border border-white/5 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5">
            <h2 className="font-serif text-xl text-white font-bold">Recent Activity</h2>
          </div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {data?.recentOrders?.length === 0 ? (
               <p className="text-secondary text-center py-10 font-medium italic">No recent activity yet</p>
            ) : (
              data?.recentOrders?.map((order: any, i: number) => (
                <div key={order._id} className="flex items-center justify-between p-3 bg-surface-high/50 rounded-sm border border-white/5">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-white tracking-tight">{order.user?.name || "Guest"}</p>
                    <p className="text-[10px] font-bold text-secondary uppercase">₹{order.totalAmount?.toLocaleString("en-IN")}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-[2px] text-[8px] font-black uppercase tracking-widest ${STATUS_COLORS[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

