import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase';
import {
  setFriendsCounter,
  setPostsCounter,
  setIncomingRequestsCounter,
  setImagesCounter,
} from '../../redux/slices/countersSlice';

const Counters = () => {
  const { uid } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    onSnapshot(doc(db, 'Friends', uid), async (doc) => {
      if (doc.data()) {
        dispatch(setFriendsCounter(doc.data().friends.length));
        dispatch(
          setIncomingRequestsCounter(doc.data().incomingRequests.length)
        );
      }
    });

    onSnapshot(doc(db, 'Posts', uid), async (doc) => {
      if (doc.data()) {
        dispatch(setPostsCounter(Object.keys(doc.data()).length));
        const posts = Object.values(doc.data());
        const images = posts.filter((post) => post.imageUrl);
        dispatch(setImagesCounter(images.length));
      }
    });
  }, []);

  return;
};

export default Counters;
