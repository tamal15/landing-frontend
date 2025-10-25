import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";

const image_hosting_key = "87e8c93db3b7d5540df8a8f00585cbe9";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UploadLatest = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const [images, setImages] = useState([]);

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files).slice(0, 5 - images.length);
        const uploadedImages = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await axios.post(image_hosting_api, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                uploadedImages.push(response.data.data.url);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }

        setImages([...images, ...uploadedImages]);
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
        };

        fetch("http://localhost:5000/postlatest", {
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
            <div className="bg-red-800 p-10 rounded-xl shadow-lg text-center w-full max-w-2xl">
                <h2 className="mb-5 text-white text-2xl font-bold">Add latest Product</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input className="w-full p-2 rounded-lg border" {...register("title", { required: true })} placeholder="Title" />
                    <input className="w-full p-2 rounded-lg border" {...register("size", { required: true })} placeholder="Size (M/L/XL/XXL)" />
                    <input className="w-full p-2 rounded-lg border" {...register("code", { required: true })} placeholder="Product Code" />
                    <input className="w-full p-2 rounded-lg border" {...register("category", { required: true })} placeholder="Category" />
                    <input className="w-full p-2 rounded-lg border" {...register("related", { required: true })} placeholder="Related Products" />
                    <input type="number" min="1" className="w-full p-2 rounded-lg border" {...register("ProductPrice", { required: true })} placeholder="Product Price" />
                    
                    <label className="block text-gray-700 font-medium">Upload Images (Max 5)</label>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded-lg" />
                    <div className="grid grid-cols-5 gap-2 mt-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative w-full h-24">
                                <img src={image} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                                <button onClick={() => handleImageRemove(index)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full">✖</button>
                            </div>
                        ))}
                    </div>

                    <textarea className="w-full p-2 rounded-lg border" {...register("description", { required: true })} placeholder="Description" />

                    <button type="submit" className="w-full bg-white text-red-800 font-bold py-2 px-4 rounded-lg hover:bg-red-700 hover:text-white transition">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UploadLatest;
