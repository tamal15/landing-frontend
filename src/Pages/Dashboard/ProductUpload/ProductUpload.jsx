import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";



const ProductUpload = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const [images, setImages] = useState([]);

   const image_upload_api = `https://servers.virtualshopbd.com/upload`;

  const handleImageChange = async (e) => {
  const files = Array.from(e.target.files);
  if (files.length + images.length > 5) {
    Swal.fire("You can upload a maximum of 5 images.");
    return;
  }

  try {
    for (let file of files) {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(image_upload_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedUrl = response.data.url;
      setImages((prev) => [...prev, uploadedUrl]);
    }
  } catch (error) {
    console.error("Error uploading images:", error);
    Swal.fire("Error uploading one or more images.");
  }
};


    const handleImageRemove = (index) => {
  setImages(images.filter((_, i) => i !== index));
};

    const onSubmit = (data) => {
        const productData = {
            ...data,
            buyerEmail: user.email,
            likes: [],
            images,
            facebook:"https://www.facebook.com/share/16ZWJNSrDu/"
        };

        fetch("https://servers.virtualshopbd.com/postProductdata", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.insertedId) {
                    alert("Added successfully");
                    reset();
                    setImages([]);
                }
            });
    };

    return (
        <div className="py-10 flex justify-center items-center">
            <div className=" p-10 rounded-xl shadow-lg text-center w-full max-w-2xl">
                <h2 className="mb-5 text-black text-2xl font-bold">Add Your Product</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input className="w-full text-black  p-2 rounded-lg border" {...register("title", { required: true })} placeholder="Title" />
                    <input className="w-full p-2 rounded-lg border" {...register("size", { required: true })} placeholder="Size (M/L/XL/XXL)" />
                    <input className="w-full p-2 rounded-lg border" {...register("code", { required: true })} placeholder="Product Code" />
                    <input className="w-full p-2 rounded-lg border" {...register("category", { required: true })} placeholder="Category-latest/punjabi/shirt" />
                    <input className="w-full p-2 rounded-lg border" {...register("related", { required: true })} placeholder="Related-cotton/silk" />
                    <input type="number" min="1" className="w-full p-2 rounded-lg border" {...register("ProductPrice", { required: true })} placeholder="Product Price" />
                    
                    <label className="block text-gray-700 font-medium">Upload Images (Max 5)</label>
                    <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded-lg" />
                    <div className="grid grid-cols-5 gap-2 mt-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative w-full h-24">
                                <img src={image} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                                <button onClick={() => handleImageRemove(index)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full">✖</button>
                            </div>
                        ))}
                    </div>

                    <textarea className="w-full p-2 rounded-lg border" {...register("description", { required: true })} placeholder="Description" />

                    <div className="mt-4">
    <select
      required
      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      {...register("stock")}
    >
      <option value="Stock In">Stock In</option>
      <option value="Stock Out">Stock Out</option>
    </select>
  </div>

                    <button type="submit" className="w-full bg-blue-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 hover:text-white transition">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ProductUpload;
