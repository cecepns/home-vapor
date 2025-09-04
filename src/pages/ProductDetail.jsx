import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessageCircle, Star, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { formatRupiahWithPrefix } from '../utils/currency';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.getProduct(id);
      setProduct(response.product);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppOrder = () => {
    const phoneNumber = '6289629978862';
    const message = `Halo, saya ingin memesan:\n\nProduk: ${product.name}\nHarga: ${formatRupiahWithPrefix(product.price)}\nJumlah: ${quantity}\n\nMohon informasi lebih lanjut. Terima kasih!`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link to="/products" className="text-blue-600 hover:text-blue-700">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="p-8">
              <img
                src={product.image ? `http://api-inventory.isavralabel.com/home-vapor/uploads-home-vapor/${product.image}` : '/api/placeholder/500/400'}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Product Info */}
            <div className="p-8">
              <div className="mb-4">
                <span className="text-sm text-blue-600 font-medium">
                  {product.category_name || 'Uncategorized'}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">(4.9/5 - 127 reviews)</span>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-blue-600">
                  Rp {product.price?.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <div 
                  className="text-gray-600 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <div className="mb-6">
                <span className="text-sm text-gray-600">
                  Stock: <span className="font-semibold">{product.stock || 0} items</span>
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock || 1, quantity + 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Order Button */}
              <div className="space-y-4">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageCircle size={20} />
                  <span>Order via WhatsApp</span>
                </button>

                <div className="text-center text-sm text-gray-600">
                  <p>Klik tombol di atas untuk memesan via WhatsApp</p>
                  <p>Admin akan membantu proses pemesanan Anda</p>
                </div>
              </div>

              {/* Product Features */}
              {/* <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Original & Authentic Product</li>
                  <li>✓ Quality Guaranteed</li>
                  <li>✓ Fast Delivery</li>
                  <li>✓ Expert Support</li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;