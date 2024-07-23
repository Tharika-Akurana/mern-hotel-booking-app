import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {

    localStorage.removeItem('adminToken'); 
 
    navigate('/');
  }, [navigate]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Logging Out...</h1>
    </div>
  );
};

export default Logout;
