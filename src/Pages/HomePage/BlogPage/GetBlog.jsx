import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GetBlog = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // Fetch blog posts data
  useEffect(() => {
    axios
      .get("https://api.styleunionshop.com/blogpart") // Replace with your API URL
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setPosts(response.data); // Assuming response contains array of blog posts
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle the "Read More" action
 

  if (posts.length === 0) {
    return <p className="text-center mt-20">Loading...</p>; // Loading state
  }

  return (
    <section>
      <div className="container mx-auto px-4 sm:px-8 overflow-x-auto">
        <div className="py-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-around bg-gray-200 py-3 my-3 rounded-md">
            <p className="text-blue-500 font-semibold">Title</p>
            <p className="text-blue-500 font-semibold">Description</p>
            <p className="text-blue-500 font-semibold">content</p>
            <p className="text-blue-500 font-semibold">Image</p>
            <p className="text-blue-500 font-semibold">Action</p>
          </div>

          {/* Data Rows */}
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col md:flex-row items-center justify-around shadow-md p-4 my-3 rounded-md"
            >
              <p className="w-1/4 text-center">{post.title}</p>
              <p className="w-1/2 text-center">{post.description}</p>
              <p className="w-1/2 text-center">{post.content}</p>
              <div className="w-1/4 flex justify-center">
                <img className="h-24 w-24 rounded" src={post.image} alt={post.title} />
              </div>
              <div className="w-1/4 flex items-center justify-center space-x-4">
               
                <button
                  onClick={() => navigate(`/dashboard/editblog/${post._id}`)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500 text-white text-xl"
                >
                  <FaPencilAlt />
                </button>
              </div>
            </div>
          ))}

         
        </div>
      </div>
    </section>
  );
};

export default GetBlog;
