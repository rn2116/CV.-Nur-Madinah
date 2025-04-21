'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

// Modular imports dari Amplify v6
import { getCurrentUser, signOut } from 'aws-amplify/auth';

const Navbar = () => {
  const [username, setUsername] = useState<string | null>(null);

  // Ambil nama user saat komponen dimount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { username } = await getCurrentUser();
        setUsername(username);
        console.log("Login success as:", username);
      } catch (error) {
        console.log("No user logged in");
        setUsername(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      setUsername(null);
      console.log("Logout success");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/Logomitra.jpg" alt="Logo" width={100} height={100} />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-black font-medium">
            Beranda
          </Link>
          <Link href="/Pemesanan" className="text-gray-700 hover:text-black font-medium">
            Pemesanan
          </Link>
          <Link href="/About" className="text-gray-700 hover:text-black font-medium">
            Tentang Kami
          </Link>
        </div>

        {/* User Info / Auth Buttons */}
        <div className="space-x-4 flex items-center">
          {username ? (
            <>
              <span className="text-gray-700">Hi, {username}</span>
              <button
                onClick={handleLogout}
                className="text-gray-700 px-4 py-2 border rounded hover:bg-gray-200"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link href="/Signin">
              <button className="text-gray-700 px-4 py-2 border rounded hover:bg-gray-200">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
