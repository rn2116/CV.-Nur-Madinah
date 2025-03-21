import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const Home = () => {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Search Bar */}
      <div className="container mx-auto my-6 flex justify-center">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Pencarian Sembako"
            className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring focus:border-gray-400"
          />
          <button className="absolute right-3 top-3 text-gray-500">
            🔍
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="p-6 text-left">
            <h1 className="text-3xl font-bold text-gray-900">
              Kami Menjual Berbagai Sembako Kebutuhan Sehari-hari
            </h1>
            <p className="text-gray-700 mt-4">
              Belanja lebih mudah tanpa keluar rumah
            </p>
            <button className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition">
              Belanja Sekarang
            </button>
          </div>
          <div className="flex justify-center">
            <Image
              src="/sembako.jpg"
              width={400}
              height={300}
              alt="Sembako"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Produk List */}
      <section className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Sembako</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {/* Produk 1 */}
          <div className="border p-4 rounded-lg shadow-lg bg-white">
            <Image
              src="/indomie.jpg"
              width={150}
              height={100}
              alt="Indomie"
              className="mx-auto"
            />
            <h3 className="mt-2 font-semibold text-gray-900">Indomie</h3>
            <p className="text-gray-700">Rp 89.000</p>
            <p className="text-gray-500">Sisa Stok: 7</p>
          </div>

            {/* Produk 2 */}
            <div className="border p-4 rounded-lg shadow-lg bg-white">
              <Image
                src="/gula.jpg"
                width={150}
                height={100}
                alt="Indomie"
                className="mx-auto"
            />
            <h3 className="mt-2 font-semibold text-gray-900">Gula</h3>
            <p className="text-gray-700">Rp 50.000</p>
            <p className="text-gray-500">Sisa Stok: 10</p>
          </div>

          {/* Produk 3 */}
          <div className="border p-4 rounded-lg shadow-lg bg-white">
              <Image
                src="/sirup.jpg"
                width={150}
                height={100}
                alt="Indomie"
                className="mx-auto"
            />
            <h3 className="mt-2 font-semibold text-gray-900">Sirup</h3>
            <p className="text-gray-700">Rp 25.000</p>
            <p className="text-gray-500">Sisa Stok: 5</p>
          </div>
          
          {/* Placeholder Produk */}
          <div className="border p-4 rounded-lg bg-gray-200 h-48"></div>
          <div className="border p-4 rounded-lg bg-gray-200 h-48"></div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
