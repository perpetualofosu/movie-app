import React, { useState } from "react";
import "./Login.css";
import image1 from "./yuno.jpeg";
import image2 from "./profile 3.jpeg";
import image3 from "./profile.jpeg";
import image4 from "./profile 2.jpeg";
import image5 from "./profile 4.jpeg";

const items = [
  { header: "Judith", image: image2 },
  { header: "Prince", image: image1 },
  { header: "Jude", image: image4 },
  { header: "Perp", image: image5 },
  { header: "Christy", image: image3 },
];

const LoginPage = () => {
  const [active, setActive] = useState(0);
  const [otpVisible, setOtpVisible] = useState(false);

  const handleToggle = (index) => setActive(index);

  const handleDoubleClick = () => setOtpVisible(true);

  const handleOtpSubmit = (event) => {
    event.preventDefault();
    const otp = event.target.elements.otp.value;
    console.log("OTP Submitted:", otp);
    // Handle OTP submission logic here
  };

  return (
    <div className="image-accordion-container">
      <div className="heading"><h1>Who's watching?</h1></div>
      <div
        className="image-accordion-background"
        style={{ backgroundImage: `url(${items[active].image})` }}
      ></div>
      
      <div className="image-accordion">
        {items.map((item, index) => {
          const isActive = active === index ? "active" : "";
          return (
            <div
              key={item.image}
              className={`image-accordion-item ${isActive}`}
              onClick={() => handleToggle(index)}
              onDoubleClick={handleDoubleClick}
            >
              <img src={item.image} alt={item.header} />
              <div className="content">
                <h2>{item.header}</h2>
              </div>
            </div>
          );
        })}
      </div>
      {otpVisible && (
        <div className="otp-container">
          <form onSubmit={handleOtpSubmit}>
            <label htmlFor="otp">Enter OTP:</label>
            <input type="text" id="otp" name="otp" required />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
