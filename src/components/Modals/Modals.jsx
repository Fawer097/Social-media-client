import React from 'react';
import ImageModal from './ImageModal/ImageModal';
import ErrorModal from './ErrorModal/ErrorModal';
import MessageModal from './MessageModal/MessageModal';
import SuccessModal from './SuccessModal/SuccessModal';

const Modals = () => {
  return (
    <>
      <SuccessModal />
      <ErrorModal />
      <ImageModal />
      <MessageModal />
    </>
  );
};

export default Modals;
