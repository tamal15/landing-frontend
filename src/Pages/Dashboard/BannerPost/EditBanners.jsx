import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditBanners = () => {
  const [banner, setBanner] = useState({
    title: "",
    link: "",
    time: "",
    detail: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const { id } = useParams();
  const image_upload_api = `http://localhost:5000/upload`;

  // Fetch banner data
  useEffect(() => {
    fetch(`http://localhost:5000/editbaners/${id}`)
      .then((res) => res.json())
      .then((data) => setBanner(data))
      .catch((error) => console.error("Error fetching banner:", error));
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBanner((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  // Upload image to server and return URL
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(image_upload_api, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data?.url) {
      return data.url;
    } else {
      throw new Error("Image upload failed");
    }
  };

  // Handle form submit (update)
  const handleUpdate = async (e) => {
    e.preventDefault();

    let updatedBanner = { ...banner };

    if (imageFile) {
      try {
        const imageUrl = await uploadImage(imageFile);
        updatedBanner.image = imageUrl;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Image Upload Failed",
          text: error.message,
        });
        return;
      }
    }

    // Send updated data
    fetch(`http://localhost:5000/bannerdataupdate/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBanner),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.success) {
          Swal.fire({
            icon: "success",
            title: "Update Success",
            text: "Banner updated successfully!",
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "No Changes",
            text: "Nothing was changed.",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating banner:", error);
        Swal.fire("Error updating banner.");
      });
  };

  return (
    <div>
      <div className="py-5 md:px-64">
        <div className="container">
          <div>
            <div className="relative login-form text-center shadow" style={{ borderRadius: "20px" }}>
              <Link to={-1}>
                <FaArrowLeft className="relative top-2 left-2 text-[#01c0c9] bg-primary text-3xl p-2 rounded-full duration-300 active:scale-90 cursor-pointer select-none" />
              </Link>
              <h2 className="mb-5 text-black text-3xl font-semibold">Update Home Project</h2>
              <form onSubmit={handleUpdate}>
                <input
                  onChange={handleChange}
                  value={banner.title}
                  name="title"
                  placeholder="Title"
                  style={{ fontWeight: "600", color: "#0E1621", height: "60px" }}
                  className="input input-text border-[2px] border-[#01c0c9] hover:border-[#007cde] rounded-3xl px-5 py-2 w-full md:min-w-[450px] max-w-[20.5rem] mx-2 text-xl mt-2"
                />
                <br />

                <input
                  onChange={handleChange}
                  value={banner.detail}
                  name="detail"
                  placeholder="Detail"
                  style={{ fontWeight: "600", color: "#0E1621", height: "60px" }}
                  className="input input-text border-[2px] border-[#01c0c9] hover:border-[#007cde] rounded-3xl px-5 py-2 w-full md:min-w-[450px] max-w-[20.5rem] mx-2 text-xl mt-2"
                />
                <br />

                <input
                  onChange={handleChange}
                  value={banner.time}
                  name="time"
                  placeholder="example 5000 means 5sec 6000 6s"
                  style={{ fontWeight: "600", color: "#0E1621", height: "60px" }}
                  className="input input-text border-[2px] border-[#01c0c9] hover:border-[#007cde] rounded-3xl px-5 py-2 w-full md:min-w-[450px] max-w-[20.5rem] mx-2 text-xl mt-2"
                />
                <br />

                <input
                  type="file"
                  onChange={handleImageChange}
                  className="input-file border-[2px] border-[#01c0c9] hover:border-[#007cde] rounded-3xl px-5 py-2 w-full md:min-w-[450px] max-w-[20.5rem] mx-2 text-xl mt-2"
                />
                <br />

                <button
                  type="submit"
                  className="bg-[#01c0c9] font-semibold text-white mt-5 mb-10 px-6 py-2 text-xl rounded-2xl"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBanners;
