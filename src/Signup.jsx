import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUpCard.css';

const SignUpCard = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    setFullNameError('');
    setEmailError('');
    setPhoneNumberError('');
    setPasswordError('');
    setGeneralError('');

    let hasError = false;

    if (!fullName) {
      setFullNameError('Full name is required.');
      hasError = true;
    }

    if (!email) {
      setEmailError('Email address is required.');
      hasError = true;
    }

    if (!phoneNumber) {
      setPhoneNumberError('Phone number is required.');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required.');
      hasError = true;
    }

    if (hasError) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        email,
        phoneNumber,
        createdAt: new Date()
      });

      // Redirect to verification page
      navigate('/verify-email'); 
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setEmailError('Email address is already in use.');
      } else {
        setGeneralError(error.message);
      }
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="container-fluid styles">
      <h1>Grab some <span className="emoji popcorn">🍿</span> and let's get <span className="emoji poppin">Poppin 😉</span></h1>
      <div className="card glass-card p-4">
        <h3 className="text-center mb-3">Sign Up</h3>
        {generalError && <div className="error-message">{generalError}</div>}
        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {fullNameError && <div className="error-message">{fullNameError}</div>}
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
            {emailError && <div className="error-message">{emailError}</div>}
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
            {phoneNumberError && <div className="error-message">{phoneNumberError}</div>}
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
            {passwordError && <div className="error-message">{passwordError}</div>}
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
