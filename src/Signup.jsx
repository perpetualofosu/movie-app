import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUpCard.css';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SignUpCard = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!subscriptionPlan) {
      setError('Please select a subscription plan.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        email,
        phoneNumber,
        subscriptionPlan,
        createdAt: new Date()
      });

      handlePaystackPayment(user.uid);

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

  const handlePaystackPayment = (userId) => {
    const handler = PaystackPop.setup({
      key: 'pk_test_966b4c5fff18686ed5a93938cc228507e0bc9817', 
      email,
      amount: getAmountForPlan(subscriptionPlan), 
      currency: 'GH', 
      callback: async (response) => {
        
        await setDoc(doc(db, 'payments', response.reference), {
          userId,
          reference: response.reference,
          status: 'success',
          plan: subscriptionPlan,
          createdAt: new Date()
        });

        alert('Payment successful! Subscription activated.');
      },
      onClose: () => {
        alert('Payment was not completed.');
      }
    });

    handler.openIframe();
  };

  const getAmountForPlan = (plan) => {
    
    const planAmounts = {
      basic: 500, 
      standard: 1000, 
      premium: 2000 
    };

    return planAmounts[plan];
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
            <label htmlFor="subscriptionPlan" className="form-label">Subscription Plan</label>
            <select
              className="form-control"
              id="subscriptionPlan"
              value={subscriptionPlan}
              onChange={(e) => setSubscriptionPlan(e.target.value)}
            >
              <option value="">Select a plan</option>
              <option value="basic">Basic - 500 GH</option>
              <option value="standard">Standard - 1000 GH</option>
              <option value="premium">Premium - 2000 GH</option>
            </select>
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
