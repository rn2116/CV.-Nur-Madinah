"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer"; // Pastikan path ini benar
import Image from "next/image";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const Pemesanan = () => {
  const [orders, setOrders] = useState([
    { id: 1, name: "Indomie", price: 89000, stock: 7, quantity: 1, image: "/indomie.jpg" },
    { id: 2, name: "Gula", price: 50000, stock: 10, quantity: 1, image: "/gula.jpg" },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? { ...order, quantity: Math.max(1, order.quantity + change) } // Tidak bisa kurang dari 1
          : order
      )
    );
  };

  const removeOrder = (id: number) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Konten utama */}
      <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Daftar Pesanan</h1>

        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-gray-200 p-4 rounded-lg flex justify-between items-center mb-4 shadow">
              <div className="flex items-center gap-4">
                {/* Gambar produk */}
                <Image src={order.image} alt={order.name} width={100} height={100} className="rounded-lg" />
                <div>
                  <h2 className="font-semibold text-lg">{order.name}</h2>
                  <p>Rp {order.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Sisa Stok: {order.stock}</p>
                </div>
              </div>

              {/* Kontrol jumlah dan aksi */}
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium">Jumlah</span>
                <button className="btn btn-outline btn-sm" onClick={() => updateQuantity(order.id, 1)}>
                  +
                </button>
                <span className="px-4 py-2 bg-gray-400 text-white rounded">{order.quantity}</span>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => updateQuantity(order.id, -1)}
                  disabled={order.quantity <= 1}
                >
                  -
                </button>

                {/* Dropdown satuan */}
                <select className="select select-bordered">
                  <option>Value</option>
                  <option>Pack</option>
                  <option>Dus</option>
                </select>

                {/* Tombol hapus */}
                <button className="btn btn-error text-white flex items-center" onClick={() => removeOrder(order.id)}>
                  <FaTrash className="mr-2" /> Hapus
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Tidak ada pesanan.</p>
        )}
      </div>
      
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Pemesanan;