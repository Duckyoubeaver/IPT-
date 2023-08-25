import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserAuth } from "../../../context/AuthContext";
import "../static/admininvite.css";

const InviteForm = ({ onClose }) => {
  const { fetchUserInfo } = UserAuth();
  const [selectedRole, setSelectedRole] = useState("admin"); // Default role is 'admin'
  const [inviteLink, setInviteLink] = useState("");
  const [userInfo, setUserInfo] = useState(null); // State to store user information
  const [recipientEmail, setRecipientEmail] = useState(""); // State to store recipient email

  useEffect(() => {
    // Fetch user information when the component mounts
    fetchUserInfo().then((data) => {
      // data will contain user information
      setUserInfo(data);
      console.log("User Information:", data); // Log the user information to the console
    });
  }, [fetchUserInfo]);

  const generateInviteLink = async () => {
    try {
      const response = await axios.post("http://localhost:3000/invite", {
        recipientEmail,
        businessId: userInfo.businessId,
        role: selectedRole, // Pass the selected role to the backend
      });
      const { token } = response.data;
      const inviteLink = `http://localhost:3001/join/${token}`;
      setInviteLink(inviteLink);
    } catch (error) {
      console.log("Error generating invite link:", error.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await generateInviteLink();
    } catch (error) {
      console.log("Error generating invite:", error.message);
      // Handle error or display error message to the user
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="invite-form" onClick={(e) => e.stopPropagation()}>
        <h2 className="form-header">Invite Election Managers</h2>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="email">To:</label>
          <input
            type="email"
            id="email"
            placeholder="agent@gmail.com"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
          <label htmlFor="inviteAs">Invite As:</label>
          <select
            id="inviteAs"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Role/Permission Level</option>
            <option value="admin">Admin</option>
            <option value="team-member">Team Member</option>
          </select>
          <button type="submit">Send Invitation</button>
        </form>
      </div>
    </div>
  );
};

export default InviteForm;
