import React from 'react';
import { images } from '../../../components/Profile/MyProfile/ProfileGallery/ProfileGallery';

const GalleryPage = () => {
  return (
    <div className="w-full h-full rounded-lg mx-4 border p-4 border-gray-300 flex flex-wrap">
      {images.map((image, index) => {
        return (
          <div key={index} className="border border-gray-300 w-56 h-56 m-2">
            {image}
          </div>
        );
      })}
    </div>
  );
};

export default GalleryPage;
