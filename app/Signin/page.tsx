'use client';

import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setError(null);
      localStorage.setItem('token', data.token);
      router.push('/Homepage');
    } else {
      setError('Login gagal, cek email dan password');
    }
  }

   return (
    <div className="relative h-screen w-screen">
      {/* Background image */}
      <img
        src="/singin.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Login Card */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="bg-white bg-opacity-90 p-8 rounded-xl w-full max-w-md shadow-xl">
          <h2 className="text-2xl font-bold text-black text-center mb-2">Selamat Datang Kembali!</h2>
          <p className="text-sm text-center text-black mb-6">Masukkan akun anda</p>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Masukkan Email Anda"
            className="w-full px-4 py-2 mb-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Masukkan Sandi Anda"
            className="w-full px-4 py-2 mb-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-right text-sm text-blue-500 mb-4">
            <a href="#">Lupa Sandi?</a>
          </div>

          <button
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition mb-3"
            onClick={handleSubmit}
          >
            Sign In
          </button>

          <p className="text-center text-sm text-gray-600">
            Belum Punya Akun?{' '}
            <Link href="/Signup" className="text-blue-500">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}