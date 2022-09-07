import React from 'react';
import AvatarModal from './AvatarModal/AvatarModal';
import ErrorModal from './ErrorModal/ErrorModal';
import MessageModal from './MessageModal/MessageModal';
import SuccessModal from './SuccessModal/SuccessModal';

const Modals = () => {
  return (
    <>
      <SuccessModal />
      <ErrorModal />
      <AvatarModal />
      <MessageModal />
    </>
  );
};

export default Modals;
