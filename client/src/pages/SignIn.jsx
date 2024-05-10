import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error} = useSelector((state) => state.user);
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const navigate = useNavigate ();
  const dispatch = useDispatch();

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
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',
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
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }

  };

  const passwordsMatch = formData.password === confirmedPassword;
  
  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

      <form  onSubmit = {handleSubmit} className='flex flex-col gap-4'>
 
        <input 
          type="email" 
          placeholder='E-mail' 
          className='border p-3 rounded-lg'
          id = 'email' 
          onChange={handleChange}/>

        <input 
          type="password"
          placeholder='Enter Password'
          className='border p-3 rounded-lg' 
          id = 'password'onChange={handleChange} />

        <input 
          type="password" 
          placeholder='Confirm Password' 
          className='border p-3 rounded-lg'
          id = 'confirmed-password' 
          onChange={handleConfirmPasswordChange}/>

        {
          !passwordsMatch && confirmedPassword.length > 0 && (
            <p className="text-red-500">Passwords are not matching..Try again!</p>
          )
        }

        <button disabled={loading || !passwordsMatch} className='bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-95 ${
          !passwordsMatch ? "disabled:opacity-80 cursor-not-allowed" : ""
        }'
        >
          {loading ?  'Loading...' : 'Sign In'}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p> Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}
