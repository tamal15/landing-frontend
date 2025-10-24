import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { TbCoinTakaFilled } from "react-icons/tb";
import Swal from "sweetalert2";
import { CartContext } from "../../Shared/Context/CartContext";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

const ProductShow = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useContext(CartContext);

  const handleAddToCart = (product) => {
    const exists = cart.find(pd => pd._id === product._id);
    let newCart = [];
    if (exists) {
        const rest = cart.filter(pd => pd._id !== product._id);
        exists.quantity = exists.quantity + 1;
        newCart = [...rest, product];
    } else {
        product.quantity = 1;
        newCart = [...cart, product]
    }
    localStorage.setItem("productCart", JSON.stringify(newCart));
    setCart(() => newCart);
    Swal.fire('Success Product!');
  };

  useEffect(() => {
    fetch("https://servers.virtualshopbd.com/getproducts")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const categories = [...new Set(products.map((product) => product.category))];
  const sortedCategories = ["latest", ...categories.filter(cat => cat !== "latest")];

  return (
    <div className="md:p-5 p-1">

<h1 className="text-center font-bold  text-2xl">Popular Category</h1>
<hr className="max-w-28 mx-auto bg-green-800 h-1 border-none mt-2" />

<div className="mt-6 mb-20 md:max-w-6xl mx-auto">


  <div className="grid grid-cols-3 md:grid-cols-9 gap-4 justify-items-center">
    {sortedCategories.map((category) => {
      const firstProduct = products.find(p => p.category === category);
      const imageUrl = firstProduct?.images?.[0] || "https://via.placeholder.com/150";

      return (
        <Link
          key={category}
          to={`/category/${category}`}
          className="bg-white rounded-lg shadow-[0_2px_10px_rgba(22,101,52,0.8)] p-2 w-full max-w-[120px] flex flex-col items-center hover:shadow-xl transition-shadow"
        >
          <img
            src={imageUrl}
            alt={category}
            className="w-24 h-24 object-cover object-top rounded-lg mb-2"
          />
          <p className="text-center text-xl font-bold text-gray-700 truncate">
            {category}
          </p>
        </Link>
      );
    })}
  </div>
</div>


      {sortedCategories.map((category) => {
        let categoryProducts = products.filter((product) => product.category === category);
        categoryProducts = categoryProducts.reverse(); // Show latest uploaded products first

        return (
          <div key={category} className="md:max-w-6xl mx-auto mb-10">
            <h2 className="text-2xl font-bold capitalize  text-left">{category} Collection</h2>
            <hr className="max-w-28 mx-9 bg-green-800 h-1 border-none mt-2" />

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 mt-8 md:gap-4 gap-1">
              {categoryProducts.slice(0, 10).map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col items-start p-2 border rounded hover:shadow-lg bg-white shadow-[0_2px_10px_rgba(22,101,52,0.8)]"
                >
                  <div className="relative w-full h-40 mb-4">
      {/* Image */}
      <img
        src={product?.images[0] || "https://via.placeholder.com/150"}
        alt={product.title}
        className="w-full h-full object-cover rounded"
      />

      {/* Icons Overlay */}
      <div className="absolute top-24 right-2 flex flex-col gap-2">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebook className="text-blue-600 text-2xl bg-white p-1 rounded-full shadow cursor-pointer" />
        </a>
        <a href="https://wa.me/123456789" target="_blank" rel="noreferrer">
          <FaWhatsapp className="text-green-500 text-2xl bg-white p-1 rounded-full shadow cursor-pointer" />
        </a>
      </div>
    </div>
                  <Link to={`/bookDetails/${product._id}`}>
                  <h3 className="text-lg font-bold text-black">
                    {product.title.slice(0, 16)}
                  </h3>
                  <p className="text-lg text-gray-500">Code: {product.code || "N/A"}</p>
                  <p className="font-semibold text-black mb-4 flex items-center">
                    <TbCoinTakaFilled className="text-xl" />
                    <span className="ms-1">{product.ProductPrice} TK</span>
                  </p>
                  </Link>
                  <div className="flex justify-between items-center w-full">
                    <Link to={`/bookDetails/${product._id}`}>
                      <button className="bg-green-800 text-white px-3 py-2 rounded font-medium">
                        Details
                      </button>
                    </Link>
                    <button className="bg-green-800 text-white px-3 py-2 ms-1 md:mt-0 rounded font-medium" onClick={() => handleAddToCart(product)}>
                      AddCart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {categoryProducts.length > 1 && (
              <div className="mt-4 text-center">
                <Link to={`/category/${category}`}>
                  <button className="bg-green-800 text-white px-4 py-2 rounded font-medium">
                    Show More
                  </button>
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductShow;
