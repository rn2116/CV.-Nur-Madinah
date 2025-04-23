'use client';

import React from 'react';
import { FaUserCircle, FaPen, FaTrash } from 'react-icons/fa';

const dummyProducts = [
  {
    id: 1,
    name: 'Gula',
    price: 30000,
    stock: 10,
    image: '/gula.jpg', // Gambar lokal di folder public
  },
  {
    id: 2,
    name: 'Minyak',
    price: 30000,
    stock: 15,
    image: '/minyak.jpg',
  },
  {
    id: 3,
    name: 'Beras',
    price: 30000,
    stock: 20,
    image: '/beras.jpg',
  },
  {
    id: 4,
    name: 'Indomie',
    price: 30000,
    stock: 12,
    image: '/indomie.jpg',
  },
];

const ProdukPage = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-black">

      <main className="flex-1 bg-white p-6 relative overflow-y-auto">
        {/* Header Bar */}
        <div className="w-full h-14 bg-gray-300 flex justify-between items-center px-4 rounded-md">
          <p className="text-lg font-semibold">Pengelolaan Manajemen Gudang</p>
          <FaUserCircle size={24} />
        </div>

        {/* Header + Add Button */}
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl font-semibold">Produk</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            + Add Barang
          </button>
        </div>

        {/* Produk Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {dummyProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover mb-3"
              />
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm">Rp {product.price.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Sisa Stok: {product.stock}</p>

              <div className="mt-3 flex space-x-2">
                <button className="bg-white border px-3 py-1 rounded-md flex items-center hover:bg-gray-200">
                  Edit <FaPen className="ml-2 text-sm" />
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center hover:bg-red-600">
                  Delete <FaTrash className="ml-2 text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProdukPage;
