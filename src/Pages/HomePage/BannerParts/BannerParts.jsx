import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Slider from "../CategoryPart/Slider";
// { searchQuery, setSearchQuery } 
const BannerParts = () => {
    const { t } = useTranslation();
    return (
      <div style={{background:"linear-gradient(to bottom, #01c0c9, #01c0c9, #007cde)"}} className=" text-white md:h-[500px] h-[330px]  flex items-center justify-center px-4">
        <div className="max-w-6xl w-full   md:mt-0 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* Left Section: Text and Search Bar */}
          <div className="text-center md:text-left">
            <h1 className="md:text-5xl text-xl  font-bold -mt-12 md:mt-8 md:mb-4 ">{t("communitySuccess")}</h1>
            <p className="text-lg sm:text-xl font-medium md:mb-8 mb-4">{t("fromPeople")}</p>
  
            {/* Search Bar */}
            {/* <div className="relative max-w-md">
              <input
                type="text"
                value={searchQuery} // Bind search query state
              onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a Category or Product"
                className="w-full px-3 font-medium md:text-xl -mt-4 md:px-6 md:py-4 py-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="absolute right-1 md:-top-4  -top-2 bg-yellow-500 hover:bg-yellow-600 text-white md:px-8 md:py-4 p-2 md:mt-1  rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m1.9-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                  />
                </svg>
              </button>
            </div> */}
            <div className="relative max-w-md">
              <Link to="/allads">
              <button className="w-full bg-white border-2 border-[#01c0c9]  px-3 font-bold md:text-xl -mt-4 md:px-6 md:py-4 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 text-xl ">Search All Ads</button>
              </Link>
            
              {/* <input
                type="text"
                value={searchQuery} // Bind search query state
              onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a Category or Product"
                className="w-full px-3 font-medium md:text-xl -mt-4 md:px-6 md:py-4 py-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              /> */}
              
            </div>
          </div>
  
          {/* Right Section: Illustration */}
          <div className="flex justify-center items-center relative mt-24">
            <div className="absolute md:-top-1  top-10 md:-left-8 md:w-64 w-52 h-28 bg-[#01c0c9] rounded-full blur-2xl opacity-30"></div>
  
           <Slider/>
          </div>
        </div>
      </div>
    );
  };
  BannerParts.propTypes = {
    searchQuery: PropTypes.string.isRequired, // Must be a string and required
    setSearchQuery: PropTypes.func.isRequired, // Must be a function and required
  };
  export default BannerParts;