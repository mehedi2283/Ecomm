
import React from "react";
import profilePng from "../../images/Profile.png";
import { Rating } from '@mui/material';
import "./reviewCard.css"

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
   
  };

  return (
    <div className="reviewCard">
      <img src={review.image?review.image:profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options}  precision={0.5}/>
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;