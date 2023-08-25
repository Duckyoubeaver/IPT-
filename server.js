const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

// Generate a secure random key with 32 bytes (256 bits) only once during server startup
const secureKey = crypto.randomBytes(32).toString("hex");

const usedTokens = new Set();

// Create a transporter object using Gmail SMTP settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "wonjunoh0708@gmail.com", // Your Gmail email address
    pass: "voiawefijewqctvx", // Your Gmail password or app password (if using 2-step verification)
  },
});

app.post("/invite", (req, res) => {
  const { businessId, role, recipientEmail } = req.body; // Extract the businessId, role, and recipient's email from the request body

  try {
    // Generate the invitation token using the businessId and role
    const token = jwt.sign({ businessId, role }, secureKey, {
      expiresIn: "1 day",
    });

    // Send the invitation email
    const mailOptions = {
      from: "wonjunoh0708@gmail.com", // Your Gmail email address
      to: recipientEmail, // Email address of the recipient
      subject: "Invitation to Join", // Subject of the email
      text: `You have been invited as ${role}. Please click on the following link to accept the invitation: http://localhost:3001/join/${token}`, // Body of the email
    };

    // Log the email content
    console.log("Email content:", mailOptions.text);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email sent successfully!");
        console.log("Email sent to:", recipientEmail); // Log the recipient's email
        res.status(200).json({ message: "Email sent successfully!" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate token" });
  }
});

app.get("/join/:token", (req, res) => {
  const { token } = req.params;

  try {
    // Verify the token using the same secureKey that was used for signing
    const decoded = jwt.verify(token, secureKey);
    console.log(decoded);

    // Check if the token has already been used
    if (usedTokens.has(token)) {
      console.log("Invitation used");
      return res.status(400).send("Invitation has already been used");
    }

    // Log success message on the server
    console.log("Invitation accepted");

    // Handle the invitation process here, e.g., add user to business workspace, etc.

    // Mark the token as used by adding it to the usedTokens set
    usedTokens.add(token);

    // Send response indicating the invitation is accepted
    return res.status(200).send("Invitation accepted");
  } catch (error) {
    // Log error message on the server
    console.error("Invalid or Expired Token", error.message);
    res.status(400).send("Invalid or Expired Token");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
