import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { db } from '../../../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const ProfileGallery = () => {
  const { uid } = useSelector((state) => state.otherUser);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    onSnapshot(doc(db, 'Posts', uid), (doc) => {
      if (doc.data()) {
        const posts = Object.values(doc.data());
        const images = posts
          .filter((post) => post.imageUrl)
          .map((post) => ({
            url: post.imageUrl,
            createdAt: post.createdAt,
          }));
        setImages(images);
      }
    });
  }, []);

  if (images.length) {
    images.sort((prev, next) => next.createdAt - prev.createdAt);
  }

  if (!images.length || !images[0].url) {
    return;
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
        {images.map((image) => (
          <div
            key={image.createdAt}
            className="w-20 h-20 m-1 cursor-pointer"
            onClick={() => navigate(`/gallery${uid}`)}
          >
            <img
              src={image.url}
              alt="User image"
              className="rounded-md w-20 h-20"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileGallery;
