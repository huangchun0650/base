import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody} from "@chakra-ui/react";
import Card from "components/card";
import InputField from "components/fields/InputField";

function DataModal(props) {
    const {
        title = "",
        isOpen,
        onClose,
        columns,
        data,
        options = {
            confirmText: "確定",
            cancelText: "取消"
        },
        onConfirm
    } = props

    const handleInputChange = () => {
        console.log('change')
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            allowPinchZoom="true"
        >
            <ModalOverlay className="bg-[#000] !opacity-30" />
            <ModalContent className={`!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] md:top-[20vh] sm-max:top-[30vh]`}>
                <ModalBody>
                    <Card extra={"w-full h-full p-3"}>
                        <div className="mt-2 mb-8 w-full">
                            <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                            {title}
                            </h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4 px-2">
                            {columns.map((value, index) => {
                                if (React.isValidElement(value.isOptions)){
                                    return (
                                    <div className="w-72" key={index}>
                                        {value.isOptions}
                                    </div>
                                    );
                                } else {
                                    const columnValue = data ? data[value.accessor] : "";
                                    return (
                                    <div className="w-72" key={index}>
                                        <InputField
                                        color="teal"
                                        label={value.Header}
                                        value={columnValue}
                                        disabled={value.readOnly}
                                        onChange={handleInputChange}
                                        />
                                    </div>
                                    );
                                }
                            })}
                        </div>
                        <div className="my-4 flex justify-end gap-2">
                            <button
                            onClick={onClose}
                            className="linear rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                            >
                            {options.cancelText}
                            </button>
                            <button
                            onClick={onConfirm}
                            className="linear rounded-xl border-2 border-green-500 px-5 py-3 text-base font-medium text-green-500 transition duration-200 hover:bg-green-600/5 active:bg-green-700/5 dark:border-green-400 dark:bg-green-400/10 dark:text-white dark:hover:bg-green-300/10 dark:active:bg-green-200/10"
                            >
                            {options.confirmText}
                            </button>
                        </div>
                    </Card>
                </ModalBody>
            </ModalContent>
        </Modal>
  );
}

export default DataModal;
