import React from 'react';
import styles from './MessageModal.module.scss';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessageModal } from '../../../redux/slices/modalsSlice';
import { XMarkIcon } from '@heroicons/react/24/outline';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import { useForm } from 'react-hook-form';
import messagerService from '../../../services/messagerService';
import userService from '../../../services/userService';
import { useEffect, useState, useRef } from 'react';
import { PhotoIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../firebase';
import { Spring, animated } from 'react-spring';
import SuccessAlert from '../../Alerts/SuccessAlert/SuccessAlert';

const MessageModal = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [interlocutorData, setInterlocutorData] = useState({});
  const [messageImage, setMessageImage] = useState('');
  const imageRef = state.userData
    ? ref(storage, `${state.userData.uid}/messager/${Date.now()}`)
    : null;

  const [successAlert, setSuccessAlert] = useState(false);
  const alertRef = useRef(null);

  const { register, handleSubmit, reset, setValue } = useForm({
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (state.otherUser) {
      userService
        .getOtherUserData(state.otherUser.uid)
        .then((data) => setInterlocutorData(data.data));
    }
  }, [state.modals.messageModal.active]);

  const uploadImage = (event) => {
    const image = event.target.files[0];
    const metadata = {
      contentType: image.type,
    };

    uploadBytes(imageRef, image, metadata).then(() => {
      getDownloadURL(imageRef).then((url) => {
        setMessageImage(url);
        setValue('imageUrl', url);
      });
    });
  };

  const onSubmit = (data) => {
    let { message, imageUrl } = data;
    if (message && !imageUrl.length) {
      data = { message, imageUrl: '' };
    } else if (!message && imageUrl.length) {
      data = { message: '', imageUrl };
    } else if (!message && !imageUrl.length) {
      return;
    }

    messagerService.sendMessage(state.otherUser.uid, data).then(() => {
      dispatch(setMessageModal({ active: false }));
      setMessageImage('');
      setSuccessAlert(true);
      setTimeout(() => setSuccessAlert(false), 3000);
      reset();
    });
  };

  const deleteImage = () => {
    setMessageImage('');
    setValue('imageUrl', '');
  };

  const fromAnimation = {
    transform: 'translateY(-150%)',
    position: 'fixed',
    left: '240px',
    right: '0px',
    margin: 'auto',
    zIndex: 20,
    opacity: 0,
  };

  const toAnimation = {
    transform: 'translateY(10%)',
    position: 'fixed',
    left: '240px',
    right: '0px',
    margin: 'auto',
    zIndex: 30,
    opacity: 1,
  };

  return (
    <>
      <Spring
        from={fromAnimation}
        to={toAnimation}
        config={{ duration: 300 }}
        reverse={!successAlert}
        immediate={!alertRef.current}
      >
        {(styles) => (
          <animated.div style={styles} ref={alertRef}>
            <SuccessAlert text="Message send successfully" />
          </animated.div>
        )}
      </Spring>

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
                <Dialog.Panel className={styles.dialogWrapper}>
                  <div className="flex justify-between w-full p-2 text-gray-600 border-b border-gray-200">
                    <p>New message</p>
                    <XMarkIcon
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
                            interlocutorData.avatarUrl
                              ? interlocutorData.avatarUrl
                              : defaultAvatar
                          }
                          alt="avatar"
                          className="w-14 h-14 rounded-full "
                        />
                      </div>
                      <div className="ml-4 text-darkGreen pt-1">
                        <p>{interlocutorData.fullName}</p>
                        <p className="text-gray-500 text-sm mt-0.5">
                          {interlocutorData.city}
                          {interlocutorData.city &&
                            interlocutorData.country &&
                            ', '}
                          {interlocutorData.country}
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
                        {...register('message')}
                      />
                    </div>
                    <div className="flex items-center justify-end mt-4 w-full relative">
                      {messageImage && (
                        <div className="mb-4 mr-64">
                          <XCircleIcon
                            className="w-6 mb-1 cursor-pointer hover:scale-110 duration-200 active:scale-100"
                            onClick={deleteImage}
                          />
                          <img
                            src={messageImage}
                            alt="Post image"
                            className="max-w-[200px] max-h-[100px] rounded-lg"
                          ></img>
                        </div>
                      )}
                      <div className="w-7 text-gray-600 mr-6">
                        <label htmlFor="modalMessageImage">
                          <PhotoIcon className="cursor-pointer hover:scale-105 duration-200" />
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          name="modalMessageImage"
                          id="modalMessageImage"
                          className="hidden"
                          {...register('imageUrl', { onChange: uploadImage })}
                        />
                      </div>
                      <button type="submit" className={styles.button}>
                        Send
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MessageModal;
