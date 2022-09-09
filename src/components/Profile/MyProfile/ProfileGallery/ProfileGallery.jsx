import React from 'react';
import { Link } from 'react-router-dom';

export const images = [
  'image1',
  'image2',
  'image3',
  'image4',
  'image5',
  'image6',
  'image7',
];

const ProfileGallery = () => {
  return (
    <div className="w-full">
      <div className="mt-4 flex justify-between items-center">
        <div className="text-lg text-gray-800">
          <h4>Photos</h4>
        </div>
        <div className="text-gray-400 text-sm hover:text-gray-700">
          <Link to="/gallery">See all images</Link>
        </div>
      </div>
      <div className="flex flex-wrap w-full max-h-[190px] overflow-hidden pt-3">
        {images.map((image, index) => {
          return (
            <div key={index} className="w-20 h-20 border border-gray-300 m-1">
              {image}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileGallery;
