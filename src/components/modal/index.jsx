import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import Card from "components/card";

const BaseModal = ({
  buttonElement,
  cardElement,
  options = {
    confirmText: "確定",
    cancelText: "取消"
  },
  onConfirm
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    handleClose();
  };

  return (
    <>
      <div onClick={handleOpen}>
        {buttonElement}
      </div>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Card extra="w-full h-full p-3">
              {cardElement}
              <div className="my-4 flex justify-end gap-2">
                <button
                  onClick={handleClose}
                  className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                >
                  {options.cancelText}
                </button>
                <button
                  onClick={handleConfirm}
                  className="linear text-navy-700 rounded-xl bg-gray-100 px-5 py-3 text-base font-medium transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
                >
                  {options.confirmText}
                </button>
              </div>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BaseModal;
