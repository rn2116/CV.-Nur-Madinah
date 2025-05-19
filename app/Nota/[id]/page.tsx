"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

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
  const id = params.id;
  const [pesanan, setPesanan] = useState<Pesanan | null>(null);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:8000/api/pesanan/${id}`)
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
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Nota Pesanan #{pesanan.id}
        </h1>

        <div className="grid gap-1 text-sm text-gray-700 mb-6">
          <p><span className="font-medium">Nama Toko:</span> {pesanan.nama_toko}</p>
          <p><span className="font-medium">Alamat:</span> {pesanan.alamat}</p>
          <p><span className="font-medium">No. HP:</span> {pesanan.no_hp}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100 text-sm text-gray-600">
              <tr>
                <th className="border px-3 py-2 text-left">Nama Barang</th>
                <th className="border px-3 py-2 text-right">Harga</th>
                <th className="border px-3 py-2 text-center">Jumlah</th>
                <th className="border px-3 py-2 text-center">Satuan</th>
                <th className="border px-3 py-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr key={item.id} className="text-sm">
                  <td className="border px-3 py-2">{item.name}</td>
                  <td className="border px-3 py-2 text-right">
                    Rp {item.price.toLocaleString()}
                  </td>
                  <td className="border px-3 py-2 text-center">{item.quantity}</td>
                  <td className="border px-3 py-2 text-center">{item.unit}</td>
                  <td className="border px-3 py-2 text-right">
                    Rp {(item.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-right text-lg font-semibold text-gray-800">
          Total: Rp {totalHarga.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
