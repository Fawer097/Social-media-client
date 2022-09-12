import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import galleryService from '../../../../services/galleryService';
import { useSelector } from 'react-redux';

const ProfileGallery = () => {
  const { uid } = useSelector((state) => state.otherUser);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    galleryService
      .getImageLinks(uid)
      .then((data) => setImages(data.data))
      .finally(() => setLoading(false));
  }, []);

  if (images.length) {
    images.sort((prev, next) => next.createdAt - prev.createdAt);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full">
      <div className="mt-4 flex justify-between items-center">
        <div className="text-lg text-gray-800">
          <h4>Images</h4>
        </div>
        <div className="text-gray-400 text-sm hover:text-gray-700">
          <Link to={`/gallery${uid}`}>See all</Link>
        </div>
      </div>
      <div className="flex flex-wrap w-full max-h-[190px] overflow-hidden pt-3">
        {images.map((image) => {
          return (
            <div
              key={image.createdAt}
              className="w-20 h-20 m-1 cursor-pointer"
              onClick={() => navigate(`/gallery${uid}`)}
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
