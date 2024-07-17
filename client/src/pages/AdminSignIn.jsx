import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/admin-signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/create-listings');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-ivory border">
      <div className="p-16 bg-cream shadow-2xl rounded-3xl w-full h-auto max-w-md border">
        <h1 className='text-3xl text-center font-semibold my-12 '>Admin Sign In</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <input type="email" placeholder='E-mail' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
          <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
          <button disabled={loading} className='bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-90'>
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
}
