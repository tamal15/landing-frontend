import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditProduct = () => {
  const [banner, setBanner] = useState({
    title: "",
    size: "",
    code: "",
    stock: "",
    category: "",
    related: "",
    ProductPrice: "",
    description: "",
    images: [],
  });

  const [imageFiles, setImageFiles] = useState([]);
  const { id } = useParams();
  const image_upload_api = `https://api.styleunionshop.com/upload`;

  useEffect(() => {
    fetch(`https://api.styleunionshop.com/editproductdata/${id}`)
      .then((res) => res.json())
      .then((data) => setBanner(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBanner((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  const handleRemoveImage = (indexToRemove) => {
    setBanner((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(image_upload_api, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data?.url) return data.url;
    else throw new Error("Image upload failed");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let updatedBanner = { ...banner };

    try {
      if (imageFiles.length > 0) {
        const uploadedUrls = await Promise.all(imageFiles.map(uploadImage));
        updatedBanner.images = [...banner.images, ...uploadedUrls];
      }

      const res = await fetch(`https://api.styleunionshop.com/productdataupdate/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBanner),
      });

      const result = await res.json();
      if (result.modifiedCount > 0) {
        Swal.fire({ icon: "success", title: "Updated!", text: "Product updated successfully." });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Update Failed", text: error.message });
    }
  };

  return (
    <div className="py-5 md:px-64">
      <div className="container">
        <div className="relative login-form text-center shadow rounded-2xl p-6 bg-white">
          <Link to={-1}>
            <FaArrowLeft className="absolute top-4 left-4 text-[#01c0c9] bg-white shadow p-2 rounded-full text-2xl cursor-pointer" />
          </Link>
          <h2 className="mb-5 text-black text-3xl font-semibold">Update Product</h2>
          <form onSubmit={handleUpdate}>
            {["title", "size", "code", "stock", "category", "related", "ProductPrice", "description"].map((name) => (
              <input
                key={name}
                name={name}
                value={banner[name]}
                onChange={handleChange}
                placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                className="w-full border-[2px] border-[#01c0c9] rounded-3xl px-5 py-3 my-2 text-lg"
              />
            ))}

            <div className="my-4">
              <p className="mb-2 font-semibold text-gray-700">Current Images:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {banner.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img src={img} className="w-24 h-24 object-cover rounded-md border" alt="Product" />
                    <button
                      type="button"
                      className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full px-2 text-xs"
                      onClick={() => handleRemoveImage(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full border-[2px] border-[#01c0c9] rounded-3xl px-5 py-3 text-lg"
            />

            <button
              type="submit"
              className="mt-6 bg-[#01c0c9] text-white font-bold py-3 px-6 rounded-2xl hover:bg-[#007cde] transition"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;