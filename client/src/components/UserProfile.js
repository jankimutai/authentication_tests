import React from 'react';
import { useAuth } from '../components/AuthContext';
import '../Styles/userprofile.css'

function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="user-profile-card">
      {user ? (
        <div className="profile-details">
          <p>Email: {user.email}</p>
          <p>Created At: {new Date(user.created_at).toLocaleString()}</p>
          <p>Updated At: {new Date(user.updated_at).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}

export default UserProfile;
