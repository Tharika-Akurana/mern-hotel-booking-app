import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./pages/Welcome";
import AdminSignIn from "./pages/AdminSignIn";
import CreateListings from "./pages/CreateListings";
import EditListings from "./pages/EditListings";
import Sidebar from "./components/Sidebar";
import Listings from "./pages/Listings";
import Logout from "./pages/Logout";
import EditListingDetails from "./pages/EditListingDetails";
import Resorts from "./pages/Resorts";
import GuestHouses from "./pages/GuestHouses";
import BudgetHotels from "./pages/BudgetHotels";
import BoutiqueHotels from "./pages/BoutiqueHotels";
import LuxuryHotels from "./pages/LuxuryHotels";
import BusinessHotels from "./pages/BusinessHotels";
import TransientHotels from "./pages/TransientHotels";
import Restaurants from "./pages/Restaurants";
import HotelDetails from "./pages/HotelDetails";
import BookingForm from "./pages/BookingForm";
import AdminBookingList from "./pages/AdminBookingList";
import BookingDetails from "./pages/AdminBookingDetails";
import { useSelector } from "react-redux";

export default function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Header />
      <div className="flex">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/admin-sign-in" element={<AdminSignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/resorts" element={<Resorts />} />
          <Route path="/guest-houses" element={<GuestHouses />} />
          <Route path="/budget-hotels" element={<BudgetHotels />} />
          <Route path="/boutique-hotels" element={<BoutiqueHotels />} />
          <Route path="/luxury-hotels" element={<LuxuryHotels />} />
          <Route path="/business-hotels" element={<BusinessHotels />} />
          <Route path="/transient-hotels" element={<TransientHotels />} />
          <Route path="/hotel-details/:id" element={<HotelDetails />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          {currentUser?.isAdmin === true && (
            <>
              <Route
                path="/create-listings"
                element={
                  <>
                    {" "}
                    <Sidebar /> <CreateListings />{" "}
                  </>
                }
              />

              <Route
                path="/edit-listings"
                element={
                  <>
                    {" "}
                    <Sidebar /> <EditListings />{" "}
                  </>
                }
              />
              <Route
                path="/bookings"
                element={
                  <>
                    {" "}
                    <Sidebar /> <AdminBookingList />{" "}
                  </>
                }
              />
              <Route
                path="/booking-details"
                element={
                  <>
                    {" "}
                    <Sidebar /> <BookingDetails />{" "}
                  </>
                }
              />
              <Route
                path="/listings"
                element={
                  <>
                    {" "}
                    <Sidebar /> <Listings />{" "}
                  </>
                }
              />
              <Route
                path="/logout"
                element={
                  <>
                    {" "}
                    <Sidebar /> <Logout />{" "}
                  </>
                }
              />
              <Route
                path="/edit-listing/:id"
                element={
                  <>
                    {" "}
                    <Sidebar /> <EditListingDetails />{" "}
                  </>
                }
              />
            </>
          )}
          <Route path="/booking" element={<BookingForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
