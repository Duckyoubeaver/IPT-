import React, { useState } from "react";
import "./static/adminteams.css";
import { BsCaretRightFill } from "react-icons/bs";
import InviteForm from "./AdminInvite/AdminInvite";

const AdminTeamsComponent = () => {
  // State for handling group chats and direct messages
  const [groupChats, setGroupChats] = useState([
    { id: 1, name: "Group 1" },
    { id: 2, name: "Group 2" },
    { id: 3, name: "Group 3" },
    // Add more groups here...
  ]);

  const [directMessages, setDirectMessages] = useState([
    { id: 1, sender: "User 1", content: "Hello" },
    { id: 2, sender: "User 2", content: "Hi there" },
    { id: 3, sender: "User 3", content: "Hey" },
    // Add more direct messages here...
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showGroups, setShowGroups] = useState(true);
  const [showDirectMessages, setShowDirectMessages] = useState(true);
  const [showInviteForm, setShowInviteForm] = useState(false);

  // Function to handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Toggle display of groups
  const toggleGroups = () => {
    setShowGroups(!showGroups);
  };

  // Toggle display of direct messages
  const toggleDirectMessages = () => {
    setShowDirectMessages(!showDirectMessages);
  };

  // Function to handle opening the invite form
  const openInviteForm = () => {
    setShowInviteForm(true);
  };

  // Function to handle closing the invite form
  const closeInviteForm = () => {
    setShowInviteForm(false);
  };

  // Filter the groups based on the search term
  const filteredGroups = groupChats.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter the direct messages based on the search term
  const filteredDirectMessages = directMessages.filter((message) =>
    message.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`admin-teams-container ${showInviteForm ? "blur" : ""}`}>
      {/* Channel Bar */}
      <div className="channel-bar">
        {/* Search Bar */}
        <button className="invite-agent" onClick={openInviteForm}>
          INVITE AGENT
        </button>

        <div className="channel-header" onClick={toggleGroups}>
          <BsCaretRightFill
            className={`caret-icon ${showGroups ? "down" : "right"}`}
          />
          <span>GROUPS</span>
        </div>

        {/* Render filtered groups */}
        {showGroups && (
          <div
            className={`groups-list ${showInviteForm ? "disable-click" : ""}`}
          >
            {filteredGroups.map((group) => (
              <button className="group-item" key={group.id}>
                {group.name}
              </button>
            ))}
          </div>
        )}

        <div className="channel-header" onClick={toggleDirectMessages}>
          <BsCaretRightFill
            className={`caret-icon ${showDirectMessages ? "down" : "right"}`}
          />
          <span>DIRECT MESSAGES</span>
        </div>

        {/* Render filtered direct messages */}
        {showDirectMessages && (
          <div
            className={`direct-messages-list ${
              showInviteForm ? "disable-click" : ""
            }`}
          >
            {filteredDirectMessages.map((message) => (
              <button className="direct-message" key={message.id}>
                {message.sender}: {message.content}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Groups Section */}
        <div className="section">{/* ... Rest of your component ... */}</div>

        {/* Direct Messages Section */}
        <div className="section">{/* ... Rest of your component ... */}</div>
      </div>

      {/* Invite Form */}
      {showInviteForm && <InviteForm onClose={closeInviteForm} />}
    </div>
  );
};

export default AdminTeamsComponent;
