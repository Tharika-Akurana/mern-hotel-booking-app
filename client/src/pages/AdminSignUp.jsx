import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../redux/user/userSlice';

export default function AdminSignUp() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        // Dispatch the signUpStart action
        dispatch(signUpStart({ email, password, userType: 'admin' }));
        // Redirect to AdminSignIn after successful signup
        window.location.href = '/admin-sign-in';
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Admin Sign Up</h2>
            <form className="flex flex-col space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded-lg p-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded-lg p-2"
                />
                <button
                    type="button"
                    onClick={handleSignUp}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
