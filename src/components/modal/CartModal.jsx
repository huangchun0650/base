import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader} from "@chakra-ui/react";
import Card from "components/card";
import { MdClose } from "react-icons/md";
import products from "views/admin/product/variables/product.json";

function CartModal(props) {
    const { isOpen, onClose, cartProductIds = [], buttonText = "結帳" } = props
    const getCartProducts = () => {
      if (cartProductIds.length === 0) {
        return (
          <Card extra={"mt-3 overflow-hidden"}>
            <div className="flex justify-center items-center h-full">
              <p>您的購物車還沒有商品</p>
            </div>
          </Card>
        );
      }

      return (
        <Card extra={"mt-3 !z-5 overflow-hidden"}>
          {cartProductIds.map((productId) => {
            const product = products.find((item) => item.id === productId);
            return (
              <div
                key={productId}
                className="flex h-full w-full items-start justify-between bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center">
                    <img className="h-full w-full rounded-xl" src={product.image} alt={product.title} />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-base font-bold text-navy-700 dark:text-white">
                      {product.title}
                    </h5>
                  </div>
                </div>

                <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
                  <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
                    <p className="ml-1">$NT</p>
                    <p>{product.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Card>
      );
    };

  
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            allowPinchZoom="true"
        >
            <ModalOverlay className="bg-[#000] !opacity-30" />
            <ModalContent className={`!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] top-[20vh]`}>
                <ModalBody>
                    <Card extra={"w-full h-full p-3"}>
                        <ModalHeader >
                            <div className="mt-2 mb-8 w-full flex items-center">
                                <button
                                    onClick={onClose}
                                    className="text-red-500 dark:text-white hover:text-red-600 dark:hover:text-red-300 transition duration-200"
                                >
                                    <MdClose className="h-6 w-6"/>
                                </button>
                                <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                                    我的購物車
                                </h4>
                            </div>
                        </ModalHeader>
                        <div className="grid grid-cols-1 gap-4 px-2">
                            {getCartProducts()}
                        </div>
                        <div className="my-4 flex justify-end gap-2">
                        <button
                            className="linear rounded-xl border-2 border-green-500 px-5 py-3 text-base font-medium text-green-500 transition duration-200 hover:bg-green-600/5 active:bg-green-700/5 dark:border-green-400 dark:bg-green-400/10 dark:text-white dark:hover:bg-green-300/10 dark:active:bg-green-200/10"
                            >
                            {buttonText}
                        </button>
                    </div>
                    </Card>
                </ModalBody>
            </ModalContent>
        </Modal>
  );
}

export default CartModal;
