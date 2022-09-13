import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import EmptyMessage from '../../../components/EmptyMessage/EmptyMessage';
import { useDispatch } from 'react-redux';
import { setImageModal } from '../../../redux/slices/modalsSlice';
import { db } from '../../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const GalleryPage = (props) => {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    onSnapshot(doc(db, 'Posts', props.uid), (doc) => {
      if (doc.data()) {
        const posts = Object.values(doc.data());
        const images = posts.map((post) => {
          return {
            url: post.imageUrl,
            createdAt: post.createdAt,
          };
        });
        setImages(images);
      }
    });
  }, []);

  if (images.length) {
    images.sort((prev, next) => next.createdAt - prev.createdAt);
  }

  return (
    <div className="w-full h-full rounded-lg mx-4 border p-4 border-gray-300 flex flex-wrap">
      {images.length && images[0].url ? (
        images.map((image) => (
          <div key={image.createdAt} className="m-2">
            <img
              src={image.url}
              alt="User image"
              className="h-64 rounded-md cursor-pointer"
              onClick={() =>
                dispatch(
                  setImageModal({
                    active: true,
                    url: image.url,
                  })
                )
              }
            />
          </div>
        ))
      ) : (
        <EmptyMessage message="No photo here yet." />
      )}
    </div>
  );
};

export default GalleryPage;
