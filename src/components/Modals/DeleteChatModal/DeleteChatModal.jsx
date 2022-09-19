import React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteChatModal } from '../../../redux/slices/modalsSlice';
import styles from './DeleteChatModal.module.scss';
import messagerService from '../../../services/messagerService';

const DeleteChatModal = () => {
  const state = useSelector((state) => state.modals.deleteChatModal);
  const dispatch = useDispatch();

  const deleteChat = () => {
    messagerService.deleteChat(state.uid);
    dispatch(setDeleteChatModal({ active: false }));
  };

  return (
    <Transition appear show={state.active} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 font-sans-serif"
        onClose={() => dispatch(setDeleteChatModal({ active: false }))}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-500"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={styles.dialogWrapper}>
                <Dialog.Title>
                  <ExclamationCircleIcon className="w-10 text-darkGreen" />
                </Dialog.Title>
                <Dialog.Title
                  as="h3"
                  className=" text-gray-600 mt-4 text-center"
                >
                  The chat will be deleted only for you. Are you sure you want
                  to delete the chat?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-center text-gray-500">
                    {state.message}
                  </p>
                </div>

                <div className="mt-5 w-52 flex justify-between">
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={deleteChat}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className={styles.returnButton}
                    onClick={() =>
                      dispatch(setDeleteChatModal({ active: false }))
                    }
                  >
                    Return
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteChatModal;
