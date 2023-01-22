import React from "react";
import "./aboutSection.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from '@mui/icons-material/Facebook';
import { Avatar, Button, Typography } from "@mui/material";
import logo from "../../../images/logo.png"
const About = () => {
  const visitInstagram = () => {
    window.location = "https://facebook.com";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={logo}
              alt="Founder"
              
            />
            <Typography>SellPhone</Typography>
            <Button onClick={visitInstagram} color="secondary">
              Visit Facebook
            </Button>
            <span>
              This is a cellphone resale online store
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://facebook.com" target="blank">
              <FacebookIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;