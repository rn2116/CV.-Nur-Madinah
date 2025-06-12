"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { useRouter } from 'next/navigation';


type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  unit: string;
};

type Pesanan = {
  id: number;
  nama_toko: string;
  alamat: string;
  no_hp: string;
  orders: string;
};

export default function NotaPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [pesanan, setPesanan] = useState<Pesanan | null>(null);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!id) return;

  const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Signin"); // redirect kalau belum login
    }

  axios
    .get(`http://54.90.134.63:8000/api/pesanan/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
    .then((res) => {
      const data: Pesanan = res.data;
      setPesanan(data);

      try {
        const ordersParsed: OrderItem[] = JSON.parse(data.orders);
        setOrders(ordersParsed);
      } catch (error) {
        console.error("Gagal parsing orders:", error);
        setOrders([]);
      }
    })
    .catch((err) => {
      console.error("Error fetch pesanan:", err);
    })
    .finally(() => {
      setLoading(false);
    });
}, [id]);


  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!pesanan) return <p className="text-center py-10">Pesanan tidak ditemukan</p>;

  const totalHarga = orders.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white min-h-screen flex flex-col text-black">
      <Navbar />

      <main className="container mx-auto px-6 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Nota Pesanan #{pesanan.id}</h1>

        <div className="grid gap-3 mb-8 text-sm">
          <p>
            <span className="font-semibold">Nama Toko:</span> {pesanan.nama_toko}
          </p>
          <p>
            <span className="font-semibold">Alamat:</span> {pesanan.alamat}
          </p>
          <p>
            <span className="font-semibold">No. HP:</span> {pesanan.no_hp}
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Nama Barang</th>
                <th className="px-4 py-2 border text-right">Harga</th>
                <th className="px-4 py-2 border text-center">Jumlah</th>
                <th className="px-4 py-2 border text-center">Satuan</th>
                <th className="px-4 py-2 border text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr key={item.id} className="border-b last:border-0">
                  <td className="px-4 py-2 border-r">{item.name}</td>
                  <td className="px-4 py-2 border-r text-right">
                    Rp {item.price.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-2 border-r text-center">{item.quantity}</td>
                  <td className="px-4 py-2 border-r text-center">{item.unit}</td>
                  <td className="px-4 py-2 text-right">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-right text-xl font-semibold">
          Total: Rp {totalHarga.toLocaleString("id-ID")}
        </div>
      </main>

      <Footer />
    </div>
  );
}
