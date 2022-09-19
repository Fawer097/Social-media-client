import React from 'react';
import ImageModal from './ImageModal/ImageModal';
import ErrorModal from './ErrorModal/ErrorModal';
import MessageModal from './MessageModal/MessageModal';
import SuccessModal from './SuccessModal/SuccessModal';
import DeleteChatModal from './DeleteChatModal/DeleteChatModal';

const Modals = () => {
  return (
    <>
      <SuccessModal />
      <ErrorModal />
      <MessageModal />
      <ImageModal />
      <DeleteChatModal />
    </>
  );
};

export default Modals;
