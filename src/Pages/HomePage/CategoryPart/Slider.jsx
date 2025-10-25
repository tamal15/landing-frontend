import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import { FaShoppingCart } from 'react-icons/fa'; 
const Slider = () => {
  const [data, setData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
console.log(data)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/getbannerdata`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (data.length === 0) return;
    const slideTime = data[currentSlide]?.time || 5000; // Default 5s
    const interval = setTimeout(() => {
      setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, slideTime);
    return () => clearTimeout(interval);
  }, [data, currentSlide]);

  // Handle Manual Navigation
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full mt-28 px-10 md:px-0     overflow-hidden  ">
      {/* Slider Content */}
   <div className="relative flex items-center justify-center mb-10">
  {data.length > 0 && (
    <>
      <a
        href={data[currentSlide].link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full"
      >
        <img
          src={data[currentSlide].image}
          alt={data[currentSlide].title}
          className="w-full h-[300px] md:h-[445px] object-cover object-top rounded-lg transition-opacity duration-500 ease-in-out"
        />
      </a>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition-all"
      >
        <FaChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition-all"
      >
        <FaChevronRight />
      </button>
    </>
  )}
</div>


  {/* offer or annocument  */}
        <div className="bg-green-800 -mt-10">
            <Marquee direction="right" speed={50}>
                <FaShoppingCart className="text-white mx-2" />
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfvFQyfZbgWwUW8GE8tM1vCa3-44nj1GlDtVRmoM1aaWlediA/viewform"
                    className="text-white font-bold no-underline"
                >
{data[0]?.detail}                </a>
                <FaShoppingCart className="text-white mx-2" />
            </Marquee>
        </div>

      

      {/* Dots Indicator */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all ${
              index === currentSlide ? "bg-blue-500 scale-110 shadow-lg" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div> */}

      


    </div>
  );
};

export default Slider;
