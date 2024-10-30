import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import AlertMessage from "../components/Notifications";

const EditListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    hotelType: "",
    pricePerPerson: "",
    pricePerNight: "",
    priceDayFunction: "",
    priceNightFunction: "",
    starRating: "",
    facilities: "",
    imageUrls: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/${id}`);
        const data = await res.json();
        setListing(data);
        setFormData(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch listing");
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleImageSubmit = async () => {
    if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: [...formData.imageUrls, ...urls],
          });
          setFiles([]);
        })
        .catch((error) => {
          setError("Image upload failed");
        });
    } else {
      setError("You can only upload up to 6 images in total");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            resolve(url);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/listing/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          navigate("/edit-listings");
        }, 2000);
        navigate("/edit-listings");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to update listing");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const res = await fetch(`/api/listing/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listing),
      });
      const data = await res.json();
      if (res.ok) {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          navigate("/edit-listings");
        }, 2000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-black text-center mb-6">
        Edit Listing
      </h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-700">{error}</p>}
      {showNotification && (
        <AlertMessage
          message="Changes were saved successfully"
          onClose={() => setShowNotification(false)}
        />
      )}
      {listing && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Hotel Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Hotel Type</label>
            <input
              type="text"
              name="hotelType"
              value={formData.hotelType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Price per Person for an Hour</label>
            <input
              type="number"
              name="pricePerPerson"
              value={formData.pricePerPerson}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Price per Night</label>
            <input
              type="number"
              name="pricePerNight"
              value={formData.pricePerNight}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Price for Day Function</label>
            <input
              type="number"
              name="priceDayFunction"
              value={formData.priceDayFunction}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Price for Night Function</label>
            <input
              type="number"
              name="priceNightFunction"
              value={formData.priceNightFunction}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Star Rating</label>
            <input
              type="number"
              name="starRating"
              value={formData.starRating}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Facilities</label>
            <input
              type="text"
              name="facilities"
              value={formData.facilities}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Image Upload */}
          <div className="mt-4">
            <label className="block mb-2">Images</label>
            <input
              type="file"
              onChange={handleImageChange}
              multiple
              className="mb-2"
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="px-4 py-2 bg-darkGold text-white rounded-lg"
            >
              Upload Images
            </button>
            {files.length > 0 && (
              <p className="text-blue-700">{files.length} images selected</p>
            )}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {formData.imageUrls.map((url, index) => (
                <div key={url} className="relative">
                  <img
                    src={url}
                    alt="listing"
                    className="w-80 h-80 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSaveChanges}
            disabled={loading}
            className="px-4 py-2 bg-darkGold text-white rounded-lg"
          >
            Save Changes
          </button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default EditListingDetails;
