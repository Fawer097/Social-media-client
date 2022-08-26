import React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorModal } from '../../../redux/slices/modalsSlice';
import styles from './ErrorModal.module.scss';

const ErrorModal = () => {
  const state = useSelector((state) => state.modals.errorModal);
  const dispatch = useDispatch();

  return (
    <Transition appear show={state.active} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 font-sans-serif"
        onClose={() => dispatch(setErrorModal({ active: false }))}
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
                <Dialog.Title className="flex items-center justify-center w-11 h-11 rounded-full bg-red-100">
                  <ExclamationIcon className="w-7 text-red-600" />
                </Dialog.Title>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-800 mt-6"
                >
                  Registration error!
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-center text-gray-500">
                    {state.message}
                  </p>
                </div>

                <div className="mt-5">
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => dispatch(setErrorModal({ active: false }))}
                  >
                    Try again
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

export default ErrorModal;
