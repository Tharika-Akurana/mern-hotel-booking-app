import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import googleMap from "../assets/Images/Google_Map.jpg";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/user/userSlice";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const res = await fetch(`/api/listing/${id}`);
        const data = await res.json();
        setHotel(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleBookNow = () => {
    if (isLoggedIn != null) {
      navigate(`/booking`, { state: { hotel } });
    } else {
      navigate(`/sign-in`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-thin underline text-black font-serif text-center mb-10">
        {hotel.name}
      </h1>
      {/*Image Slider*/}
      <div className="text-justify px-10 lg:px-20">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          speed={1000}
          className="mb-6"
          style={{ width: "100%", height: "550px" }}
        >
          {hotel.imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <img
                src={url}
                alt={`Hotel ${index + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Hotel Details */}
      <div className="flex flex-col lg:flex-row mt-10 text-justify px-10 lg:px-20 space-y-10 lg:space-y-0 lg:space-x-10">
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-sans font-bold tracking-widest uppercase text-center">
            Hotel Details
          </h2>
          <p className="py-6">{hotel.description}</p>
          <p className="text-yellow-500 text-2xl text-justify py-2">
            {"★".repeat(hotel.starRating)}
          </p>
          <div>
            <h3 className="text-lg font-semibold text-start py-6">
              Facilities
            </h3>
            <div className="flex text-justify">
              <div className="grid grid-cols-2 gap-2 w-3/4 ">
                {hotel.facilities.split(",").map((facility, index) => (
                  <span key={index} className="text-sm">
                    {facility}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col justify-center space-y-6">
          {/* Pricing Information */}
          <div className="py-4 text-center font-serif text-red-700 px-24 text-xl">
            {hotel.hotelType === "restaurant" && (
              <div className="py-2">
                Price per Person for an Hour:{" "}
                <div className="text-3xl">${hotel.pricePerPerson}</div>
              </div>
            )}
            {(hotel.hotelType === "business" ||
              hotel.hotelType === "guestHouse" ||
              hotel.hotelType === "budget" ||
              hotel.hotelType === "transient") && (
              <div className="py-2">
                {" "}
                Price per Night:{" "}
                <div className="text-3xl">${hotel.pricePerNight}</div>
              </div>
            )}
            {(hotel.hotelType === "resort" ||
              hotel.hotelType === "boutique" ||
              hotel.hotelType === "luxury") && (
              <div>
                <div className="py-2">
                  Price per Night:{" "}
                  <div className="text-3xl">${hotel.pricePerNight}</div>
                </div>
                {hotel.priceDayFunction && (
                  <div className="py-2">
                    Price for Day Function:
                    <div className="text-3xl"> ${hotel.priceDayFunction}</div>
                  </div>
                )}
                {hotel.priceNightFunction && (
                  <div className="py-2">
                    Price for Night Function:
                    <div className="text-3xl"> ${hotel.priceNightFunction}</div>
                  </div>
                )}
              </div>
            )}
          </div>
          <p className="text-center font-serif text-red-500 px-24 text-sm">
            **Additional charges will be added acording to the choice
          </p>
          <div className="font-semibold  lg:px-20 py-4 text-center">
            <div className=" font-bold text-center py-3">
              Address: <br />
            </div>
            {hotel.address.split(",").map((line, index) => (
              <span key={index}>
                {line} <br />
              </span>
            ))}
          </div>
          <div className="flex justify-center">
            <img
              src={googleMap}
              alt="Google Map"
              style={{ width: "300px", height: "200px", objectFit: "cover" }}
              className="rounded-3xl cursor-pointer"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    hotel.address
                  )}`,
                  "_blank"
                )
              }
            />
          </div>
          <p className="mb-2 text-center">
            <strong>Contact:</strong>{" "}
            <a href={`tel:${hotel.phone}`} className="text-blue-600 underline">
              {hotel.phone}
            </a>
          </p>
          <p className="mb-4 text-center">
            <strong>Email:</strong>{" "}
            <a
              href={`mailto:${hotel.email}`}
              className="text-blue-600 underline"
            >
              {hotel.email}
            </a>
          </p>
        </div>
      </div>

      <div className="mt-6 px-20 py-6">
        <button
          onClick={handleBookNow}
          className="px-4 py-2 bg-darkGold text-white font-semibold text-lg rounded-lg hover:opacity-90 justify-center"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HotelDetails;
