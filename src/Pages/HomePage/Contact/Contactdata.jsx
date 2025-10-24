import { useState } from "react";
import Swal from "sweetalert2";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Import social media icons
import ScrollToTop from "../../ScrollToTop/ScrollToTop";

const Contactdata = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation (simple)
    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please fill out all fields.",
      });
      return;
    }

    // Simulate form submission (you can integrate with an API here)
    Swal.fire({
      icon: "success",
      title: "Message Sent",
      text: "Thank you for contacting us! We will get back to you shortly.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 mt-28">
                  <ScrollToTop />

      <div className="bg-white p-8 rounded-xl shadow-[0_2px_10px_rgba(22,101,52,0.8)] w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left side: Image */}
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg" // Replace with your image URL
            alt="Contact Us"
            className="rounded-lg shadow-lg w-full max-w-md"
          />
        </div>

        {/* Right side: Form */}
        <div className="md:w-1/2 flex flex-col justify-center px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Message Field */}
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message"
                rows="5"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Social Media Links */}
          {/* <div className="mt-6 flex justify-center space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-2xl text-blue-600 hover:text-blue-700" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-2xl text-blue-400 hover:text-blue-500" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl text-pink-500 hover:text-pink-600" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-2xl text-blue-700 hover:text-blue-800" />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Contactdata;
