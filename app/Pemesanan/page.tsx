"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Image from "next/image";
import { useState } from "react";
import { FaTrash, FaWhatsapp, FaPaperPlane } from "react-icons/fa";

const Pemesanan = () => {
  const [orders, setOrders] = useState([
    { id: 1, name: "Indomie", price: 89000, stock: 7, quantity: 1, image: "/indomie.jpg" },
    { id: 2, name: "Gula", price: 50000, stock: 10, quantity: 1, image: "/gula.jpg" },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? { ...order, quantity: Math.max(1, order.quantity + change) }
          : order
      )
    );
  };

  const removeOrder = (id: number) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto p-6 flex-grow text-black">
        {/* Bagian form + tombol aksi */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          {/* Form input */}
          <div className="space-y-4 w-full md:w-1/2">
            <div className="flex items-center gap-4">
              <label className="w-28 font-medium">Nama Toko</label>
              <input type="text" className="flex-1 border border-gray-300 rounded px-4 py-2 shadow-sm" />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-28 font-medium">Alamat</label>
              <input type="text" className="flex-1 border border-gray-300 rounded px-4 py-2 shadow-sm" />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-28 font-medium">No. HP</label>
              <input type="text" className="flex-1 border border-gray-300 rounded px-4 py-2 shadow-sm" />
            </div>
          </div>

          {/* Tombol aksi */}
          <div className="flex flex-col gap-4 md:items-end w-full md:w-auto mt-4 md:mt-0">
            <a
              href="https://wa.me/6287654321987"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded flex items-center gap-2"
            >
              Hubungi Admin <FaWhatsapp size={20} />
            </a>
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded flex items-center gap-2">
              Kirim Pesanan <FaPaperPlane size={18} />
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">Daftar Pesanan</h1>

        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border-2 border-yellow-500 text-black p-4 rounded-lg flex justify-between items-center mb-4 shadow"
            >
              <div className="flex items-center gap-4">
                <Image src={order.image} alt={order.name} width={100} height={100} className="rounded-lg" />
                <div>
                  <h2 className="font-semibold text-lg">{order.name}</h2>
                  <p>Rp {order.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Sisa Stok: {order.stock}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-lg font-medium">Jumlah</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded text-black"
                  onClick={() => updateQuantity(order.id, 1)}
                >
                  +
                </button>
                <span className="px-4 py-2 bg-gray-400 text-white rounded">{order.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded text-black"
                  onClick={() => updateQuantity(order.id, -1)}
                  disabled={order.quantity <= 1}
                >
                  -
                </button>

                <select className="border rounded px-2 py-1">
                  <option>Dus</option>
                  <option>Zak</option>
                  <option>Ball</option>
                </select>

                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center"
                  onClick={() => removeOrder(order.id)}
                >
                  <FaTrash className="mr-2" /> Hapus
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Tidak ada pesanan.</p>
        )}

        {/* Peringatan */}
        <div className="bg-yellow-400 text-black font-semibold text-center p-3 rounded flex items-center justify-center gap-2 mt-8">
          <span className="text-xl">⚠️</span> Harap Hubungi Admin Saat Setelah Melakukan Pesanan! <span className="text-xl">⚠️</span>
        </div>
      </div>

      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Pemesanan;
