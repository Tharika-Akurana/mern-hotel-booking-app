import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const navigate = useNavigate ();

  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]:e. target.value
      });

      if(e.target.id === "password") {
        setConfirmedPassword("");
      }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmedPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false); 
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }

  };

  const passwordsMatch = formData.password === confirmedPassword;
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 bg-slate-200 shadow-md rounded-3xl w-full max-w-md">

        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>

        <form  onSubmit = {handleSubmit} className='flex flex-col gap-4'>
          <input type="text" placeholder='Username' 
          className='border p-3 rounded-lg' id = 'username'onChange={handleChange}/> 

          <input type="email" placeholder='E-mail' 
          className='border p-3 rounded-lg' id = 'email' onChange={handleChange}/>

          <input type="password" placeholder='Enter Password'
          className='border p-3 rounded-lg' id = 'password'onChange={handleChange} />

          <input type="password" placeholder='Confirm Password' 
          className='border p-3 rounded-lg' id = 'confirmed-password' onChange={handleConfirmPasswordChange}/>
          {
            !passwordsMatch && confirmedPassword.length > 0 && (
              <p className="text-red-500">Passwords are not matching..Try again!</p>
            )
          }
          <button disabled={loading || !passwordsMatch} className='bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-95 ${
            !passwordsMatch ? "disabled:opacity-80 cursor-not-allowed" : ""
          }'
          >
            {loading ?  'Loading...' : 'Sign Up'}
          </button>

          <OAuth/>
        
        </form>

        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-700">
              Sign in
            </span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
}
