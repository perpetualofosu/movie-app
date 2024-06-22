import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUpCard.css';

const SignUpCard = () => {
    return (
        <div className="card glass-card p-4">
            <h3 className="text-center mb-3">Sign Up</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="fullName" placeholder="Enter your full name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default SignUpCard;
