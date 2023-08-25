import React, { useState } from "react";
import { BiCog, BiBell } from "react-icons/bi"; // Bootstrap Icons
import AdminTeamsComponent from "./AdminTeams";
import "./static/adminnavbar.css";
import AdminHome from "./static/AdminHome";
import AdminResults from "./AdminResults";

const AdminNavBar = () => {
  const [activeTab, setActiveTab] = useState("AdminHome");

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="admin-navbar-container">
      <div className="admin-navbar">
        <div className="admin-brand">SRC ELECTIONS</div>
        <div className="admin-navigation">
          <button
            className={`admin-nav-button ${
              activeTab === "AdminHome" ? "active" : ""
            }`}
            onClick={() => handleClick("AdminHome")}
          >
            Home
          </button>
          <button
            className={`admin-nav-button ${
              activeTab === "AdminResults" ? "active" : ""
            }`}
            onClick={() => handleClick("AdminResults")}
          >
            Results
          </button>
          <button
            className={`admin-nav-button ${
              activeTab === "AdminTeams" ? "active" : ""
            }`}
            onClick={() => handleClick("AdminTeams")}
          >
            Teams
          </button>
        </div>
        <div className="admin-icons">
          {/* <div className="admin-icon">
            <BiCog />
          </div> */}

          <button
            className={`admin-icon ${
              activeTab === "AdminSettings" ? "active" : ""
            }`}
            onClick={() => handleClick("AdminSettings")}
          >
            <BiCog />
          </button>
          <div className="admin-icon">
            <BiBell />
          </div>
        </div>

        <div className="admin-status">
          <button className="admin-status-button">ONLINE</button>
        </div>
      </div>

      <div className="admin-navbar-divider"></div>
      <div className="admin-views-container">
        {/* Views */}
        {activeTab === "AdminHome" && <AdminHome />}
        {/* {activeTab === "AdminHome" && <AdminHome />}
        {activeTab === "AdminInbox" && <AdminInbox />} */}
        {activeTab === "AdminResults" && <AdminResults />}
        {activeTab === "AdminTeams" && <AdminTeamsComponent />}
        {/* {activeTab === "AdminArchives" && <AdminArchives />}
        {activeTab === "AdminInsights" && <AdminInsights />}
        {activeTab === "AdminPortal" && <AdminPortal />}
        {activeTab === "AdminSettings" && <AdminSettings />} */}
      </div>
    </div>
  );
};

export default AdminNavBar;
