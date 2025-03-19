import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gray-100 py-12 text-center">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-6">
              <h1 className="text-2xl font-bold">
                Kami Menjual Berbagai Sembako Kebutuhan Sehari-hari
              </h1>
              <p className="text-gray-600 mt-4">
                Belanja lebih mudah tanpa keluar rumah
              </p>
              <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded">
                Belanja Sekarang
              </button>
            </div>
            <div>
              <Image src="/sembako.jpg" width={400} height={300} alt="Sembako" />
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="container mx-auto my-6 text-center">
        <input
          type="text"
          placeholder="Pencarian Sembako"
          className="p-3 border rounded w-1/2"
        />
        <button className="bg-gray-200 p-3 rounded ml-2">🔍</button>
      </div>

      {/* Produk List */}
      <section className="container mx-auto text-center">
        <h2 className="text-xl font-bold">Sembako</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {/* Produk 1 */}
          <div className="border p-4 rounded-lg">
            <Image src="/indomie.png" width={150} height={100} alt="Indomie" />
            <h3 className="mt-2 font-semibold">Indomie</h3>
            <p className="text-gray-600">Rp 89.000</p>
            <p className="text-gray-500">Sisa Stok: 7</p>
          </div>
          
          {/* Placeholder Produk */}
          <div className="border p-4 rounded-lg bg-gray-200 h-36"></div>
          <div className="border p-4 rounded-lg bg-gray-200 h-36"></div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
