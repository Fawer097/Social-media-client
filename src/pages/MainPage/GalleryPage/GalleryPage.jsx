import React from 'react';
import galleryService from '../../../services/galleryService';
import { useState } from 'react';
import { useEffect } from 'react';
import EmptyMessage from '../../../components/EmptyMessage/EmptyMessage';
import { useDispatch } from 'react-redux';
import { setImageModal } from '../../../redux/slices/modalsSlice';

const GalleryPage = (props) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    galleryService
      .getImageLinks(props.uid)
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
    <div className="w-full h-full rounded-lg mx-4 border p-4 border-gray-300 flex flex-wrap">
      {images.length ? (
        images.map((image) => (
          <div key={image.createdAt} className="m-2">
            <img
              src={image.link}
              alt="User image"
              className="h-64 rounded-md cursor-pointer"
              onClick={() =>
                dispatch(
                  setImageModal({
                    active: true,
                    url: image.link,
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
