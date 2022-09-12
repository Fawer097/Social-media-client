import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import userService from '../../../services/userService';
import CommentPopover from './CommentPopover/CommentPopover';
import UpdateCommentForm from './UpdateCommentForm/UpdateCommentForm';

const Comment = (props) => {
  const { postData, updateComments } = props;
  const [commentData, setCommentData] = useState(props.commentData);
  const { userData } = useSelector((state) => state);
  const [ownerData, setOwnerData] = useState({});
  const [loading, setLoading] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    setOwnerData(userData);
    if (commentData.senderUid !== userData.uid) {
      userService
        .getOtherUserData(commentData.senderUid)
        .then((data) => setOwnerData(data.data))
        .finally(() => setLoading(false));
    }
    setLoading(false);
  }, []);

  const openingUpdateForm = (data) => setOpenUpdateForm(data);

  const updateThisComment = (data) => setCommentData(data);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full flex items-center relative px-4 py-4 border-t border-gray-300">
      <div>
        <img
          src={ownerData.avatarUrl ? ownerData.avatarUrl : defaultAvatar}
          alt="avatar"
          className="w-11 h-11 rounded-full"
        />
      </div>
      <div className="text-sm ml-3 overflow-scroll">
        <p className="text-gray-600">{ownerData.fullName}</p>
        {openUpdateForm ? (
          <UpdateCommentForm
            commentData={commentData}
            postData={postData}
            openUpdateForm={openingUpdateForm}
            updateThisComment={updateThisComment}
          />
        ) : (
          <p className="pt-0.5 pb-1 text-gray-800">{commentData.message}</p>
        )}
        <p className="text-xs text-gray-400">
          {userService.postTimestampConversion(commentData.createdAt)}
        </p>
      </div>
      <div className="absolute top-2 right-8 hover:scale-110 duration-200 cursor-pointer">
        {postData.uid === userData.uid || commentData.senderUid === userData.uid
          ? !openUpdateForm && (
              <CommentPopover
                commentData={commentData}
                postData={postData}
                updateComments={updateComments}
                openUpdateForm={openingUpdateForm}
              />
            )
          : null}
      </div>
    </div>
  );
};

export default Comment;
