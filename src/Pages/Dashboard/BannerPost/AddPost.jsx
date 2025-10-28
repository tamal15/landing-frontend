import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddPost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); // Store uploaded image URL
  const { register, handleSubmit, reset } = useForm();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const image_upload_api = `https://api.styleunionshop.com/upload`;

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(image_upload_api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // ✅ Correct: get image URL from response
        const uploadedUrl = response.data.url;
        setImageUrl(uploadedUrl);
        console.log("✅ Uploaded Image URL:", uploadedUrl);
      } catch (error) {
        console.error("❌ Error uploading image:", error);
        Swal.fire("Error uploading image. Try again.");
      }
    }
  };

  const onSubmit = async (data) => {
    if (!imageUrl) {
      Swal.fire("Please upload an image before submitting!");
      return;
    }

    const formData = {
      title: data.title,
      link: data.link || null,
      time: data.time,
      image: imageUrl,
    };

    try {
      await axios.post(`https://api.styleunionshop.com/postaddbanner`, formData);
      Swal.fire({
        icon: "success",
        title: "Post Success",
        text: "Banner added successfully!",
      });
      reset();
      setImageUrl("");
      setIsOpen(false);
    } catch (error) {
      console.error("❌ Error adding banner:", error);
      Swal.fire("Error saving banner to database.");
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="block text-white bg-[#007cde] hover:bg-[#007cde] hover:scale-105 active:scale-90 duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#007cde] dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
        type="button"
      >
        Add Banner
      </button>

      {isOpen && (
        <div
          id="crud-modal"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center h-screen bg-black bg-opacity-40"
        >
          <div className="relative p-4 w-full max-w-xl bg-white rounded-lg shadow-md">
            <div className="mt-4 mb-6">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h2 className="text-xl font-semibold text-black">Add Your Banner</h2>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="py-5 px-8">
                <form onSubmit={handleSubmit(onSubmit)} className="text-center">
                  <input
                    {...register("title", { required: true })}
                    className="input input-text border-[2px] border-[#01c0c9] hover:border-[#007cde] rounded-3xl px-5 py-2 w-full md:min-w-[450px] max-w-[20.5rem] mx-2 text-xl mt-2"
                    placeholder="Title"
                    style={{ fontWeight: "600", color: "#0E1621", height: "60px" }}
                  />
                  <br />

                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="input-file border-[2px] border-[#01c0c9] hover:border-[#007cde] rounded-3xl px-5 py-2 w-full md:min-w-[450px] max-w-[20.5rem] mx-2 text-xl mt-2"
                  />
                  <br />

                  {/* Optional link field */}
                  {/* 
                  <input
                    {...register("link")}
                    className="input input-text border-[2px] border-[#01c0c9] hover:border-[#007cde] rounded-3xl px-5 py-2 w-full md:min-w-[450px] max-w-[20.5rem] mx-2 text-xl mt-2"
                    placeholder="Website link (optional)"
                    style={{ fontWeight: "600", color: "#0E1621", height: "60px" }}
                  />
                  <br />
                  */}

                  <input
                    {...register("time", { required: true })}
                    className="input input-text border-[2px] border-[#01c0c9] hover:border-[#007cde] rounded-3xl px-5 py-2 w-full md:min-w-[450px] max-w-[20.5rem] mx-2 text-xl mt-2"
                    placeholder="Time in ms (e.g. 5000 = 5s)"
                    style={{ fontWeight: "600", color: "#0E1621", height: "60px" }}
                  />
                  <br />

                  <button
                    className="bg-[#01c0c9] font-semibold text-white mt-5 mb-10 px-6 py-2 text-xl rounded-2xl"
                    type="submit"
                  >
                    Add Banner
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPost;
