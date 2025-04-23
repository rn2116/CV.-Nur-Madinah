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
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg flex w-3/5">
        {/* Form Section */}
        <div className="w-1/2 p-5 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="mb-5 text-gray-600">Please enter your details</p>

          {error && (
            <div className="mb-4 text-sm text-red-500 bg-red-100 px-3 py-2 rounded">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <a href="#" className="text-blue-500 text-sm mb-4">Forgot Password?</a>

          <button className="btn btn-black w-full mb-3" onClick={handleSignIn}>Sign In</button>

          <p className="mt-3 text-gray-600 text-sm">
            Don’t have an account? <Link href="/Signup" className="text-blue-500">Sign up</Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="w-1/2 flex items-center justify-center">
          <Image src="/signin.jpg" alt="Store Illustration" width={400} height={400} />
        </div>
      </div>
    </div>  
  );
}