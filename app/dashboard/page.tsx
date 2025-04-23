'use client';

import React from "react";
import { FaBox, FaUser, FaClipboardList, FaInbox, FaUserCircle } from "react-icons/fa";

const dataCards = [
  {
    title: "Jenis Barang",
    icon: <FaBox size={32} />,
    value: 50,
    color: "bg-red-100",
    headerColor: "bg-red-600",
  },
  {
    title: "Total Pengguna",
    icon: <FaUser size={32} />,
    value: 50,
    color: "bg-lime-100",
    headerColor: "bg-lime-600",
  },
  {
    title: "Pesanan",
    icon: <FaInbox size={32} />,
    value: 50,
    color: "bg-blue-100",
    headerColor: "bg-blue-600",
  },
  {
    title: "Total Transaksi",
    icon: <FaClipboardList size={32} />,
    value: 50,
    color: "bg-yellow-100",
    headerColor: "bg-yellow-600",
  },
];

const DashboardPage = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-black">

      <main className="flex-1 bg-white p-6 relative overflow-y-auto">
        {/* Header Bar */}
        <div className="w-full h-14 bg-gray-300 flex justify-between items-center px-4 rounded-md">
            <p className="text-lg font-semibold">Pengelolaan Manajemen Gudang</p>
            <FaUserCircle size={24} />
        </div>

        {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                {dataCards.map((card, index) => (
            <div
                key={index}
                className={`rounded-xl shadow-md ${card.color} p-6 border border-gray-300 h-48`}
            >
            <div className={`${card.headerColor} text-white font-semibold text-sm px-3 py-1 rounded-md mb-4`}>
                {card.title}
            </div>
                <div className="flex items-center justify-between px-2">
                    <div className="text-black">{card.icon}</div>
                        <div className="text-gray-800 text-4xl font-bold">{card.value}</div>
                    </div>
                </div>
                ))}
            </div>

      </main>
    </div>
  );
};

export default DashboardPage;
