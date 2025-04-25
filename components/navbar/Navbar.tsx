'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    username: "Smith",
    email: "smith@mail.com",
    phone: "081432344323443",
    address: "Lompo battang",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { username } = await getCurrentUser();
        setUsername(username);
      } catch {
        setUsername(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      setUsername(null);
      setShowProfile(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleEdit = () => {
    setEditable(true);
  };

  const cancelEdit = () => {
    setEditable(false);
    setFormData({
      username: "Smith",
      email: "smith@mail.com",
      phone: "081432344323443",
      address: "Lompo battang",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <nav className="bg-cyan-400 shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo + Nav Links */}
          <div className="flex items-center space-x-10">
            <Image src="/Logomitra.jpg" alt="Logo" width={100} height={100} />
            <div className="flex space-x-6">
              <Link href="/" className="text-white hover:text-black font-medium">Beranda</Link>
              <Link href="/Pemesanan" className="text-white hover:text-black font-medium">Pemesanan</Link>
              <Link href="/About" className="text-white hover:text-black font-medium">Tentang Kami</Link>
            </div>
          </div>

          {/* Auth Info */}
          <div className="flex items-center space-x-4">
            {username ? (
              <>
                <span className="text-white hidden md:inline">Hi, {username}</span>
                <button onClick={() => setShowProfile(true)} className="text-white text-2xl">
                  <FaUserCircle />
                </button>
              </>
            ) : (
              <Link href="/Signin">
                <button className="text-white px-4 py-2 border border-white rounded hover:bg-white hover:text-cyan-600">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <h2 className="text-xl text-black font-bold mb-4">Profile</h2>
            <div className="flex justify-center mb-4">
              <Image src="/profile.png" alt="Profile Pic" width={80} height={80} className="rounded-full" />
            </div>

            <form className="space-y-3 text-sm text-black">
              <div>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={!editable}
                  className="w-full border px-3 py-1 rounded mt-1"
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editable}
                  className="w-full border px-3 py-1 rounded mt-1"
                />
              </div>
              <div>
                <label>No.HP</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!editable}
                  className="w-full border px-3 py-1 rounded mt-1"
                />
              </div>
              <div>
                <label>Alamat</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!editable}
                  className="w-full border px-3 py-1 rounded mt-1"
                />
              </div>
            </form>

            {/* Action buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              {!editable ? (
                <>
                  <button onClick={toggleEdit} className="px-4 py-2 bg-gray-800 text-white rounded">Edit</button>
                  <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Log Out</button>
                </>
              ) : (
                <>
                  <button onClick={cancelEdit} className="px-4 py-2 bg-orange-500 text-white rounded">Batal</button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded">Ubah</button>
                </>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => { setShowProfile(false); setEditable(false); }}
              className="absolute top-2 right-3 text-gray-500 text-xl font-bold hover:text-black"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;