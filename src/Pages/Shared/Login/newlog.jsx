







import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FcCameraAddon, FcNeutralTrading, FcSearch } from "react-icons/fc";
import Swal from "sweetalert2";
import { useState } from "react";

const Login = () => {
  const { loginWithOwnEmailAndPass } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  // Handle Login Submission (Only Allowed After OTP Verification)
  const onSubmit = (data) => {
    if (!otpVerified) {
      Swal.fire({
        icon: "warning",
        title: "OTP Not Verified",
        text: "Please verify the OTP before logging in.",
      });
      return;
    }
    loginWithOwnEmailAndPass(data.phoneNumber, location, navigate);
  };

  // Send OTP
  const sendOtp = async () => {
    if (!/^\d{11}$/.test(phoneNumber)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Please enter a valid 11-digit Bangladeshi phone number.",
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await response.json();

      if (data.success) {
        setOtpSent(true);
        Swal.fire({
          icon: "success",
          title: "OTP Sent",
          text: "Check your phone for the OTP.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Send OTP",
          text: data.message || "Error sending OTP. Try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Could not send OTP. Please try again later.",
      });
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    try {
      const response = await fetch(`http://localhost:5000/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp }),
      });
      const data = await response.json();

      if (data.success) {
        setOtpVerified(true);
        setSuccessMessage("OTP Verified Successfully!");
        Swal.fire({
          icon: "success",
          title: "OTP Verified",
          text: "You can now proceed with login.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid OTP",
          text: data.message || "Please enter the correct OTP.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Verification Error",
        text: "Could not verify OTP. Try again later.",
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="shadow-[0_2px_18px_rgba(0,0,0,0.15)] md:p-20 p-3">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Left Section */}
          <div className="p-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">SellFlit এ স্বাগতম!</h2>
            <p className="text-gray-600 mb-6">আপনার অ্যাকাউন্টের নিয়ন্ত্রণ নিতে লগ ইন করুন।</p>

            <div className="space-y-6">
              <div className="flex items-start">
                <FcNeutralTrading className="w-10 h-10 mr-4" />
                <p className="text-gray-700 font-medium">দ্রুত আপনার বিজ্ঞাপন পোস্ট করা শুরু করুন।</p>
              </div>
              <div className="flex items-start">
                <FcSearch className="w-10 h-10 mr-4" />
                <p className="text-gray-700 font-medium">পছন্দের বিজ্ঞাপনগুলো ফেভারিট হিসেবে সেভ করুন।</p>
              </div>
              <div className="flex items-start">
                <FcCameraAddon className="w-10 h-10 mr-4" />
                <p className="text-gray-700 font-medium">প্রয়োজনমতো সময়ে বিজ্ঞাপনগুলো দেখুন ও নিয়ন্ত্রণ করুন।</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-gradient-to-r from-[#01c0c9] to-[#007cde] md:p-8 p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Login to SellFlit</h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Phone Number Input */}
              <div>
                <input
                  type="text"
                  {...register("phoneNumber", { required: true })}
                  placeholder="Enter phone number"
                  className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              {/* OTP Input */}
              {otpSent && (
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter OTP"
                    maxLength={6}
                  />
                </div>
              )}

              {/* OTP Buttons */}
              {!otpSent ? (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="w-full py-3 bg-white font-medium text-black rounded-md hover:bg-blue-700"
                >
                  Send OTP
                </button>
              ) : (
                <button
                  type="button"
                  onClick={verifyOtp}
                  className="w-full py-3 bg-blue-700 text-white rounded-md hover:bg-green-700"
                  disabled={otpVerified}
                >
                  {otpVerified ? "OTP Verified ✅" : "Verify OTP"}
                </button>
              )}

              {successMessage && <p className="mt-4 text-white font-semibold">{successMessage}</p>}

              {/* Login Button (Disabled Until OTP is Verified) */}
              <button
                type="submit"
                disabled={!otpVerified}
                className={`w-full text-xl font-medium py-2 rounded-lg transition duration-300 ${
                  otpVerified ? "bg-white hover:bg-blue-700 text-black" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Login
              </button>

              <div className="mt-3 text-center">
                <p className="text-white">
                  New to SellFlit?{" "}
                  <Link to="/signup" className="text-white underline hover:text-blue-400">
                    Create a free Account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

