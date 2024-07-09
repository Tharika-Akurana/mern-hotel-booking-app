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
import AdminSignUp from "./pages/AdminSignUp";

export default function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>

    <Route path="/" element={<Welcome/>} />
    <Route path="/admin-sign-in" element={<AdminSignIn/>} />
    <Route path="/admin-sign-up" element={<AdminSignUp/>} />
    <Route path="/home" element={<Home/>} />
    <Route path="/sign-in" element={<SignIn/>} />
    <Route path="/sign-up" element={<SignUp/>} />
    <Route path="/about" element={<About/>} />
    <Route element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />} />
    </Route>
    <Route path='/create-listings' element={<CreateListings />} />
    
  </Routes>
  </BrowserRouter>
}
