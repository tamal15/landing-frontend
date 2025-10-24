import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

import { MdAccountCircle } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { CartContext } from "../Context/CartContext";

const Navber = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user } = useAuth();
  const cartProducts = useContext(CartContext)[0];
  let totalQuantity = cartProducts.reduce((acc, product) => acc + (product.quantity || 1), 0);

  // ✅ Ensure user properties exist
  const displayName = user?.displayName || "Guest";
  const phoneNumber = user?.phoneNumber || "No Phone";

  console.log("User Name:", displayName);
  console.log("Phone Number:", phoneNumber);
  
  // Ens
  const receiverEmail = user?.phoneNumber;

  const [navData, setNavData] = useState([]);

  useEffect(() => {
    axios.get("https://servers.virtualshopbd.com/getnavber")
      .then((res) => setNavData(res.data))
      .catch((err) => console.error("Error fetching navbar data:", err));
  }, []);
console.log(navData)
  useEffect(() => {
    const fetchUnreadMessages = async () => {
      if (!receiverEmail) return;

      
    };

    fetchUnreadMessages();
    const interval = setInterval(fetchUnreadMessages, 5000); // Auto-refresh every 5 sec
    return () => clearInterval(interval);
  }, [receiverEmail]);



  // Toggle navigation menu (hamburger menu)
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <>
     
      {/* Navbar */}
      <div className="w-full fixed top-0 left-0  z-[998]">
      <div style={{ backgroundColor: navData[0]?.background , color:navData[0]?.color}} className="flex flex-wrap justify-between items-center  px-4 py-2 w-full  text-sm md:text-base gap-2 md:gap-4">
  <h1 className="whitespace-nowrap">{navData[0]?.email}</h1>
  <h1 className="whitespace-nowrap">{navData[0]?.number}</h1>
  <h1 className="text-center w-full md:w-auto">{navData[0]?.detail}</h1>
</div>


        <nav className="flex justify-between items-center p-2 backdrop-blur-sm backgroundsnavbar w-full px-4 shadow-[0_2px_10px_rgba(22,101,52,0.8)]">
          <div className="flex items-center mt-5 md:mt-0">
            <Link to="/">
              <img
                src={navData[0]?.image}
                alt="Logo Image"
                className="w-[70px] md:h-[60px] h-[40px] md:mt-1 text-white"
              />
            </Link>
          </div>

          {/* Center Navigation Links */}
          <ul className={`hidden md:flex md:items-center md:gap-10`}>
            <li className="font-medium text-black text-xl">
              <Link to="/">Home</Link>
            </li>
          
            
      
        {/* If user is logged in, show Chat and Account */}
        <li className="font-medium text-black text-xl">
          <Link to="/aboutpart" className="flex">
            <CgProfile className="text-xl mt-1" />
            <button className="ms-2">About
            
            </button>
           
          </Link>
        </li>

        <li className="font-medium text-black text-xl">
          <Link to="/allads" className="flex">
            <MdAccountCircle className="text-xl mt-1" />
            <button className="ms-2">All Ads</button>
          </Link>
        </li>
        <li className="font-medium text-black text-xl">
       <Link to="/OrderReview">
       <button className="relative p-2">
        <span className="absolute -top-2 -right-2 bg-green-800 text-white text-xs rounded-full px-2">
          {totalQuantity || 0}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l1 5m0 0h13l-1.4 7H7.4L6 8m0 0L5 3m2 15a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z"
          />
        </svg>
      </button>
       
       </Link>
        </li>
      
  
    
    
            <li className="font-medium text-black text-xl">
              <Link to="/blog">
              <button className=" ms-1">Blog</button>
              </Link>
           
            </li>
            <li className="font-medium text-black text-xl">
           <Link to="/offer">
           <button style={{ backgroundColor: navData[0]?.background , color:navData[0]?.color}} className=" py-1 px-3 rounded-full" >
             Offer
      </button>
           </Link>
            </li>
            
          </ul>

          {/* Contact Us Link */}
          <div className="hidden md:block">
            <Link to="/contactdata">
            <button style={{ backgroundColor: navData[0]?.background , color:navData[0]?.color}} className=" px-4 py-2 rounded-full font-bold">Contact Us</button>
            </Link>
          
          </div>

          {/* Mobile Menu Toggle */}
          <div
            className={`md:hidden mt-3 cursor-pointer ${isNavOpen ? "toggle" : ""}`}
            onClick={toggleNav}
          >
            <div className="line1 w-6 h-1 bg-black mb-1"></div>
            <div className="line2 w-6 h-1 bg-black mb-1"></div>
            <div className="line3 w-6 h-1 bg-black"></div>
          </div>

          {/* Mobile Menu */}
          {/* Mobile Menu */}
<ul
  className={`absolute top-20 left-0 w-full bg-white transition-all duration-500 ease-in md:hidden flex flex-col items-center ${
    isNavOpen ? "opacity-100 visible" : "opacity-0 invisible"
  }`}
>
  <li className="font-medium text-black text-xl py-2">
    <Link to="/" onClick={() => setIsNavOpen(false)}>
     Home
    </Link>
  </li>

 
    <>
      {/* If user is logged in, show Chat and Account */}
      <li className="font-medium text-black text-xl py-2">
        <Link to="/aboutpart" className="flex" onClick={() => setIsNavOpen(false)}>
          <CgProfile className="text-xl mt-1" />
          <button className="ms-2">About
            </button>
        </Link>
      </li>

      <li className="font-medium text-black text-xl py-2">
        <Link to="/allads" className="flex" onClick={() => setIsNavOpen(false)}>
          <MdAccountCircle className="text-xl mt-1" />
          <button className="ms-2">All Ads</button>
        </Link>
      </li>
      <li className="font-medium text-black text-xl">
      <Link to="/OrderReview">
       <button className="relative p-2">
        <span className="absolute -top-2 -right-2 bg-green-800 text-white text-xs rounded-full px-2">
          {totalQuantity || 0}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l1 5m0 0h13l-1.4 7H7.4L6 8m0 0L5 3m2 15a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z"
          />
        </svg>
      </button>
       
       </Link>
        </li>
    </>
  
   

  <li className="font-medium text-black text-xl py-2">
    <Link to="/blog" onClick={() => setIsNavOpen(false)}>
      <button className="ms-1">Blog</button>
    </Link>
  </li>

  <li className="font-medium text-black text-xl py-2">
  <Link to="/offer">
  <button
      className="bg-green-800 text-white py-1 px-3 rounded-full"
    >
     Offer
    </button>
  </Link>
  </li>

  <div className="md:block py-2">
    <Link to="/contactdata" onClick={() => setIsNavOpen(false)}>
      <button className="bg-green-800 text-white px-4 py-2 rounded-full font-bold">
       Contact Us
      </button>
    </Link>
  </div>
</ul>

          
        </nav>
      </div>
    </>
  );
};

export default Navber;
