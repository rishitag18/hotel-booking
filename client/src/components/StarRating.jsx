import React from 'react';
import { assets } from '../assets/assets';

const StarRating = ({ rating = 4 }) => {
  return (
    <>
      {Array(5).fill('').map((_, index) => (
        <img
          key={index}
          src={rating > index ? assets.starIconFilled : assets.starIconOutlined}
          alt={rating > index ? "Filled star" : "Empty star"}
          className='w-[18px] h-[18px]'
        />
      ))}
    </>
  );
};

export default StarRating;
