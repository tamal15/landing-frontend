import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { TbCoinTakaFilled } from "react-icons/tb";
import Swal from "sweetalert2";
import { CartContext } from "../../Shared/Context/CartContext";
import ScrollToTop from "../../ScrollToTop/ScrollToTop";

const CategoryPage = () => {
  const { categoryName } = useParams();
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
    fetch(`https://api.styleunionshop.com/getproducts`)
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data
          .filter((product) => product.category === categoryName)
          .reverse(); // Show latest uploaded products first
        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [categoryName]);

  return (
    <div className="md:p-5 p-1 max-w-6xl mx-auto md:mt-32 mt-40 mb-7">
                  <ScrollToTop />

      <h2 className="text-3xl font-bold capitalize mb-4 text-center">
        {categoryName} Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 md:gap-4 gap-1 mt-12">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col items-start p-2 border rounded hover:shadow-lg bg-white shadow-[0_2px_10px_rgba(22,101,52,0.8)]"
          >
            <img
              src={product?.images[0] || "https://via.placeholder.com/150"}
              alt={product.title}
              className="w-full h-32 object-cover rounded mb-4"
            />
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
            <div className="flex  justify-between items-center w-full">
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
    </div>
  );
};

export default CategoryPage;