import React from 'react';
import { ChatBubbleOvalLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import userService from '../../../services/userService';
import styles from './OtherUserPost.module.scss';
import postsService from '../../../services/postsService';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import Comment from '../Comment/Comment';
import CommentInput from '../Comment/CommentInput/CommentInput';
import { setImageModal } from '../../../redux/slices/modalsSlice';
import { useNavigate } from 'react-router-dom';
import { setOtherUser } from '../../../redux/slices/otherUserSlice';

const OtherUserPost = (props) => {
  const [postData, setPostData] = useState(props.postData);
  const { userData } = useSelector((state) => state);
  const [comments, setComments] = useState([]);
  const [openInput, setOpenInput] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    postsService
      .getComments(postData.uid, postData.postId)
      .then((data) => setComments(data.data));
  }, []);

  const updateComments = (data) => setComments(data);

  const setLike = () => {
    if (!postData.likes.includes(userData.uid)) {
      postsService
        .likePost(postData.postId, postData.uid)
        .then((data) => setPostData(data.data));
      return;
    }

    postsService
      .deleteLikePost(postData.postId, postData.uid)
      .then((data) => setPostData(data.data));
  };

  const openUserProfile = () => {
    dispatch(setOtherUser(postData.uid));
    setTimeout(() => navigate(`/profile${postData.uid}`), 0);
  };

  return (
    <div className="w-full mb-4 px-4 py-2 border-2 border-gray-100 shadow-custom rounded-xl">
      <div className="flex items-center relative">
        <div>
          <img
            className="w-12 h-12 rounded-full cursor-pointer"
            src={
              props.userData.avatarUrl
                ? props.userData.avatarUrl
                : defaultAvatar
            }
            alt="avatar"
            onClick={openUserProfile}
          />
        </div>
        <div className="ml-4">
          <p
            className="text-gray-700 cursor-pointer hover:text-black"
            onClick={openUserProfile}
          >
            {props.userData.fullName}
          </p>
          <p className="text-gray-400 text-sm">
            {userService.postTimestampConversion(
              props.postData.createdAt._seconds
            )}
          </p>
        </div>
      </div>
      <div className="my-4">
        {postData.imageUrl && (
          <img
            src={postData.imageUrl}
            alt="Post image"
            className="max-h-[400px] rounded-lg mb-3 cursor-pointer"
            onClick={() =>
              dispatch(
                setImageModal({
                  active: true,
                  url: postData.imageUrl,
                })
              )
            }
          />
        )}
        {props.postData.message}
      </div>
      <div className="flex">
        <div className="flex">
          {postData.likes.includes(userData.uid) ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={styles.isLiked}
              onClick={setLike}
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          ) : (
            <HeartIcon className={styles.like} onClick={setLike} />
          )}
          <p className="w-6 ml-1 text-gray-800">{postData.likes.length}</p>
        </div>
        <div className="flex">
          <ChatBubbleOvalLeftIcon
            className="w-6 text-gray-400 cursor-pointer"
            onClick={() => setOpenInput(true)}
          />
          <p className="ml-1 w-6 text-gray-800">{comments.length}</p>
        </div>
      </div>
      <div className="w-full mt-4">
        {comments.map((comment, index) => (
          <Comment
            key={index}
            commentData={comment}
            postData={props.postData}
            updateComments={updateComments}
          />
        ))}
      </div>
      {openInput || comments.length ? (
        <CommentInput postData={postData} updateComments={updateComments} />
      ) : null}
    </div>
  );
};

export default OtherUserPost;
