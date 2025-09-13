import { useEffect } from 'react';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { outlets } from '../data/outlets';

const Outlets = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleWhatsAppClick = (whatsapp, outletName) => {
    const message = `Halo, saya ingin bertanya tentang outlet ${outletName}`;
    const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4" data-aos="fade-up">
            Outlet Kami
          </h1>
          <p className="text-gray-600" data-aos="fade-up" data-aos-delay="100">
            Kunjungi toko kami di seluruh Bontang untuk pengalaman berbelanja vapor terbaik
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {outlets.map((outlet, index) => (
            <div
              key={outlet.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                outlet.type === 'pusat' ? 'ring-2 ring-blue-500' : ''
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {outlet.type === 'pusat' && (
                <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                  TOKO UTAMA
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{outlet.name}</h3>
                  {outlet.type === 'pusat' && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                      KANTOR PUSAT
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                    <p className="text-gray-600">{outlet.address}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="text-green-500 flex-shrink-0" size={20} />
                    <a
                      href={`tel:${outlet.phone}`}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {outlet.phone}
                    </a>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleWhatsAppClick(outlet.whatsapp, outlet.name)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                  >
                    <MessageCircle size={18} />
                    <span>Chat WhatsApp</span>
                  </button>
                </div>

                {/* Store Hours */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    <strong>Jam Operasional:</strong> 10.00-23.30 WITA
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="mt-16" data-aos="fade-up">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Temukan Kami di Peta
            </h2>
            <div className="bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8074784139!2d117.4892976745995!3d0.13357169986511744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x320a1398a35eb7e9%3A0x2d17f1cd630fccd9!2sHome%20Vapor%20Bontang!5e0!3m2!1sid!2sus!4v1756442426478!5m2!1sid!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Toko Utama Home Vapor"
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                <strong>Lokasi Toko Utama:</strong> Jl. Ahmad Yani, simpang 4 RS Amalia, Kelurahan Api-Api, Bontang Baru
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16" data-aos="fade-up">
          <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Butuh Bantuan Menemukan Kami?</h2>
            <p className="mb-6">
              Hubungi toko utama kami untuk petunjuk arah atau pertanyaan lainnya
            </p>
            <button
              onClick={() => handleWhatsAppClick('6289629978862', 'Home Vapor')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <MessageCircle size={20} />
              <span>Hubungi Toko Utama</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outlets;