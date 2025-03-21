import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
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
          <Link href="/pemesanan" className="text-gray-700 hover:text-black font-medium">
            Pemesanan
          </Link>
          <Link href="/tentang-kami" className="text-gray-700 hover:text-black font-medium">
            Tentang Kami
          </Link>
        </div>

        {/* Login Buttons */}
        <div className="space-x-4">
          <Link href="/Signin">
            <button className="text-gray-700 px-4 py-2 border rounded hover:bg-gray-200">
              Login
            </button>
          </Link>
          <button className="text-gray-700 px-4 py-2 border rounded hover:bg-gray-200">
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
