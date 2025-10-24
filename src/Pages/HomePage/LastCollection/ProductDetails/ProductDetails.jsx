import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../../Shared/Context/CartContext";
import Swal from "sweetalert2";
import ScrollToTop from "../../../ScrollToTop/ScrollToTop";
import { FaFacebook } from "react-icons/fa";

const ProductDetails = () => {
  const [book, setBook] = useState({});
  const [cart, setCart] = useContext(CartContext);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
 

console.log(cart)
  useEffect(() => {
    if (!id) return;
    fetch(`https://servers.virtualshopbd.com/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]); 
        }

        if (data.related) {
          fetch(`https://servers.virtualshopbd.com/related-products/${data.related}`)
            .then((res) => res.json())
            .then((relatedItems) => {
              const filteredRelated = relatedItems.filter((item) => item._id !== data._id);
              setRelatedProducts(filteredRelated.length > 0 ? filteredRelated : relatedItems);
            })
            .catch((error) => console.error("Error fetching related products:", error));
        } else {
          setRelatedProducts([]);
        }

        const savedCart = JSON.parse(localStorage.getItem("productCart")) || [];
        const existingProduct = savedCart.find((item) => item.id === data.id);
        
        if (existingProduct) {
          setSelectedSize(existingProduct.selectedSize);
          setQuantity(existingProduct.quantity);
        }
      });
  }, [id]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    let storedCart = JSON.parse(localStorage.getItem("productCart")) || [];
    const existingProductIndex = storedCart.findIndex((pd) => pd.id === book.id);

    if (existingProductIndex !== -1) {
      storedCart[existingProductIndex].selectedSize = size;
      storedCart[existingProductIndex].shippingCost = 0; 
    } else {
      storedCart.push({
        ...book,
        quantity: 1,
        selectedSize: size,
        totalPrice: parseInt(book.ProductPrice),
        shippingCost: 0,
      });
    }

    localStorage.setItem("productCart", JSON.stringify(storedCart));
    setCart(storedCart);
  };

  const updateLocalStorage = (updatedQuantity) => {
    let storedCart = JSON.parse(localStorage.getItem("productCart")) || [];
    const existingProductIndex = storedCart.findIndex((pd) => pd.id === book.id && pd.selectedSize === selectedSize);

    if (existingProductIndex !== -1) {
      storedCart[existingProductIndex].quantity = updatedQuantity;
      storedCart[existingProductIndex].totalPrice = parseInt(book.ProductPrice) * updatedQuantity;
      storedCart[existingProductIndex].shippingCost = 0;
    }

    localStorage.setItem("productCart", JSON.stringify(storedCart));
    setCart(storedCart);
  };

  const handleIncrementQuantity = () => {
    if (!selectedSize) {
      Swal.fire("Error", "Please select a size first!", "error");
      return;
    }
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateLocalStorage(newQuantity);
      return newQuantity;
    });
  };

  const handleDecrementQuantity = () => {
    if (!selectedSize) {
      Swal.fire("Error", "Please select a size first!", "error");
      return;
    }
    setQuantity((prevQuantity) => {
      const newQuantity = Math.max(1, prevQuantity - 1);
      updateLocalStorage(newQuantity);
      return newQuantity;
    });
  };

  const handleAddToCart = () => {
   
    let storedCart = JSON.parse(localStorage.getItem("productCart")) || [];
    const existingProductIndex = storedCart.findIndex((pd) => pd.id === book.id);

    if (existingProductIndex === -1) {
      storedCart.push({
        ...book,
        quantity: quantity,
        selectedSize: selectedSize,
        totalPrice: parseInt(book.ProductPrice) * quantity,
        shippingCost: 0,
      });
    } else {
      storedCart[existingProductIndex].shippingCost = 0;
    }
    localStorage.setItem("productCart", JSON.stringify(storedCart));
    setCart(storedCart);
    Swal.fire("Success", "Product added to cart!", "success");
  };


  

  return (
   <div className="container px-10 mx-auto my-10 p-4 mt-36">
  <ScrollToTop />

  {/* Header Info */}
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold text-gray-800 mb-2">
     Product Name: {book?.title}
    </h2>
    <h3 className="text-2xl font-semibold text-green-700">
      Product Price: ৳ {parseInt(book?.ProductPrice) * quantity}
    </h3>
  </div>

  {/* Main Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    {/* Image Section */}
    <div>
      {/* Main Image */}
      {selectedImage && (
        <img
          src={selectedImage}
          alt={book?.productName}
          className="w-full h-96 object-cover rounded-xl shadow-[0_2px_10px_rgba(22,101,52,0.8)]"
        />
      )}

      {/* Thumbnail Gallery */}
      <div className="flex flex-wrap gap-3 mt-6">
        {book.images &&
          book.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`thumbnail-${index}`}
              className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition"
              onClick={() => setSelectedImage(image)}
            />
          ))}
      </div>

      {/* Description */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Description</h3>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {book?.description}
        </p>
      </div>
    </div>

    {/* Product Info Card */}
    <div className="bg-white p-6 rounded-2xl  shadow-[0_2px_10px_rgba(22,101,52,0.8)] mb-60">
      <p className="text-lg font-semibold mb-2">
        <span className="text-gray-700">Product:</span> {book?.title}
      </p>
      <p className="text-lg font-semibold mb-2">
        <span className="text-gray-700">Category:</span> {book?.category}
      </p>
      <p className="text-lg font-semibold mb-2">
        <span className="text-gray-700">Code:</span> {book?.code}
      </p>
      <p className="text-lg font-semibold mb-2">
        <span className="text-gray-700">Total:</span> ৳{" "}
        {parseInt(book?.ProductPrice) * quantity}
      </p>
      <p className="text-lg font-semibold mb-3">
        <span className="text-gray-700">Stock:</span>{" "}
        <span className="text-green-600 font-bold">{book?.stock}</span>
      </p>
   
   <p className="text-lg font-semibold mb-3 flex items-center gap-3">
  <span className="text-gray-700">Facebook:</span>
  <a
    href={book?.facebook}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
    title="Visit Facebook Profile"
  >
    <FaFacebook className="text-blue-600 text-xl" />
  </a>
</p>


      {/* Size Selector */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Choose Size:</label>
        <div className="flex flex-wrap gap-3">
          {book.size &&
            book.size.split(",").map((size, index) => (
              <button
                key={index}
                onClick={() => handleSizeChange(size.trim())}
                className={`px-4 py-2 rounded-lg border font-semibold ${
                  selectedSize === size.trim()
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {size.trim().toUpperCase()}
              </button>
            ))}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleDecrementQuantity}
          className="w-10 h-10 bg-gray-200 rounded-full text-xl font-bold hover:bg-gray-300"
        >
          −
        </button>
        <span className="text-xl font-bold">{quantity}</span>
        <button
          onClick={handleIncrementQuantity}
          className="w-10 h-10 bg-gray-200 rounded-full text-xl font-bold hover:bg-gray-300"
        >
          +
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <Link to="/payment" className="w-full">
          <button
            onClick={handleAddToCart}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Buy Now
          </button>
        </Link>
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>

  {/* Related Products */}
  <div className="md:mt-20 -mt-40">
    <h3 className="text-2xl font-bold text-gray-800 mb-6">
      Related Products
    </h3>
    <div className="grid md:grid-cols-5 gap-6">
      {relatedProducts.length > 0 ? (
        relatedProducts.map((item) => (
          <div
            key={item._id}
            className="bg-white border rounded-xl p-4 shadow-[0_2px_10px_rgba(22,101,52,0.8)] hover:shadow-lg transition"
          >
            {item.images?.length > 0 ? (
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
            ) : (
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded-md text-gray-500">
                No Image
              </div>
            )}
            <h4 className="text-lg font-semibold">{item.title}</h4>
            <p className="text-gray-600 text-sm">{item.category}</p>
            <p className="text-green-600 font-bold mt-1">৳ {item.ProductPrice}</p>
            <Link
              to={`/bookDetails/${item._id}`}
              className="block mt-4 text-center bg-green-800 text-white py-2 rounded-md hover:bg-red-700 transition"
            >
              Order Now
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No related products found.</p>
      )}
    </div>
  </div>
</div>

  );
};

export default ProductDetails;
