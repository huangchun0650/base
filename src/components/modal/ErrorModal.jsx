import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody} from "@chakra-ui/react";
import Card from "components/card";
import classNames from "classnames";

const ErrorModal = ({ isOpen, onClose, errorMessage, buttonText= "關閉" }) => {
    const modalTopClass = classNames("top-[30vh]", "md:top-[30vh]");
  
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            allowPinchZoom="true"
        >
            <ModalOverlay className="bg-[#000] !opacity-30" />
            <ModalContent className={`!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] ${modalTopClass}`}>
                <ModalBody>
                    <Card extra={"w-full h-full p-3"}>
                        <div className="mt-2 mb-8 w-full">
                            <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                            錯誤
                            </h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4 px-2">
                            {errorMessage}
                        </div>
                        <div className="my-4 flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                            >
                            {buttonText}
                        </button>
                    </div>
                    </Card>
                </ModalBody>
            </ModalContent>
        </Modal>
  );
};

export default ErrorModal;
