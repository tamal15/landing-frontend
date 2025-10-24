import { FaStar } from "react-icons/fa";

const Slide = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#A93AFF] via-[#BC3DFF] to-[#FF4FD8] text-white flex flex-col md:flex-row items-center justify-between overflow-hidden">

      {/* ✅ Left Side: Only One Image */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src="https://img.lazcdn.com/us/domino/1ee09fa5-9605-4739-91f0-0d57fa408055_BD-1976-688.jpg_2200x2200q80.jpg_.avif"
          alt="Brand Rush Left"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ✅ Right Product Section */}
      <div className="flex-1 relative flex justify-center items-center">
        <img
          src="https://i.ibb.co/DG4F5Jg/scooter.png"
          alt="Mega Deals"
          className="w-[60%] z-10"
        />
        <div className="absolute bottom-0 w-[80%] h-[200px] bg-gradient-to-t from-[#5A00C3] to-transparent rounded-3xl blur-[80px] opacity-70"></div>

        {/* Floating Tags */}
        <div className="absolute top-[20%] left-[60%] bg-yellow-400 text-black font-bold px-3 py-1 text-sm rotate-12 shadow-lg">
          MEGA DEALS
        </div>
        <div className="absolute top-[35%] right-[20%] bg-[#FF3E3E] text-white font-bold px-3 py-1 text-sm rotate-12 shadow-lg">
          HOT DEALS
        </div>
      </div>

      {/* ✅ App Download Sidebar */}
      <div className="hidden md:flex flex-col justify-center items-center bg-white w-[300px] h-full text-black px-6 py-8">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/888/888879.png"
            alt="App Logo"
            className="w-8 h-8"
          />
          <h2 className="font-bold text-lg">Download the App</h2>
        </div>

        <div className="bg-gradient-to-r from-[#FF7A00] to-[#FF3E9D] text-white w-full rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-sm">
            <FaStar className="text-yellow-300" />
            <span>4.8 Rated</span>
          </div>
          <h3 className="text-lg font-bold mt-1">Download App</h3>
          <div className="mt-2 space-y-1 text-sm">
            <p>🚚 Free Delivery</p>
            <p>⏳ Limited Time</p>
          </div>
        </div>

        <div className="mt-5">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/8b/QR_code_example.svg"
            alt="QR Code"
            className="w-32 h-32 mx-auto"
          />
        </div>

        <div className="flex gap-2 mt-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Available_on_the_App_Store_(black).png"
            alt="App Store"
            className="h-8"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            className="h-8"
          />
        </div>

        <p className="mt-4 text-sm text-gray-600">Download the App Now!</p>
      </div>
    </div>
  );
};

export default Slide;
