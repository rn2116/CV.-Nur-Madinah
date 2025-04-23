import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const Homepage = () => {
  return (
    <div className="bg-white relative">
      {/* Navbar */}
      <div className="relative z-30">
        <Navbar />
      </div>

      {/* Search Bar di luar background */}
      <div className="relative z-20 container mx-auto px-6 mt-8 mb-6">
        <div className="flex justify-start">
          <div className="relative w-full max-w-xl">
            {/* Icon di kiri input */}
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-xl">
              🔍
            </span>
            <input
              type="text"
              placeholder="Pencarian Sembako"
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-[url('/latar.jpg')] bg-cover bg-center h-[450px]">
        <div className="container mx-auto px-6 md:px-12 h-full flex items-center relative z-10">
          <div className="max-w-xl text-white">
            <h1 className="text-xl md:text-2xl font-semibold leading-snug">
              Kami Menjual Berbagai Sembako Kebutuhan sehari-hari untuk anda,
              Belanja lebih mudah tanpa keluar rumah
            </h1>
            <button className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition">
              Belanja Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Produk List */}
      <section className="container mx-auto py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Sembako</h2>
        <div className="grid md:grid-cols-4 gap-6 mt-6">
          {[ 
            { name: "Indomie", price: "Rp 89.000", stock: 7, image: "/indomie.jpg" },
            { name: "Gula", price: "Rp 50.000", stock: 10, image: "/gula.jpg" },
            { name: "Sirup", price: "Rp 25.000", stock: 5, image: "/sirup.jpg" },
            { name: "Indomie", price: "Rp 89.000", stock: 7, image: "/indomie.jpg" },
          ].map((item, index) => (
            <div key={index} className="border-2 border-yellow-500 p-4 rounded-lg shadow-lg bg-white">
              <Image
                src={item.image}
                width={150}
                height={100}
                alt={item.name}
                className="mx-auto"
              />
              <h3 className="mt-2 font-semibold text-gray-900">{item.name}</h3>
              <p className="text-gray-700">{item.price}</p>
              <p className="text-gray-500">Sisa Stok: {item.stock}</p>
            </div>
          ))}

          {/* Placeholder Produk */}
          <div className="border-2 border-dashed border-yellow-500 p-4 rounded-lg bg-gray-200 h-48"></div>
          <div className="border-2 border-dashed border-yellow-500 p-4 rounded-lg bg-gray-200 h-48"></div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;