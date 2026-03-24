"use client";

import { motion } from "framer-motion";

const USERS = [
  { _id: "1", name: "Priya Sharma", email: "priya@example.com", role: "user", createdAt: "2026-01-15" },
  { _id: "2", name: "Rohit Mehra", email: "rohit@example.com", role: "user", createdAt: "2026-02-10" },
  { _id: "3", name: "Admin User", email: "admin@shekhawati.com", role: "admin", createdAt: "2025-12-01" },
  { _id: "4", name: "Ananya Gupta", email: "ananya@example.com", role: "user", createdAt: "2026-03-01" },
  { _id: "5", name: "Vikram Singh", email: "vikram@example.com", role: "user", createdAt: "2026-03-15" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-[#442a22]">Users</h1>
        <p className="font-sans text-sm text-[#5e604d] mt-1">View and manage user accounts</p>
      </div>

      <div className="bg-[#f5f5dc] rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left font-sans text-xs text-[#5e604d] uppercase tracking-wider">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((user, i) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-t border-[#d4c3be]/10 font-sans text-sm"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#442a22] flex items-center justify-center text-white text-sm font-medium">
                        {user.name[0]}
                      </div>
                      <span className="text-[#1b1d0e] font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#5e604d]">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin" ? "bg-[#D4AF37]/20 text-[#735c00]" : "bg-[#e4e4cc] text-[#5e604d]"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#5e604d]">{user.createdAt}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
