import React from 'react';
import styles from './MessageModal.module.scss';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessageModal } from '../../../redux/slices/modalsSlice';
import { XIcon } from '@heroicons/react/outline';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import { useForm } from 'react-hook-form';
import ApiService from '../../../services/ApiService';

const MessageModal = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { register, handleSubmit, reset } = useForm({
    mode: 'onSubmit',
  });

  const onSubmit = (data) => {
    ApiService.sendMessage(state.otherUserData.uid, data);
    dispatch(setMessageModal({ active: false }));
    reset();
  };

  return (
    <Transition appear show={state.modals.messageModal.active} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 font-sans-serif"
        onClose={() => dispatch(setMessageModal({ active: false }))}
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
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {state.otherUserData && (
                <Dialog.Panel className={styles.dialogWrapper}>
                  <div className="flex justify-between w-full p-2 text-gray-600 border-b border-gray-200">
                    <p>New message</p>
                    <XIcon
                      className="w-6 cursor-pointer hover:scale-110 duration-300"
                      onClick={() =>
                        dispatch(setMessageModal({ active: false }))
                      }
                    />
                  </div>
                  <form
                    className="w-full mt-6"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="flex">
                      <div>
                        <img
                          src={
                            state.otherUserData.avatarUrl
                              ? state.otherUserData.avatarUrl
                              : defaultAvatar
                          }
                          alt="avatar"
                          className="w-14 h-14 rounded-full "
                        />
                      </div>
                      <div className="ml-4 text-darkGreen pt-1">
                        <p>{state.otherUserData.fullName}</p>
                        <p className="text-gray-500 text-sm mt-0.5">
                          {state.otherUserData.city}
                          {state.otherUserData.city &&
                            state.otherUserData.country &&
                            ', '}
                          {state.otherUserData.country}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <textarea
                        style={{ resize: 'none' }}
                        type="text"
                        name="message"
                        id="message"
                        className={styles.messageInput}
                        {...register('message', { required: true })}
                      />
                    </div>
                    <div className="mt-4 w-full relative">
                      <button type="submit" className={styles.button}>
                        Send
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              )}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MessageModal;
