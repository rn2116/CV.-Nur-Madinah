"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import axios from 'axios';
import { Autocomplete, TextField } from "@mui/material";


interface Barang {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
  image_url?: string; // ini harus ditambahkan supaya TS tahu properti ini ada
}


const Homepage = () => {
  const [searchValue, setSearchValue] = useState<Barang | null>(null);
  const [barangs, setBarangs] = useState<Barang[]>([]);
  const [selectedBarang, setSelectedBarang] = useState<Barang[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBarang = async () => {
      try {
        const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Signin"); // redirect kalau belum login
    }
        const res = await axios.get("http://54.90.134.63:8000/api/barang", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
        const data = res.data;
        setBarangs(data);
      } catch (error) {
        console.error("Gagal mengambil data barang:", error);
      }
    };

    fetchBarang();
  }, []);

  const toggleBarang = (barang: Barang) => {
  // Ambil pesanan lama dari localStorage
  const existingOrders = JSON.parse(localStorage.getItem("selectedOrders") || "[]");

  // Cek apakah barang sudah dipilih
  const exists = existingOrders.find((b: Barang & { quantity?: number }) => b.id === barang.id);

  let updatedOrders;

  if (exists) {
    // Kalau sudah ada, hapus dari selected (toggle off)
    updatedOrders = existingOrders.filter((b: any) => b.id !== barang.id);
  } else {
    // Kalau belum ada, tambah dengan quantity default 1
    updatedOrders = [...existingOrders, { ...barang, quantity: 1 }];
  }

  // Update state react supaya UI ikut update
  setSelectedBarang(updatedOrders);

  // Simpan ke localStorage
  localStorage.setItem("selectedOrders", JSON.stringify(updatedOrders));
};


  
  const handlePesan = () => {
  const existingOrders = JSON.parse(localStorage.getItem("selectedOrders") || "[]");
  localStorage.setItem("selectedOrders", JSON.stringify(existingOrders));
  router.push("/Pemesanan");
    };

  

  return (
    <div className="bg-white relative">
      {/* Navbar */}
      <div className="relative z-30">
        <Navbar />
      </div>

      

      {/* Hero Section */}
<section className="relative bg-[url('/latar.jpg')] bg-cover bg-center h-[450px]">
  {/* Overlay transparan */}
  <div className="absolute inset-0 bg-black/40 z-0" />

  <div className="container mx-auto px-6 md:px-12 h-full flex items-center relative z-10">
    <div className="p-6 rounded-lg max-w-xl text-white">
      
      {/* Shape khusus untuk teks */}
      <div className="bg-gray-900/90 p-4 rounded mb-4">
        <h1 className="text-xl md:text-2xl font-semibold leading-snug">
          Kami Menjual Berbagai Sembako Kebutuhan sehari-hari untuk anda,
          Belanja lebih mudah tanpa keluar rumah, Mari Belanja Sekarang !!!
        </h1>
      </div>
    </div>
  </div>
</section>

      {/* Produk List */}
      <section className="container mx-auto py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sembako</h2>
{/* Search Bar */}
      <div className="relative z-20 container mx-auto px-6 mt-8 mb-6">
        <div className="flex justify-start">
          <div className="relative w-full max-w-xl">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-xl">
              🔍
            </span>
            <Autocomplete
                options={barangs}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newValue) => {
                  setSearchValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Cari Sembako"
                    variant="outlined"
                    sx={{ backgroundColor: "white" }}
                  />
                )}
              />
          </div>
        </div>
      </div>

        <div className="grid md:grid-cols-4 gap-6">
          {barangs
          .filter((item) => searchValue ? item.id === searchValue.id : true)
          .map((item) => {
            const isSelected = selectedBarang.find((b) => b.id === item.id);
            return (
              <div
                key={item.id}
                className="border-2 border-yellow-500 p-4 rounded-lg shadow-lg bg-white"
              >
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded"
                  />
                )}
                <h3 className="mt-2 font-semibold text-gray-900">{item.name}</h3>
                <p className="text-gray-700">Rp {Number(item.price).toLocaleString()}</p>
                <p className="text-gray-500">Sisa Stok: {item.stock}</p>
                <button
                  onClick={() => toggleBarang(item)}
                  className={`mt-3 px-3 py-2 rounded text-white transition ${
                    isSelected ? "bg-red-500 hover:bg-red-600" : "bg-yellow-400 hover:bg-yellow-500"
                  }`}
                >
                  {isSelected ? "✔️ Batalkan" : "+ Tambah ke Pesanan"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Tombol Lanjut ke Pemesanan */}
        <div className="mt-10">
          <button
            onClick={handlePesan}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Lanjut ke Pemesanan
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
