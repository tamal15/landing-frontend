import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GetAbout = () => {
  const [aboutData, setAboutData] = useState(null);
  const navigate = useNavigate();

  // Fetch about data
  useEffect(() => {
    axios
      .get("https://servers.virtualshopbd.com/aboutparts")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setAboutData(response.data[0]); // Assuming single entry
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  
  if (!aboutData) {
    return <p className="text-center mt-20">Loading...</p>; // Loading state
  }

  return (
    <section>
      <div className="container mx-auto px-4 sm:px-8 overflow-x-auto">
        <div className="py-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-around bg-gray-200 py-3 my-3 rounded-md">
            <p className="text-blue-500 font-semibold">Title</p>
            <p className="text-blue-500 font-semibold">Description</p>
            <p className="text-blue-500 font-semibold">Image</p>
            <p className="text-blue-500 font-semibold">Action</p>
          </div>

          {/* Data Row */}
          <div className="flex flex-col md:flex-row items-center justify-around shadow-md p-4 my-3 rounded-md">
            <p className="w-1/4 text-center">{aboutData.title}</p>
            <p className="w-1/2 text-center">{aboutData.description}</p>
            <div className="w-1/4 flex justify-center">
              <img className="h-24 w-24 rounded" src={aboutData.image} alt="About" />
            </div>
            <div className="w-1/4 flex items-center justify-center space-x-4">
              <button
                onClick={() => navigate(`/dashboard/editabout/${aboutData._id}`)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500 text-white text-xl"
              >
                <FaPencilAlt />
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetAbout;
