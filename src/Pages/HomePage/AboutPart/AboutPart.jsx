import { useEffect, useState } from "react";
import ScrollToTop from "../../ScrollToTop/ScrollToTop";

const AboutPart = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch("https://servers.virtualshopbd.com/aboutparts") // Fetching data from the API
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAboutData(data[0]); // Assuming only one about section
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!aboutData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center space-y-6">
          {/* Multi-colored Animated Loader */}
          <div className="relative">
            <div className="w-20 h-20 border-8 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-1 w-16 h-16 border-8 border-blue-500 border-t-transparent rounded-full animate-spin-slow"></div>
            <div className="absolute inset-2 w-12 h-12 border-8 border-green-500 border-t-transparent rounded-full animate-spin-reverse"></div>
          </div>
          
          {/* Loading Text */}
          <p className="text-xl font-bold text-gray-700 tracking-wide animate-pulse">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }
  

  return (
    <div className="md:px-20 px-8">
      <ScrollToTop />

      <div className="flex items-center justify-center mt-32">
        <img className="h-[300px]" src={aboutData.image} alt="About" />
      </div>

      <div className="mb-16">
        <h1>{aboutData.title}</h1>
        <p>{aboutData.description}</p>
      </div>
    </div>
  );
};

export default AboutPart;
