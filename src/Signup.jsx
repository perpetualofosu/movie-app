import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUpCard.css';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const SignUpCard = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: fullName,
                phoneNumber: phoneNumber
            });

            console.log('User signed up:', user);
        } catch (error) {
            console.error('Error signing up:', error);
            setError(error.message);
        }
    };

    return (
        <div className="container-fluid styles">
            <div className="card glass-card p-4">
                <h3 className="text-center mb-3">Sign Up</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSignUp}>
                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="fullName" 
                            placeholder="Enter your full name" 
                            value={fullName} 
                            onChange={(e) => setFullName(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Phone number</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="phoneNumber" 
                            placeholder="Enter your phone number" 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Enter your password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpCard;
