import  { useContext, useEffect, useState } from 'react';
import { TbCoinTakaFilled } from 'react-icons/tb';
import Swal from 'sweetalert2';
import { CartContext } from '../../Shared/Context/CartContext';
import { Link } from 'react-router-dom';
// import CryptoJS from 'crypto-js';


// const ENCRYPTION_KEY = '12367362730987651236789456789012'; 

// function decryptData(encryptedData) {
//     const [ivHex, encryptedHex] = encryptedData.split(':');
//     const iv = CryptoJS.enc.Hex.parse(ivHex);
//     const encryptedText = CryptoJS.enc.Hex.parse(encryptedHex);

//     const key = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY);
//     const decrypted = CryptoJS.AES.decrypt(
//         { ciphertext: encryptedText },
//         key,
//         { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
//     );

//     return JSON.parse(CryptoJS.enc.Utf8.stringify(decrypted));
// }

const LastCollection = () => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useContext(CartContext);


    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch(
              `https://servers.virtualshopbd.com/getproducts`
            );
            const result = await response.json();
            setData(result);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, []);
console.log(data)


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
    Swal.fire(
      'Success Product!',
      
  )
};

    return (
        <div className="max-w-6xl mx-auto">

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
        {data?.map((product) => (
          <div
            key={product._id}
            className="flex flex-col items-start p-4 border rounded hover:shadow-lg bg-white shadow-[0_2px_18px_rgba(0,0,0,0.15)]"
          >
            <img
              src={product?.images[0] || "https://via.placeholder.com/150"}
              alt={product.model}
              className="w-full h-32 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-bold text-blue-600">
              {product.title.slice(0,16)} 
             
            </h3>
            {/* <p className="text-lg text-gray-500 ">
              {product.division.split(" ")[0] || "N/A"}, {product.category.split(" ")[0] || "N/A"}
            </p> */}
            <p className="text-lg text-gray-500 ">
              {/* {product.subCategory.split(" ")[0] || "N/A"} */}
              code:280
            </p>
            <p className="font-semibold text-blue-600 mb-4 flex">
              <TbCoinTakaFilled className="text-xl mt-1" />{" "}
              <p className="ms-1">{product.ProductPrice}</p>
            </p>
            <div className="flex justify-between items-center w-full ">
                <h4></h4>
             
             <Link to={`/bookDetails/${product._id}`}>
             <button
                // onClick={() => handleViewDetails(product)}
                // onClick={() => handleAddToCart(product)}
                className="bg-[#007cde] text-white px-4 py-2 rounded font-medium"
              >
                Add to cart
              </button>
             </Link>
            </div>
          </div>
        ))}
      </div>
            
        </div>
    );
};

export default LastCollection;