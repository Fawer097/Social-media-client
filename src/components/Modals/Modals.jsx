import React from 'react';
import AvatarModal from './AvatarModal/AvatarModal';
import ErrorModal from './ErrorModal/ErrorModal';
import SuccessModal from './SuccessModal/SuccessModal';

const Modals = () => {
  return (
    <>
      <SuccessModal />
      <ErrorModal />
      <AvatarModal />
    </>
  );
};

export default Modals;
