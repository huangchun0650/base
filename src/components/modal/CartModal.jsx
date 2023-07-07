import React, { useState, useEffect } from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader} from "@chakra-ui/react";
import Card from "components/card";
import { MdClose } from "react-icons/md";
import products from "views/admin/product/variables/product.json";

function CartModal(props) {
  const { isOpen, onClose, cartProductIds = [], buttonText = "結帳" } = props
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const updatedQuantities = {};

    cartProductIds.forEach((productId) => {
      updatedQuantities[productId] = (updatedQuantities[productId] || 0) + 1;
    });

    setQuantities(updatedQuantities);
  }, [cartProductIds]);

  const handleDecrease = (productId) => {
    if (quantities[productId] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
    }
  };

  const handleIncrease = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

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
      <Card extra={"mt-3 !z-5 overflow-auto"} size="xl" >
        {Object.entries(quantities).map(([productId, quantity]) => {
          const product = products.find((item) => item.id === parseInt(productId));

          return (
            <div
              key={productId}
              className="flex h-full w-full items-start justify-between bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700 sm-max:overflow-auto"
            >
              <div className="pr-4 w-full flex flex-row h-[15vh] sm-max:h-[15vh] sm-max:flex-row">
                <div className="w-[20vh] sm-max:w-full">
                  <img className="h-full w-full rounded-xl" src={product.image} alt={product.title} />
                </div>
                <div className="w-5/6 flex flex-col sm-max:flex-col sm-max:w-full">
                  <h5 className="text-base font-bold text-navy-700 dark:text-white sm-max:text-xs">
                    {product.title}
                  </h5>
                  <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2 h-[10vh] overflow-auto sm-max:text-xs">
                    {product.description}
                  </p>
                  <div className="flex items-end justify-end h-10">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded overflow-auto"
                      onClick={() => handleDecrease(productId)}
                    >
                      -
                    </button>
                    <span className="mx-2">{quantity}</span>
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded"
                      onClick={() => handleIncrease(productId)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Card>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} allowPinchZoom="true">
      <ModalOverlay className="bg-[#000] !opacity-30" />
      <ModalContent className={`!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] top-[10vh] sm-max:top-[20vh]`}>
        <ModalBody>
          <Card extra={"w-[90vh] sm-max:w-full h-[77vh] p-3"}>
            <ModalHeader>
              <div className="mt-2 mb-8 w-full flex items-center justify-between">
                <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                  我的購物車
                </h4>
                <button
                  onClick={onClose}
                  className="text-red-500 dark:text-white hover:text-red-600 dark:hover:text-red-300 transition duration-200"
                >
                  <MdClose className="h-8 w-8" />
                </button>
              </div>
            </ModalHeader>
            <div className="grid grid-cols-1 gap-4 px-2 overflow-auto h-[70vh] sm-max:h-[58vh]">
              {getCartProducts()}
            </div>
            <div className="my-4 flex justify-end gap-2">
              <button className="linear rounded-xl border-2 border-green-500 px-5 py-3 text-base font-medium text-green-500 transition duration-200 hover:bg-green-600/5 active:bg-green-700/5 dark:border-green-400 dark:bg-green-400/10 dark:text-white dark:hover">
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