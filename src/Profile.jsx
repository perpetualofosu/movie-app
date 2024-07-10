import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import "./profile.css";
import 'animate.css';
import image1 from "./yuno.jpeg";
import image2 from "./profile 3.jpeg";
import image3 from "./profile.jpeg";
import image4 from "./profile 2.jpeg";
import image5 from "./profile 4.jpeg";

const ProfilePage = () => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleToggle = (index) => setActive(index);

  const handleDoubleClick = () => {
    const selectedAvatar = users[active].image;
    localStorage.setItem('selectedAvatar', selectedAvatar);
    navigate('/home'); // Redirect to homepage on double-click
  };

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        // Fetch full name from local storage or Firestore
        const storedFullName = localStorage.getItem('fullName');
        if (storedFullName) {
          setFullName(storedFullName);
        } else {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setFullName(userDoc.data().fullName);
          }
        }
      }
    };
    fetchUser();
  }, []);

  const users = [
    { name: fullName || "User 1", image: image2 },
    { name: fullName || "User 2", image: image1 },
    { name: fullName || "User 3", image: image4 },
    { name: fullName || "User 4", image: image5 },
    { name: fullName || "User 5", image: image3 },
  ];

  return (
    <div className="image-accordion-container">
      <div className="heading animate__bounce">
        <h1>Hey {fullName}, Select your avatar</h1>
      </div>
      <div
        className="image-accordion-background"
        style={{ backgroundImage: `url(${users[active].image})` }}
      ></div>
      
      <div className="image-accordion">
        {users.map((user, index) => {
          const isActive = active === index ? "active" : "";
          return (
            <div
              key={user.image}
              className={`image-accordion-item ${isActive}`}
              onClick={() => handleToggle(index)}
              onDoubleClick={handleDoubleClick}
            >
              <img src={user.image} alt={user.name} />
              <div className="content">
                <h2>{user.name}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePage;
