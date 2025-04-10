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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 flex w-3/4">
        {/* Image Section */}
        <div className="w-1/2 flex items-center justify-center">
          <Image
            src="/signup.jpg"
            alt="signup"
            width={500}
            height={500}
            className="rounded"
          />
        </div>

        {/* Form Section */}
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Welcome</h2>
          <p className="text-gray-500 text-center mb-6">
            Please fill in your details to create a new account
          </p>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Create your password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />

            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Sign Up
            </button>
          </form>
          
          <div className="divider">OR</div>
          
          <p className="text-center mt-4">
            Already have an account? <Link href="/Signin" className="text-blue-600">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
