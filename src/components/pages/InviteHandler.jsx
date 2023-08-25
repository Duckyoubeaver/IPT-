import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const InvitationHandler = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isInvalidInvitation, setIsInvalidInvitation] = useState(false); // State variable to track invalid invitation

  useEffect(() => {
    console.log("InvitationHandler component is mounted!");

    const handleInvitation = async () => {
      try {
        await axios.get(`http://localhost:3000/join/${token}`);
        console.log("Invitation accepted");
        navigate(`/register/${token}`);
      } catch (error) {
        console.log(error.message);
        setIsInvalidInvitation(true); // Set state to indicate invalid invitation
      }
    };

    handleInvitation();
  }, [token]);

  return (
    <div>
      {isInvalidInvitation ? ( // Conditionally render based on invalid invitation state
        <h2>Invalid Invitation Link</h2>
      ) : (
        <h2>Processing Invitation...</h2>
      )}
      {/* You can show a loading spinner or other UI elements here */}
    </div>
  );
};

export default InvitationHandler;
