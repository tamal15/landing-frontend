import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { TbCoinTakaFilled } from "react-icons/tb";
import Swal from "sweetalert2";
import { CartContext } from "../../Shared/Context/CartContext";
import ScrollToTop from "../../ScrollToTop/ScrollToTop";

const AllAds = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:5000/getproducts")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.reverse()); // latest products first
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

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
    setCart(newCart);

    Swal.fire("Success!", "Product added to cart.", "success");
  };

  return (
    <div className="container mx-auto px-2 md:px-6 mt-40 mb-20">
      <ScrollToTop/>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Category Sidebar */}
        <div className="md:col-span-3 bg-white p-4 rounded-lg shadow-[0_2px_10px_rgba(22,101,52,0.8)] h-fit">
          <h2 className="text-xl font-bold mb-4 text-green-800">Categories</h2>
          <ul className="space-y-1 text-xl font-bold">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer px-3 py-2 rounded-md font-medium ${
                  selectedCategory === cat
                    ? "bg-green-800 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Products Grid */}
        <div className="md:col-span-9">
          <h2 className="text-2xl font-bold capitalize mb-4">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </h2>

          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col items-start p-3 border rounded hover:shadow-lg bg-white shadow-[0_2px_10px_rgba(22,101,52,0.8)] transition-all"
                >
                  <img
                    src={product?.images[0] || "https://via.placeholder.com/150"}
                    alt={product.title}
                    className="w-full h-32 object-cover rounded mb-3"
                  />

                  <Link to={`/bookDetails/${product._id}`} className="w-full">
                    <h3 className="text-lg font-bold text-black truncate">
                      {product.title.slice(0, 16)}
                    </h3>
                    <p className="text-sm text-gray-500">Code: {product.code || "N/A"}</p>
                    <p className="font-semibold text-black flex items-center mt-1">
                      <TbCoinTakaFilled className="text-xl" />
                      <span className="ms-1">{product.ProductPrice} TK</span>
                    </p>
                  </Link>

                  <div className="flex justify-between items-center gap-2 mt-4 w-full">
                    <Link to={`/bookDetails/${product._id}`} className="w-1/2">
                      <button className="w-full bg-green-800 text-white py-2 rounded text-sm">
                        Details
                      </button>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-1/2 bg-green-800 text-white py-2 rounded text-sm"
                    >
                      AddCart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAds;
