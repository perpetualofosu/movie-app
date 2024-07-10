import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import './verify.css'

const VerificationPage = () => {
  const navigate = useNavigate();
  const [verificationComplete, setVerificationComplete] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          await user.reload();
          if (user.emailVerified) {
            setVerificationComplete(true);
            clearInterval(intervalId); 
          }
        } else {
          console.error('User not found.');
        }
      } catch (error) {
        console.error('Error verifying email:', error);
      }
    }, 5000); 

    return () => clearInterval(intervalId); 
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="container verify">
      {verificationComplete ? (
        <div className="verification-success">
          <h1>Email verified successfully!</h1>
          <button className="btn btn-primary verifybtn" onClick={handleLoginClick}>Login</button>
        </div>
      ) : (
        <h1>Verifying your email...</h1>
      )}
    </div>
  );
};

export default VerificationPage;
