'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

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
  created_at: string;
  orders: string;
};

export default function RiwayatPesananPage() {
  const router = useRouter();
  const [pesananList, setPesananList] = useState<Pesanan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectedPesanan, setSelectedPesanan] = useState<Pesanan | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<OrderItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    setIsLoggedIn(true);

    axios.get('http://localhost:8000/api/pesanan/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => {
        setPesananList(res.data);
      })
      .catch(err => {
        console.error('Error fetch pesanan:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLihatDetail = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Signin"); // redirect kalau belum login
    }

    try {
      const res = await axios.get(`http://localhost:8000/api/pesanan/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const pesananDetail: Pesanan = res.data;
      setSelectedPesanan(pesananDetail);

      try {
        const parsedOrders: OrderItem[] = JSON.parse(pesananDetail.orders);
        setSelectedOrders(parsedOrders);
      } catch (error) {
        console.error("Gagal parsing orders:", error);
        setSelectedOrders([]);
      }

      setShowModal(true);
    } catch (error) {
      console.error("Gagal fetch detail pesanan:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPesanan(null);
    setSelectedOrders([]);
  };

  const totalHarga = selectedOrders.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (loading) return <p className="text-center py-10">Loading...</p>;

  if (!isLoggedIn) {
    return (
      <div className="text-center py-10">
        <p>Silakan login terlebih dahulu untuk melihat riwayat pesanan.</p>
        <button
          onClick={() => router.push("/Signin")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-6">Riwayat Pesanan Anda</h1>

        {pesananList.length > 0 ? (
          <div className="space-y-4">
            {pesananList.map((pesanan) => (
              <div key={pesanan.id} className="border p-4 rounded shadow">
                <p><strong>ID Pesanan:</strong> {pesanan.id}</p>
                <p><strong>Nama Toko:</strong> {pesanan.nama_toko}</p>
                <p><strong>Alamat:</strong> {pesanan.alamat}</p>
                <p><strong>No HP:</strong> {pesanan.no_hp}</p>
                <p><strong>Tanggal:</strong> {new Date(pesanan.created_at).toLocaleString()}</p>

                <button
                  onClick={() => handleLihatDetail(pesanan.id)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Lihat Detail
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Belum ada pesanan yang dilakukan.</p>
        )}

        <div className="mt-8">
          <button
            onClick={() => router.push("/")}
            className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-black"
          >
            Kembali ke Beranda
          </button>
        </div>
      </main>

      {/* MODAL */}
      {showModal && selectedPesanan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">Detail Pesanan #{selectedPesanan.id}</h2>

            <div className="text-sm mb-4">
              <p><strong>Nama Toko:</strong> {selectedPesanan.nama_toko}</p>
              <p><strong>Alamat:</strong> {selectedPesanan.alamat}</p>
              <p><strong>No HP:</strong> {selectedPesanan.no_hp}</p>
            </div>

            <table className="w-full text-sm text-left border border-gray-300 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 border">Nama Barang</th>
                  <th className="px-3 py-2 border text-right">Harga</th>
                  <th className="px-3 py-2 border text-center">Jumlah</th>
                  <th className="px-3 py-2 border text-center">Satuan</th>
                  <th className="px-3 py-2 border text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrders.map((item) => (
                  <tr key={item.id}>
                    <td className="px-3 py-2 border">{item.name}</td>
                    <td className="px-3 py-2 border text-right">Rp {item.price.toLocaleString("id-ID")}</td>
                    <td className="px-3 py-2 border text-center">{item.quantity}</td>
                    <td className="px-3 py-2 border text-center">{item.unit}</td>
                    <td className="px-3 py-2 border text-right">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right font-semibold text-base">
              Total: Rp {totalHarga.toLocaleString("id-ID")}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
