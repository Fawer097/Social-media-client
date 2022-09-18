import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import EmptyMessage from '../../../components/EmptyMessage/EmptyMessage';
import { useDispatch } from 'react-redux';
import { setImageModal } from '../../../redux/slices/modalsSlice';
import { db } from '../../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import styles from './GalleryPage.module.scss';
import Loader from '../../../components/Loader/Loader';

const GalleryPage = (props) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
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
      setLoading(false);
    });
  }, []);

  if (images.length) {
    images.sort((prev, next) => next.createdAt - prev.createdAt);
  }

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className="w-full h-full flex items-center justify-center">
          <Loader size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
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
