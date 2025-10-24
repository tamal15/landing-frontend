import { useState, useEffect } from "react";
import ScrollToTop from "../../ScrollToTop/ScrollToTop";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://servers.virtualshopbd.com/blogpart`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const toggleReadMore = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === id
          ? { ...post, showFullContent: !post.showFullContent }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 mt-28">
      <ScrollToTop />

      <div className="container mx-auto px-4 md:px-16">
        <h2 className="text-4xl font-semibold text-gray-800 mb-8">
          Latest Blog Posts
        </h2>

        {/* Grid Layout for Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-4 rounded-lg shadow-[0_2px_12px_rgba(22,101,52,0.8)] hover:shadow-lg hover:shadow-green-800 transition-all duration-300"
            >
              {/* Post Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              {/* Post Title */}
              <h3 className="text-2xl font-semibold text-gray-900 hover:text-green-700 cursor-pointer mb-2">
                {post.title}
              </h3>

              {/* Post Description */}
              <p className="text-gray-700 mb-4">{post.description}</p>

              {/* Read More Button */}
              <button
                onClick={() => toggleReadMore(post._id)}
                className="text-green-700 hover:text-green-900 font-semibold"
              >
                {post.showFullContent ? "Show Less" : "Read More →"}
              </button>

              {/* Full Content */}
              {post.showFullContent && (
                <div className="mt-4 text-gray-800">
                  <p>{post.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
