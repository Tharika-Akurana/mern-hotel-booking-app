import React, { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        description: '',
        hotelType: '',
        pricePerHour: '',
        pricePerNight: '',
        priceDayFunction: '',
        priceNightFunction: '',
        starRating: '',
        facilities: '',
        imageUrls: [],
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const navigate = useNavigate();
    const [files, setFiles] = useState ([]);
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    console.log(formData);

    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7){
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for (let i=0; i < files.length; i++){
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises)
                .then((urls) => {
                    setFormData({ 
                        ...formData, 
                        imageUrls: formData.imageUrls.concat(urls), 
                    });
                    setImageUploadError(false);
                    setUploading(false);
            })
            .catch((error) => {
                setImageUploadError('Image upload failed (2 MB max per image)');
                setUploading(false);
            });
        } else {
            setImageUploadError('You can only upload 6 images per listing');
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = 
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ${progress}% done');
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) => {
                        resolve(getDownloadURL);
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
            if (formData.imageUrls.length < 1) return setError('You must upload at least one image');
            setLoading(true);
            setError(false);
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false){
                setError(data.message);
            } else {
                setTimeout(()=>{
                    navigate('/edit-listings');
                }, 1000);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
      };

    return (
        <div className='container mx-auto p-6'>
            <h1 className='text-3xl font-thin underline text-black font-serif text-center mb-10'> Adding Hotel </h1>
            <form onSubmit={handleSubmit} className='space-y-6 text-base font-semibold'>
                {/* Basic Hotel Information */}
                <div>
                    <label className='block mb-2 font-sans text-justify'> Hotel Name </label>
                    <input
                        type = "text"
                        name = "name"
                        value = {formData.name}
                        onChange = {handleChange}
                        className = 'w-full p-2 border rounded'
                        placeholder = 'name'
                        required
                    />
                </div>

                <div>
                    <label className='block mb-2 font-sans text-justify'> Address </label>
                    <input
                        type = "text"
                        name = "address"
                        value = {formData.address}
                        onChange = {handleChange}
                        className='w-full p-2 border rounded'
                        placeholder = 'address'
                        required
                    />
                </div>

                <div className='flex flex-col sm:flex-row gap-x-6'>
                    <div className='flex flex-col gap-x-6 flex-1'>
                        <label className='block mb-2 font-sans text-justify'> Phone Number </label>
                        <input
                            type = "text"
                            name = "phone"
                            value = {formData.phone}
                            onChange = {handleChange}
                            className='w-full p-2 border rounded'
                            placeholder='phone'
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-x-6 flex-1'>
                        <label className='block mb-2 font-sans text-justify'> E-mail </label>
                        <input
                            type = "email"
                            name = "email"
                            value = {formData.email}
                            onChange = {handleChange}
                            className='w-full p-2 border rounded'
                            placeholder='email'
                            required
                        />
                    </div>    
                </div>

                 <div>
                    <label className='block mb-2 font-sans text-justify'> Description </label>
                    <textarea
                        name = "description"
                        value = {formData.description}
                        onChange = {handleChange}
                        className='w-full p-2 border rounded'
                        placeholder='description'
                        required
                    />
                </div> 

                {/* Hotel Types */}
                <div>
                    <label className='block mb-3 font-sans text-justify '> Types of Hotels</label>
                    <div className='flex flex-wrap gap-x-20 gap-y-2 '>
                        {["restaurant", "resort", "guestHouse", "budget", "boutique", "luxury", "business", "transient"].map((type) => (
                            <div key={type}>
                                <input
                                    type="radio"
                                    name="hotelType"
                                    value={type}
                                    checked={formData.hotelType === type}
                                    onChange={handleChange}
                                    className='mr-2'
                                    required
                                />
                                <label className='font-normal'>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pricing */}
                {formData.hotelType === "restaurant" || formData.hotelType === "transient" ? (
                    <div>
                        <label className='block mb-2 font-sans text-justify'> Price per Hour (LKR) </label>
                        <input
                            type = "number"
                            name = "pricePerHour"
                            value = {formData.pricePerHour}
                            onChange = {handleChange}
                            className='w-full p-2 border rounded'
                            placeholder='price'
                            required
                        />
                    </div>
                ) : formData.hotelType === "business" || formData.hotelType === "budget" || formData.hotelType === "guestHouse" ? (
                    <div>
                        <label className='block mb-2 font-sans text-justify'> Price per Night (LKR) </label>
                        <input
                            type = "number"
                            name = "pricePerNight"
                            value = {formData.pricePerNight}
                            onChange = {handleChange}
                            className='w-full p-2 border rounded'
                            placeholder='price'
                            required
                        />
                    </div>
                ) : formData.hotelType === "resort" || formData.hotelType === "boutique" || formData.hotelType === "luxury" ? (
                    <div>
                        <label className='block mb-2 font-sans text-justify'> Pricing Details </label>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block mb-2 font-normal'> Price per Night (LKR) </label>
                                <input
                                    type = "number"
                                    name = "pricePerNight"
                                    value = {formData.pricePerNight}
                                    onChange = {handleChange}
                                    className='w-full p-2 border rounded'
                                    placeholder='price'
                                    required
                                />
                            </div>
                            <div>
                                <label className='block mb-2 font-normal'> Price for Day Function (LKR) </label>
                                <input
                                    type = "number"
                                    name = "priceDayFunction"
                                    value = {formData.priceDayFunction}
                                    onChange = {handleChange}
                                    className='w-full p-2 border rounded'
                                    placeholder='price'
                                />
                            </div>
                            <div>
                                <label className='block mb-2 font-normal'> Price for Night Function (LKR) </label>
                                <input
                                    type = "number"
                                    name = "priceNightFunction"
                                    value = {formData.priceNightFunction}
                                    onChange = {handleChange}
                                    className='w-full p-2 border rounded'
                                    placeholder='price'
                                />
                            </div>
                        </div>
                    </div>
                ) : null}
                
                {/* Star Rating */}
                <div>
                    <label className='block mb-2 font-sans text-justify'> Star Rating </label>
                    <input
                        type = "number"
                        name = "starRating"
                        value = {formData.starRating}
                        onChange = {handleChange}
                        min = '1'
                        max = '5'
                        className='w-full p-2 border rounded'
                        placeholder='5'
                    />
                </div>

                {/* Facilities */}
                <div>
                    <label className='block mb-2 font-sans text-justify'> Facilities </label>
                    <textarea
                        name = "facilities"
                        value = {formData.facilities}
                        onChange = {handleChange}
                        className='w-full p-2 border rounded'
                        placeholder='facilities'
                        required
                    />
                </div>

                <div className='flex flex-col gap-2'> 
                    <p className='font-semibold mb-2'>
                        Images:
                        <span className='font-normal text-gray-600 ml-2'>
                            The first image will be the cover (max 6)
                        </span>
                    </p>
                    <div className='flex gap-4'>
                        <input
                            onChange={(e) => setFiles(Array.from(e.target.files))}
                            type = "file"
                            id = "images"
                            accept = "image/*"
                            multiple
                            className='p-2 border border-gray-300 rounded w-full'
                        />
                        <button 
                            type = "button" 
                            disabled = {uploading}
                            onClick={handleImageSubmit} 
                            className='p-2 text-darkGold border border-gray-300 rounded uppercase hover:shadow-lg disabled:opacity-80'>
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                    <p className='text-red-700 text-sm'> 
                        {imageUploadError && imageUploadError}
                    </p>
                    {formData.imageUrls.length > 0 && (
                        <div className='grid grid-cols-2 gap-4'>
                            {formData.imageUrls.map((url, index) => (
                                <div key={url} className='flex flex-col items-center p-3 border rounded-lg'>
                                    <img 
                                        src={url} 
                                        alt='listing image' 
                                        className='w-80 h-80 object-cover rounded-lg' 
                                    />
                                    <button
                                        type='button'
                                        onClick={() => handleRemoveImage(index)}
                                        className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
                <button 
                    disabled={loading || uploading}
                    className='px-4 py-2 bg-darkGold text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Adding...' : 'Adding Hotel'}
                </button>
                {error && <p className='text-red-700 text-sm'>{error}</p>}
            </form>
        </div>
    );
};

export default CreateListing;