import { Button } from "@mui/material";
import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:sellphone.com">
        <Button color="secondary">Contact: sellphone.com</Button>
      </a>
    </div>
  );
};

export default Contact;