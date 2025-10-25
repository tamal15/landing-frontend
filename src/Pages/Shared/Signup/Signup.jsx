import { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = '12345678901234567890123456789012'; // 32 chars key

// Encryption function
function encryptData(data) {
    const jsonData = JSON.stringify(data);
    const key = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY);
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(jsonData, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return `${iv.toString(CryptoJS.enc.Hex)}:${encrypted.ciphertext.toString(CryptoJS.enc.Hex)}`;
}


const Signup = () => {
  const {  authError } = useAuth();
  // const location = useLocation();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const { register, handleSubmit } = useForm();

  //
 

  // Submit Registration Data
  const onSubmit = async (data) => {
    
  
    // if (data.password !== data.password2) {
    //   alert("Your passwords do not match");
    //   return;
    // }
     // Encrypt the data
     const encryptedData = encryptData({
      displayName: data.name,
      password: data.password,
      phoneNumber
  });
  
    try {
      // Send registration data
      const response = await fetch(`http://localhost:5000/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: encryptedData }),
      });
  
      const result = await response.json();
  
      if (!result.success) {
        alert(result.message); // Show error if phone number is already registered
      } else {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "User registered successfully!",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Registration failed.",
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="shadow-[0_2px_18px_rgba(0,0,0,0.15)] md:p-10 p-3">
        <div className="flex flex-col md:flex-row items-center justify-center rounded-lg overflow-hidden">
          {/* Left Section */}
          <div className="p-5">
          <img src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"/>
          </div>

          {/* Signup Form */}
          <div className="md:w-1/2 rounded-xl p-9 bg-[#01c0c9] text-white">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Sign Up to Website</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                {...register("name", { required: true })}
                placeholder="Enter Full Name"
              />

<div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password", { required: true })}
                  placeholder="Enter Password"
                />
                <span
                  className="absolute top-3  right-3 text-black cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
             

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-white">Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 11-digit phone number"
                  maxLength={11}
                />
              </div>

            
              
              
              

              

              <button
                type="submit"
                className={`w-full bg-white text-black py-3 font-medium rounded-md transition duration-300 `}
               
              >
                Sign Up
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white">
                Already have an account?{" "}
                <Link to="/login" className="text-white hover:underline">Login here</Link>
              </p>
            </div>

            {authError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
                {authError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
