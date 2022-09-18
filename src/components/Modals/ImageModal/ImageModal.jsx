import React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ImageModal.module.scss';
import { setImageModal } from '../../../redux/slices/modalsSlice';

const ImageModal = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  if (!state.modals.imageModal.url) {
    return null;
  }

  return (
    <Transition appear show={state.modals.imageModal.active} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 font-sans-serif"
        onClose={() => dispatch(setImageModal({ active: false }))}
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
                {state.userData && (
                  <img
                    className="w-full h-full"
                    src={state.modals.imageModal.url}
                    alt="image"
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ImageModal;
