import React from 'react';
import { Popover, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import postsService from '../../../../services/postsService';

const PostPopover = (props) => {
  const deletePost = () => {
    postsService.deletePost(props.postId).then((data) => {
      if (props.updatePosts) {
        props.updatePosts(data.data);
      }
      if (props.updateFeedPosts) {
        props.updateFeedPosts();
      }
    });
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`${open ? 'text-gray-700 w-7' : 'text-gray-400 w-7'}`}
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
            <Popover.Panel className="absolute -right-3 z-10 w-28">
              <div className="flex flex-col justify-between text-gray-700 text-center text-sm h-14 py-1 bg-white rounded-xl">
                <p
                  className="hover:text-darkGreen"
                  onClick={() => props.openUpdateForm(true)}
                >
                  Update post
                </p>
                <p className="hover:text-darkGreen" onClick={deletePost}>
                  Delete post
                </p>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default PostPopover;
