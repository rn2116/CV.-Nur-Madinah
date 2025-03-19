const Footer = () => {
    return (
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-4">
          {/* Info Kontak */}
          <div>
            <h3 className="font-bold">Palu, Sulawesi Tengah</h3>
            <p>(+62) 87654321987</p>
            <p>nurmadinah@gmail.com</p>
          </div>
  
          {/* Tentang Perusahaan */}
          <div className="text-right">
            <h3 className="font-bold">CV Nur Madinah</h3>
            <p>CV Nur Madinah adalah toko sembako yang berada di kota Palu Sulawesi Barat</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  