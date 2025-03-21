'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function SignIn() {
  const router = useRouter(); // Gunakan useRouter untuk navigasi
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Email:', email, 'Password:', password);

    // Simulasi sign-in berhasil, nanti bisa diganti dengan API atau Firebase
    if (email && password) {
      router.push('/Homepage'); // Redirect ke homepage setelah sign-in sukses
    } else {
      alert('Please enter valid email and password');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg flex w-3/5">
        {/* Form Section */}
        <div className="w-1/2 p-5 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="mb-5 text-gray-600">Please enter your details</p>
          
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
            Don’t have an account? <a href="/Signup" className="text-blue-500">Sign up</a>
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
