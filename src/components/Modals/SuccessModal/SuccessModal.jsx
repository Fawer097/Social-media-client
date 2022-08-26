import React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSuccessModal } from '../../../redux/slices/modalsSlice';
import styles from './SuccessModal.module.scss';

const SuccessModal = () => {
  const state = useSelector((state) => state.modals.successModal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Transition appear show={state.active} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 font-sans-serif"
        onClose={() => dispatch(setSuccessModal({ active: false }))}
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                <Dialog.Title className="flex items-center justify-center w-11 h-11 rounded-full bg-green-100">
                  <CheckIcon className="w-7 text-green-600" />
                </Dialog.Title>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-800 mt-6"
                >
                  Registration completed successfully!
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-center text-gray-500">
                    Now you can login to your account.
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => {
                      dispatch(setSuccessModal({ active: false }));
                      navigate('/signIn');
                    }}
                  >
                    Sign in
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

export default SuccessModal;
