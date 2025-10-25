import { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    // Fetch the footer data from the backend
    const fetchFooterData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getfooters"
        ); // Adjust the API URL as needed
        setFooterData(response.data[0]); // Assuming you're returning an array with one object
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchFooterData();
  }, []);

  if (!footerData) {
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

  const { header, footer } = footerData;
  return (
    <>
      {/* Header Section */}
      <div
        style={{ backgroundColor: header?.background, color: header?.color }}
        className=" py-4 text-center"
      >
        <div className="flex justify-center items-center gap-3 text-white text-xl font-semibold">
          <FaPhoneAlt className="bg-white text-black p-2 rounded-full text-3xl" />
          <span>{header.phone}</span>
        </div>
        <p className="text-lg mt-2 text-white">
          <span className="text-white font-bold">{header.orderNowText}</span>{" "}
          {header.orderMessage}
        </p>
        <p className="text-lg text-white">
          {header.viewAllMessage}{" "}
          <span className="text-white font-bold">{header.viewAllButton}</span>
        </p>
      </div>

      {/* Footer Section */}
      <div className="bg-[#051e3e] text-white py-6">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
            <p>{footer.contact.address}</p>
            <p>{footer.contact.phone}</p>
            <p className="mt-2">✉ {footer.contact.email}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Quick Link</h2>
            <ul className="space-y-2">
              {footer.quickLinks.map((link, index) => (
                <li key={index}>
                  {link.icon} {link.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Payment & Courier */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Payment Option</h2>
            <div className="flex space-x-2">
              {footer?.paymentOptions.map((option, index) =>
                option ? (
                  <img
                    key={index}
                    src={option}
                    alt={`Payment Option ${index + 1}`}
                    className="h-8"
                  />
                ) : null
              )}
            </div>

             <h2 className="text-lg font-semibold mb-3">Courier Option</h2>
            <div className="flex space-x-2">
              {footer?.courierPartners.map((option, index) =>
                option ? (
                  <img
                    key={index}
                    src={option}
                    alt={`Payment Option ${index + 1}`}
                    className="h-8"
                  />
                ) : null
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-6 border-t border-gray-500 pt-4">
          <p className="text-sm">
            All Rights Reserved By{" "}
            <span className="text-green-400">{footer.copyright.owner}</span>
          </p>
          <p className="text-sm">
            Development By <span className="text-green-400">Component IT</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
