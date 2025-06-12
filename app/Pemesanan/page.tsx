"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaWhatsapp, FaPaperPlane } from "react-icons/fa";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { useRouter } from "next/navigation";

interface Order {
  item_id: number;
  id: number;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  stock: number;
  image: string;
}

export default function PemesananPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama_toko: "",
    alamat: "",
    no_hp: "",
  });

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Signin"); // redirect kalau belum login
    }
  }, []);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("selectedOrders") || "[]") as Order[];


    // Normalisasi data: pastikan setiap item punya item_id
    const normalizedOrders = savedOrders.map((order: any) => ({
      ...order,
      item_id: order.item_id ?? order.id,
    }));

    // Hilangkan duplikasi berdasar item_id (optional tapi disarankan)
    const uniqueOrders = Array.from(
      new Map(normalizedOrders.map((o: Order) => [o.item_id, o])).values()
    );

    setOrders(uniqueOrders);
  }, []);

  const [nota, setNota] = useState<null | {
    id: number;
    nama_toko: string;
    alamat: string;
    no_hp: string;
    created_at: string;
    pesanan_details: {
      name: string;
      price: number;
      quantity: number;
      unit: string;
    }[];
  }>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateQuantity = (item_id: number, delta: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.item_id === item_id
          ? {
              ...order,
              quantity: Math.min(
                Math.max(order.quantity + delta, 1),
                order.stock
              ),
            }
          : order
      )
    );
  };

  const updateUnit = (item_id: number, unit: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.item_id === item_id
          ? {
              ...order,
              unit,
            }
          : order
      )
    );
  };

  const removeOrder = (item_id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      setOrders((prev) => prev.filter((order) => order.item_id !== item_id));
    }
  };

  const handleSubmit = async () => {
    if (!formData.nama_toko || !formData.alamat || !formData.no_hp) {
      alert("Mohon lengkapi semua data toko terlebih dahulu.");
      return;
    }

    if (orders.length === 0) {
      alert("Belum ada barang yang dipesan.");
      return;
    }

    // Validasi unit harus salah satu pilihan
    for (const o of orders) {
      if (
        !o.item_id ||
        !o.quantity ||
        !["Dus", "Zak", "Ball"].includes(o.unit)
      ) {
        alert(
          "Semua pesanan harus memiliki item, jumlah, dan satuan yang valid (Dus, Zak, atau Ball)."
        );
        return;
      }
    }

    const payload = {
      nama_toko: formData.nama_toko,
      alamat: formData.alamat,
      no_hp: formData.no_hp,
      orders: orders.map((order) => ({
        id: order.item_id,
        name: order.name,
        price: order.price,
        quantity: order.quantity,
        unit: order.unit,
      })),
    };

    console.log("📦 Payload dikirim:", payload);

  try {
    const token = localStorage.getItem("token");

    const res = await axios.post("http://localhost:8000/api/pesanan", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    
  console.log("✅ Respons dari backend:", res.data);

  const createdNota = res.data.pesanan; // sesuaikan nama field dengan backend

  if (!createdNota || !createdNota.id) {
    alert("Gagal mengambil nota dari server.");
    return;
  }

  setNota(createdNota);
  localStorage.removeItem("selectedOrders");
  router.push(`/Nota/${createdNota.id}`);
} catch (error: any) {
  console.error("❌ Gagal mengirim pesanan:", error.response?.data || error.message);
  alert(
    "Gagal mengirim pesanan: " +
      (error.response?.data?.message || "Periksa kembali data yang dikirim.")
  );
}
  }


  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto p-6 flex-grow text-black">
        {/* Form input + tombol aksi */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          {/* Form input */}
          <div className="space-y-4 w-full md:w-1/2">
            <div className="flex items-center gap-4">
              <label className="w-28 font-medium">Nama Toko</label>
              <input
                type="text"
                name="nama_toko"
                value={formData.nama_toko}
                onChange={handleInputChange}
                className="flex-1 border border-gray-300 rounded px-4 py-2 shadow-sm"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-28 font-medium">Alamat</label>
              <input
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                className="flex-1 border border-gray-300 rounded px-4 py-2 shadow-sm"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-28 font-medium">No. HP</label>
              <input
                type="text"
                name="no_hp"
                value={formData.no_hp}
                onChange={handleInputChange}
                className="flex-1 border border-gray-300 rounded px-4 py-2 shadow-sm"
              />
            </div>
          </div>

          {/* Tombol aksi */}
          <div className="flex flex-col gap-4 md:items-end w-full md:w-auto mt-4 md:mt-0">
            <a
              href="https://wa.me/62895341610373"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 w-48 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 rounded flex items-center justify-center gap-2"
            >
              Hubungi Admin <FaWhatsapp className="w-4 h-4" />
            </a>

            <button
              onClick={handleSubmit}
              className="h-12 w-48 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 rounded flex items-center justify-center gap-2"
            >
              Kirim Pesanan <FaPaperPlane className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">Daftar Pesanan</h1>

        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.item_id}
              className="bg-white border-2 border-yellow-500 text-black p-4 rounded-lg flex justify-between items-center mb-4 shadow"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={
                    order.image
                      ? `http://localhost:8000/${order.image}`
                      : "/default.jpg"
                  }
                  alt={order.name}
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
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
                    onClick={() => updateQuantity(order.item_id, -1)}
                    disabled={order.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 bg-gray-400 text-white rounded">
                    {order.quantity}
                  </span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded text-black"
                    onClick={() => updateQuantity(order.item_id, 1)}
                  >
                   +
                  </button>

                <select
                  className="border rounded px-2 py-1"
                  value={order.unit}
                  onChange={(e) => updateUnit(order.item_id, e.target.value)}
                >
                  <option value="">Pilih Satuan</option>
                  <option value="Dus">Dus</option>
                  <option value="Zak">Zak</option>
                  <option value="Ball">Ball</option>
                </select>

                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                  onClick={() => removeOrder(order.item_id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Belum ada barang yang dipilih.</p>
        )}

        {/* Total harga */}
        {orders.length > 0 && (
          <div className="text-right font-semibold text-xl mt-6">
            Total: Rp {orders.reduce((acc, o) => acc + o.price * o.quantity, 0).toLocaleString()}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
