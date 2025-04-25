'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'aws-amplify/auth';
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSignIn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setError('');

    try {
      const result = await signIn({ username: email, password });
      console.log('Login success:', result);

      if (result.isSignedIn) {
        // ✅ Jika user sudah terverifikasi
        router.push('/Homepage');
      } else if (result.nextStep?.signInStep === 'CONFIRM_SIGN_UP') {
        // ⚠️ Jika user belum verifikasi email
        setError('Akun Anda belum diverifikasi. Silakan verifikasi terlebih dahulu.');
        router.push(`/verify?email=${encodeURIComponent(email)}`);
      } else {
        setError('Login berhasil tapi memerlukan langkah tambahan.');
      }
    } catch (err: any) {
      console.error('Login failed:', err);

      if (err.name === 'UserNotFoundException') {
        setError('Akun tidak ditemukan. Silakan daftar terlebih dahulu.');
      } else if (err.name === 'NotAuthorizedException') {
        setError('Password salah atau akun belum dikonfirmasi.');
      } else if (err.name === 'UserNotConfirmedException') {
        setError('Akun Anda belum terverifikasi. Periksa email Anda.');
        router.push(`/verify?email=${encodeURIComponent(email)}`);
      } else {
        setError(err.message || 'Gagal login. Silakan coba lagi.');
      }
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
            onClick={handleSignIn}
          >
            Sign In
          </button>

          <button className="w-full bg-white border border-gray-300 py-2 rounded-lg text-black flex items-center justify-center gap-2 text-sm hover:bg-gray-100 mb-4">
            <Image src="/Googlelogo.png" alt="Google" width={20} height={20} />
            Login Dengan Google
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