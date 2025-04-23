import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#1B2A36] text-white py-8">
      <div className="container mx-auto px-6 flex justify-between items-start">
        {/* Info Kontak (Kiri) */}
        <div>
          <p className="text-lg">Palu, Sulawesi Tengah</p>
          <p className="text-lg">(+62) 87654321987</p>
          <p className="text-lg">nurmadinah@gmail.com</p>
        </div>

        {/* Logo + Tentang Perusahaan (Kanan) */}
        <div className="flex flex-col items-end text-right">
          {/* Logo */}
          <Image src="/Logomitra.jpg" alt="Logo" width={80} height={80} className="mb-2 object-contain" />
          {/* Tentang Perusahaan */}
          <h3 className="font-bold text-lg">CV Nur Madinah</h3>
          <p className="text-sm max-w-xs">
            CV Nur Madinah adalah toko sembako yang berada di kota Palu, Sulawesi Tengah
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
