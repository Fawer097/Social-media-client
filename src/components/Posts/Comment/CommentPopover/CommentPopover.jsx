import React from 'react';
import { Popover, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import postsService from '../../../../services/postsService';
import { useSelector } from 'react-redux';

const CommentPopover = (props) => {
  const { uid } = useSelector((state) => state.userData);

  const deleteComment = () => {
    const data = {
      postId: props.postData.postId,
      senderUid: props.postData.uid,
      commentId: props.commentData.commentId,
    };
    postsService
      .deleteComment(data)
      .then((data) => props.updateComments(data.data));
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`${open ? 'text-gray-700 w-6' : 'text-gray-400 w-6'}`}
          >
            <EllipsisHorizontalIcon />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute -right-3 top-6 z-10 w-32">
              <div className="flex flex-col justify-between text-gray-700 text-center text-xs h-12 py-1 bg-white rounded-xl">
                {props.commentData.senderUid === uid && (
                  <p
                    className="hover:text-darkGreen"
                    onClick={() => props.openUpdateForm(true)}
                  >
                    Update comment
                  </p>
                )}
                <p className="hover:text-darkGreen" onClick={deleteComment}>
                  Delete comment
                </p>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default CommentPopover;
