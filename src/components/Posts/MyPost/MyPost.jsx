import React, { useState } from 'react';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/outline';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import userService from '../../../services/userService';
import postsService from '../../../services/postsService';
import styles from './MyPost.module.scss';
import Comment from '../Comment/Comment';
import CommentInput from '../Comment/CommentInput/CommentInput';
import { useEffect } from 'react';
import { setImageModal } from '../../../redux/slices/modalsSlice';
import PostPopover from './PostPopover/PostPopover';
import UpdatePostForm from './UpdatePostForm/UpdatePostForm';

const MyPost = (props) => {
  const [postData, setPostData] = useState(props.postData);
  const { userData } = useSelector((state) => state);
  const [comments, setComments] = useState([]);
  const [openInput, setOpenInput] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const dispatch = useDispatch();

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

  const updateThisPost = (data) => setPostData(data);

  const openingUpdateForm = (data) => setOpenUpdateForm(data);

  return (
    <div className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl">
      <div className="flex items-center relative">
        <div>
          <img
            className="w-14 h-14 rounded-full"
            src={userData.avatarUrl ? userData.avatarUrl : defaultAvatar}
            alt="avatar"
          />
        </div>
        <div className="ml-4">
          <p className="text-gray-700 mb-0.5">{userData.fullName}</p>
          <p className="text-gray-400 text-sm">
            {userService.postTimestampConversion(postData.createdAt._seconds)}
          </p>
        </div>
        <div className="w-6 text-gray-400 absolute right-4 hover:scale-110 duration-200 cursor-pointer">
          {!openUpdateForm && (
            <PostPopover
              postId={postData.postId}
              updatePosts={props.updatePosts}
              openUpdateForm={openingUpdateForm}
            />
          )}
        </div>
      </div>
      <div className="my-4 text-gray-800 overflow-scroll">
        {postData.imageUrl && !openUpdateForm && (
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
        {openUpdateForm ? (
          <UpdatePostForm
            postData={postData}
            updateThisPost={updateThisPost}
            openUpdateForm={openingUpdateForm}
          />
        ) : (
          <p>{postData.message}</p>
        )}
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
          <p className="w-6 text-gray-800">{postData.likes.length}</p>
        </div>
        <div className="flex ml-2">
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

export default MyPost;
