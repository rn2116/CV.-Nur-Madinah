"use client";

import Image from "next/image";
import Navbar from "@/components/navbar/Navbar"; // Pastikan path ini sesuai dengan lokasi Navbar
import Footer from "@/components/footer/Footer"; // Pastikan path ini sesuai dengan lokasi Footer

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Konten Utama */}
      <div className="flex-grow max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Tentang Kami</h1>
        <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-6">
          {/* Logo Perusahaan */}
          <div className="flex-1 flex justify-center">
            <Image 
              src="/Logomitra.jpg" 
              alt="CV. Nur Madinah Logo" 
              width={300} 
              height={300} 
              className="rounded-lg shadow-lg object-contain"
            />
          </div>

          {/* Deskripsi Perusahaan */}
          <div className="flex-1">
            <p className="text-black text-justify leading-relaxed">
              Tentang Kami
            Selamat datang di Web CV.Nur Madinah, platform terpercaya yang menghubungkan distributor dengan konsumen untuk memenuhi kebutuhan sehari-hari dengan mudah dan efisien.
            <br /> <br />
            Siapa Kami?
            Kami adalah marketplace yang menghadirkan produk-produk kebutuhan pokok langsung dari CV Nur Madinah, distributor terpercaya yang menyediakan berbagai jenis sembako dan barang kebutuhan lainnya. Dengan pengalaman bertahun-tahun, CV Nur Madinah berkomitmen untuk memberikan produk berkualitas dengan harga yang kompetitif.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
