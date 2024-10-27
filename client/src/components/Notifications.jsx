import React, { useEffect } from "react";

const AlertMessage = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="fixed top-4 right-4 h-20 w-72 bg-green-500 text-white p-4 rounded-sm shadow-lg flex items-center">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 bg-transparent border-none text-white focus:outline-none"
      >
        &#10005;
      </button>
    </div>
  );
};
export default AlertMessage;
