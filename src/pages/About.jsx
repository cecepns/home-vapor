import { useEffect } from 'react';
import { Award, Users, Heart, Target, CheckCircle } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Logo from '../assets/logo.jpeg'

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const values = [
    {
      icon: Award,
      title: 'Kualitas Utama',
      description: 'Kami berkomitmen menyediakan produk vapor berkualitas tinggi dari brand terpercaya dunia.'
    },
    {
      icon: Users,
      title: 'Fokus Pelanggan',
      description: 'Kepuasan pelanggan adalah prioritas utama kami dalam setiap layanan yang diberikan.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Kami memiliki passion yang tinggi dalam industri vapor dan terus berinovasi.'
    },
    {
      icon: Target,
      title: 'Keunggulan',
      description: 'Selalu berusaha memberikan yang terbaik dalam produk, layanan, dan pengalaman berbelanja.'
    }
  ];

  const achievements = [
    '5+ Tahun Pengalaman',
    '1000+ Pelanggan Puas',
    '5 Lokasi Toko',
    '100+ Varian Produk',
    'Dealer Resmi',
    'Dukungan Pelanggan 24/7'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang Home Vapor</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Toko vapor terpercaya di Bontang yang telah melayani ribuan pelanggan 
              dengan produk berkualitas tinggi dan pelayanan terbaik sejak 2019.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cerita Kami</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Home Vapor didirikan pada tahun 2019 dengan visi menjadi toko vapor terdepan 
                di Bontang. Berawal dari satu toko kecil, kami kini telah berkembang menjadi 
                jaringan toko dengan 5 outlet yang tersebar di berbagai lokasi strategis.
              </p>
              <p>
                Komitmen kami adalah menyediakan produk vapor berkualitas tinggi dengan 
                harga yang kompetitif, didukung oleh tim yang berpengalaman dan passionate 
                dalam industri vapor.
              </p>
              <p>
                Kami bangga telah melayani lebih dari 1000 pelanggan dan terus berinovasi 
                untuk memberikan pengalaman berbelanja yang terbaik.
              </p>
            </div>
          </div>
          <div data-aos="fade-left">
            <img
              src={Logo}
              alt="Home Vapor Store"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nilai-nilai yang menjadi fondasi dalam setiap langkah perjalanan Home Vapor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pencapaian Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pencapaian yang membanggakan dalam perjalanan Home Vapor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-3"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                <span className="text-gray-900 font-medium">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div data-aos="fade-right">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Misi Kami</h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed">
                  Menyediakan produk vapor berkualitas tinggi dengan pelayanan terbaik, 
                  membantu pelanggan menemukan produk yang sesuai dengan kebutuhan mereka, 
                  dan membangun komunitas vapor yang positif di Bontang.
                </p>
              </div>
            </div>

            <div data-aos="fade-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Visi Kami</h2>
              <div className="bg-purple-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed">
                  Menjadi toko vapor terdepan dan terpercaya di Kalimantan Timur, 
                  dikenal karena kualitas produk, pelayanan prima, dan kontribusi 
                  positif terhadap komunitas vapor Indonesia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tim Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tim profesional yang berpengalaman dan passionate dalam industri vapor
            </p>
          </div>

          <div className="bg-blue-600 text-white rounded-lg p-8 text-center" data-aos="fade-up">
            <h3 className="text-2xl font-bold mb-4">Bergabunglah dengan Keluarga Kami</h3>
            <p className="mb-6">
              Kami selalu mencari talenta terbaik untuk bergabung dengan tim Home Vapor. 
              Jika Anda passionate tentang industri vapor dan ingin berkembang bersama kami, 
              jangan ragu untuk menghubungi kami.
            </p>
            <a
              href="https://wa.me/6289629978862?text=Halo, saya tertarik untuk bergabung dengan tim Home Vapor"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;