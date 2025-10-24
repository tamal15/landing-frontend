import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CartContext } from "../../Shared/Context/CartContext";
import ScrollToTop from "../../ScrollToTop/ScrollToTop";

const OfferPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useContext(CartContext);

  const handleAddToCart = (product) => {
    const exists = cart.find((pd) => pd._id === product._id);
    let newCart = [];

    if (exists) {
      const rest = cart.filter((pd) => pd._id !== product._id);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }

    localStorage.setItem("productCart", JSON.stringify(newCart));
    setCart(() => newCart);

    Swal.fire("Success!", "Product added to cart!", "success");
  };

  useEffect(() => {
    fetch(`https://servers.virtualshopbd.com/getoffer`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container mx-auto px-10 py-16 mt-28">
      <ScrollToTop/>
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        🎁 Exclusive Offers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col justify-between border rounded-xl shadow-[0_2px_10px_rgba(22,101,52,0.8)] bg-white hover:shadow-lg transition duration-300"
          >
            {/* Top with shadow and image */}
            <div className="relative p-4">
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm">
                {product.discount}
              </span>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl font-bold text-gray-800 mt-4">
                {product.title}
              </h3>
              <div className="mt-2">
                <p className="text-sm line-through text-gray-400">
                  ৳ {product.oldPrice}
                </p>
                <p className="text-xl font-bold text-green-700">
                  ৳ {product.ProductPrice}
                </p>
              </div>
            </div>

            {/* Bottom part with Add to Cart */}
            <div className="p-4 pt-0">
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-lg transition duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferPage;
