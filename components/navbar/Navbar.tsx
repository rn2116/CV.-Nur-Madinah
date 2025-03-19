'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="p-3">
          <Image src="/Logomitra.jpg" alt="Logo" width={80} height={80} />
        </div>

        {/* Menu */}
        <ul className="flex space-x-6 text-black bg-gray-300 px-6 py-2 rounded-lg">
          <li>
            <Link href="/" className="hover:underline font-semibold">
              Beranda
            </Link>
          </li>
          <li>
            <Link href="/produk" className="hover:underline font-semibold">
              Produk
            </Link>
          </li>
          <li>
            <Link href="/proses-pemesanan" className="hover:underline font-semibold">
              Proses Pemesanan
            </Link>
          </li>
          <li>
            <Link href="/tentang-kami" className="hover:underline font-semibold">
              Tentang Kami
            </Link>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="space-x-4 text-black">
          {isLoggedIn ? (
            <button
              className="hover:underline font-semibold"
              onClick={() => setIsLoggedIn(false)}
            >
              Log Out
            </button>
          ) : (
            <button
              className="hover:underline font-semibold"
              onClick={() => setIsLoggedIn(true)}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
