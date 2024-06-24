import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUpCard.css';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { sendEmailVerification } from 'firebase/auth'; 
import { auth, db } from './firebase'; 
import { useNavigate } from 'react-router-dom'; 

const SignUpCard = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 
    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            
            await sendEmailVerification(auth.currentUser); 
            
            await setDoc(doc(db, 'users', user.uid), {
                fullName,
                email,
                createdAt: new Date()
            });

            console.log('User signed up and data saved:', user);
            alert('Sign up successful! Verification email sent.');
            navigate('/'); 
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('Email address is already in use.');
            } else {
                setError(error.message);
            }
            console.error('Error signing up:', error);
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
                            required
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
                            required
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
                            required
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
