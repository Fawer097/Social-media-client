import { doc, onSnapshot } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../../../firebase';

const ProfileGallery = () => {
  const [images, setImages] = useState([]);
  const { uid } = useSelector((state) => state.userData);
  const navigate = useNavigate();

  useEffect(() => {
    onSnapshot(doc(db, 'Gallery', uid), (doc) => {
      if (doc.data()) {
        setImages(Object.values(doc.data()));
      }
    });
  }, []);

  if (images.length) {
    images.sort((prev, next) => next.createdAt - prev.createdAt);
  }

  return (
    <div className="w-full ">
      <div className="mt-4 flex justify-between items-center">
        <div className="text-lg text-gray-800">
          <h4>Images</h4>
        </div>
        <div className="text-gray-400 text-sm hover:text-gray-700">
          <Link to="/gallery">See all</Link>
        </div>
      </div>
      <div className="flex flex-wrap w-full max-h-[190px] overflow-hidden pt-3">
        {images.map((image) => {
          return (
            <div
              key={image.createdAt}
              className="m-1 cursor-pointer"
              onClick={() => navigate('/gallery')}
            >
              <img
                src={image.link}
                alt="User image"
                className="rounded-md w-20 h-20"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileGallery;
