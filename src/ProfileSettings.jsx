import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./ProfileSettings.css";
import { auth, db, storage } from './firebase';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useLanguage } from './LanguageContext.jsx';

const ProfileSettings = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null); // Add state for error handling
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setEmail(user.email);
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setFullName(data.fullName || '');
            setPhoneNumber(data.phoneNumber || '');
            changeLanguage(data.language || ''); 
            setAvatar(data.avatar || '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Error fetching user data.');
        }
      }
    };

    fetchUserData();
  }, [changeLanguage]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (user) {
      try {
        if (fullName) {
          await updateProfile(user, { displayName: fullName });
          await updateDoc(doc(db, 'users', user.uid), { fullName });
        }
        if (email) {
          await updateEmail(user, email);
        }
        if (password) {
          await updatePassword(user, password);
        }
        if (phoneNumber) {
          await updateDoc(doc(db, 'users', user.uid), { phoneNumber });
        }
        if (language) {
          await updateDoc(doc(db, 'users', user.uid), { language });
          changeLanguage(language);
        }

        navigate('/profile');
      } catch (error) {
        console.error('Error updating profile:', error);
        setError('Error updating profile.');
      }
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10 MB limit
        console.error('File is too large, please select a file smaller than 10MB');
        return;
      }

      const storageRef = ref(storage, `avatars/${auth.currentUser.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      setUploading(true);
      let retryCount = 0;
      const maxRetries = 3;

      const handleUpload = () => {
        uploadTask.on(
          'state_changed',
          () => {},
          (error) => {
            if (retryCount < maxRetries) {
              retryCount++;
              console.log(`Retrying upload... (${retryCount}/${maxRetries})`);
              handleUpload();
            } else {
              console.error('Error uploading avatar after retries:', error);
              setUploading(false);
              setError('Error uploading avatar.');
            }
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setAvatar(downloadURL);
              await updateProfile(auth.currentUser, { photoURL: downloadURL });
              await updateDoc(doc(db, 'users', auth.currentUser.uid), { avatar: downloadURL });
              setUploading(false);
            } catch (error) {
              console.error('Error updating avatar:', error);
              setUploading(false);
              setError('Error updating avatar.');
            }
          }
        );
      };

      handleUpload();
    }
  };

  return (
    <div className="container profile-settings">
      <h2>Profile Settings</h2>
      <div className="avatar-card">
        {avatar && (
          <div className="avatar-wrapper">
            <img src={avatar} alt="Avatar" className="profile-avatar" />
          </div>
        )}
      </div>
      {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
      <form onSubmit={handleProfileUpdate}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Language</label>
          <select
            className="form-control"
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Avatar</label>
          <input
            type="file"
            className="form-control"
            onChange={handleAvatarChange}
          />
          {uploading && <p>Uploading...</p>}
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
