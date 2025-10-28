import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
  const { loginWithOwnEmailAndPass } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");


  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  
  
   

    const resetPassword = async () => {
      
      if (!newPassword) {
        Swal.fire("Error!", "Please enter a new password!", "error");
        return;
      }
      try {
        const response = await fetch(`https://api.styleunionshop.com/reset-password`, {
          method: "PUT", // ✅ Use PUT method for updating password
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber, newPassword }),
        });
    
        const data = await response.json();
        if (data.success) {
          Swal.fire("Success!", "Password updated successfully!", "success");
          setResetMode(false);
          setNewPassword("");
        } else {
          Swal.fire("Error!", data.message || "Failed to reset password.", "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Error resetting password.", "error");
      }
    };
    
    
    
    
  // Handle form submission
  const onSubmit = async (data) => {
    try {
      await loginWithOwnEmailAndPass(data.phoneNumber, data.password, location, navigate);
    } catch (error) {
      setAuthError(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="shadow-lg md:p-20 p-5 bg-white rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Left Section */}
          <div className="p-5">
           <img src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"/>
          </div>

          {/* Right Section */}
          <div className="bg-[#01c0c9]  md:p-8 p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Login to website</h2>

            {/* Show Authentication Error */}
            {authError && (
              <p className="bg-red-500 text-white text-center p-2 rounded-md mb-4">{authError}</p>
            )}

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Phone Number Input */}
              <div>
                <input
                  type="text"
                  {...register("phoneNumber", { required: "Phone number is required" })}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password Input with Toggle Visibility */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Password is required" })}
                  placeholder="Enter Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full text-xl font-medium py-2 rounded-lg transition duration-300 
                bg-white  hover:text-white text-black"
              >
                Login
              </button>


             

              <div className="mt-3 text-center">
                <p className="text-white">
                  New to Website?{" "}
                  <Link to="/signup" className="text-white underline ">
                    Create a free Account
                  </Link>
                </p>
              </div>
            </form>

            <div className="bg-[#01c0c9] md:p-8 p-6 rounded-lg w-full max-w-lg -mt-5">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">
              {/* {resetMode ? "Reset Password" : "Login to SellFlit"} */}
            </h2>

            {resetMode ? (
              <>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
                />
                
                  <>
                    
                   
                    
                   
                      <>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter New Password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2"
                        />
                        <button
                          onClick={resetPassword}
                          className="w-full py-2 bg-gradient-to-r from-[#007cde] to-[#01c0c9]  text-white rounded-lg mt-2 font-medium"
                        >
                          Update Password
                        </button>
                      </>
                    
                  </>
                
                {/* <button onClick={() => setResetMode(false)} className="text-white underline mt-4">
                  Back to Login
                </button> */}
              </>
            ) : (
              <button onClick={() => setResetMode(true)} className="w-full py-2 bg-gray-300 text-black rounded-lg">
                Reset Password
              </button>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
