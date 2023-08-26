import "./static/voting.css";
import Navbar from "./UserNavBar";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const VotingPage = () => {
  const [schoolCaptainVote, setSchoolCaptainVote] = useState("None");
  const [viceCaptainVote, setViceCaptainVote] = useState("None");
  const [socialMediaPrefectVote, setSocialMediaPrefectVote] = useState("None");
  const [creativeArtsPrefectVote, setCreativeArtsPrefectVote] = useState("None");
  const navigate = useNavigate();

  function wait(milliseconds) {
    // To allow the user to properly view the success alert message.
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  const voteSubmit = async () => {
    // Check if any of the votes are set to 'None'
    if (
      schoolCaptainVote === 'None' ||
      viceCaptainVote === 'None' ||
      socialMediaPrefectVote === 'None' ||
      creativeArtsPrefectVote === 'None'
    ) {
      toast.error('Please vote for all positions before submitting.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      console.log(schoolCaptainVote)
      toast.success('Voting Completed! Thanks for your vote.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      await wait(5000)
      navigate("/home");
    }
  };
  

  const handleSchoolCaptainVote = (event) => {
    setSchoolCaptainVote(event.target.value);
  };

  const handleViceCaptainVote = (event) => {
    setViceCaptainVote(event.target.value);
  };

  const handleSocialMediaPrefectVote = (event) => {
    setSocialMediaPrefectVote(event.target.value);
  };

  const handleCreativeArtsPrefectVote = (event) => {
    setCreativeArtsPrefectVote(event.target.value);
  };

  return (
    <div>
      <Navbar/>
      <ToastContainer/>
      <h1>Voting Page</h1>
      <div>
        <h2>School Captain</h2>
        <select value={schoolCaptainVote} onChange={handleSchoolCaptainVote}>
        <option value="None">None</option>
          <option value="candidate1">Luca Parsanajad</option>
          <option value="candidate2">Barsam Banaiibajouri</option>
          <option value="candidate3">Dihein Kalatunga</option>
        </select>
      </div>
      <div>
        <h2>Vice Captain</h2>
        <select value={viceCaptainVote} onChange={handleViceCaptainVote}>
        <option value="None">None</option>
          <option value="candidate1">Dihein Kalatunga</option>
          <option value="candidate2">Ryan Lamb</option>
          <option value="candidate3">Ansh Rawat</option>
        </select>
      </div>
      <div>
        <h2>Social Media Prefect</h2>
        <select
          value={socialMediaPrefectVote}
          onChange={handleSocialMediaPrefectVote}
        >
          <option value="None">None</option>
          <option value="candidate1">Ansh Rawat</option>
          <option value="candidate2">Lynden Weisenhan</option>
        </select>
      </div>
      <div>
        <h2>Creative Arts Prefect</h2>
        <select
          value={creativeArtsPrefectVote}
          onChange={handleCreativeArtsPrefectVote}
        >
          <option value="None">None</option>
          <option value="candidate1">Ryan Lamb </option>
          <option value="candidate2">Lynden Weisenhan</option>
          <option value="candidate3">Luca Parsanajad</option>
        </select>

      </div>
      <button onClick={voteSubmit}className="vote-submit">Submit Vote</button>
    </div>
  );
};

export default VotingPage;
