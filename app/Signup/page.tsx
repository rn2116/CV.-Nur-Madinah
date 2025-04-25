'use client';
import { signUp } from 'aws-amplify/auth';
import { useRouter } from "next/navigation"; // Import useRouter
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const router = useRouter(); // Gunakan useRouter
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const result = await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            name: formData.name,
          }
        }
      });
  
      console.log("Signup success:", result);
      // Setelah signup sukses → arahkan ke halaman konfirmasi atau langsung login
      router.push("/Homepage");
    } catch (error: any) {
      console.error("Signup error:", error);
      alert(error.message || "Signup failed");
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/singin.jpg')" }}>
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-black text-center mb-2">Selamat Datang</h2>
        <p className="text-center text-sm mb-6 text-gray-700">
          Mohon Lengkapi Data diri Untuk Membuat akun
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Masukan Nama"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Masukkan email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Buat password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Masukkan Kembali password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition"
          >
            Buat Akun
          </button>
        </form>

        <div className="my-4">
          <button className="w-full border flex items-center text-black justify-center py-2 rounded-md hover:bg-gray-100 transition">
            <Image src="/Googlelogo.png" alt="Google" width={20} height={20} className="mr-2" />
            <span>Daftar dengan akun Google</span>
          </button>
        </div>

        <p className="text-center text-sm mt-4 text-black">
          Sudah Punya akun?{' '}
          <Link href="/Signin" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}