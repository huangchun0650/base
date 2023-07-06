import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody} from "@chakra-ui/react";
import Card from "components/card";
import Selector from "components/selector";
import { MdClose } from "react-icons/md";
import products from "views/admin/product/variables/product.json";

function ProductDetailModal(props) {
  const { isOpen, onClose, id } = props
    
  const product = products.find((item) => item.id === id);
    
  const handleChangeSpecification = () => {
    console.log(1)
  };
  
  return (
    <Modal
      isOpen={isOpen}
      size={"xl"}
      onClose={onClose}
      preserveScrollBarGap ={false}
      scrollBehavior={"outside"}
    >
      <ModalOverlay className="bg-[#000] !opacity-30" />
      <ModalContent className={`!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] top-[10vh] sm-max:top-[19vh]`}>
        <ModalBody >
          <Card extra={"w-full h-full p-3"}>
            <button
              onClick={onClose}
              className="text-red-500 dark:text-white hover:text-red-600 dark:hover:text-red-300 transition duration-200 ml-auto" 
            >
              <MdClose className="h-8 w-8"/>
            </button>
            <div className="max-w-full max-h-full">
              <div className="flex flex-col sm:flex-row overflow-auto sm-max:h-[72vh]">
                <div className="w-1/2 pr-4 sm-max:w-full">
                  <img src={product.image} alt={product.id} className="w-full" />
                </div>
                <div className="w-1/2 pr-4 sm-max:w-full">
                  <div className="h-[5vh]">
                    <h5 className="text-base font-bold text-navy-700 dark:text-white h-[5vh] sm-max:h-[10vh]">
                      {product.title}
                    </h5>
                  </div>
                  <div className="h-[30vh] overflow-auto">
                    <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2 h-[15vh]">
                      {product.description}
                    </p>
                  </div>
                  <div className="h-[30vh] mt-5">
                    <div className="mb-5">
                      <Selector
                        name="規格"
                        data={product.specification}
                        multi={false}
                        onChange={(selects) => handleChangeSpecification('specification', selects)}
                      />
                    </div>
                    <label className="text-sm font-bold text-navy-700 md:mt-2 h-[5vh] dark:text-white ml-3">
                      直購價：{product.totalPrice}
                    </label>
                    <div className="flex flex-wrap mt-2 ml-3">
                      {product.options.map((option, index) => (
                        <button
                          key={index}
                          className="mr-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                    <label className="text-3xl font-bold text-navy-700 md:mt-2 h-[5vh] dark:text-white ml-3">
                      月付 NT$ ：{product.totalPrice} * 
                    </label>
                  </div>
                  <div className="mt-12 flex justify-end items-end gap-2">
                    <button
                      className="rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
                        >
                      立即購買
                    </button>
                    <button
                      className="rounded-xl border-2 border-green-500 px-5 py-3 text-base font-medium text-green-500 transition duration-200 hover:bg-green-600/5 active:bg-green-700/5 dark:border-green-400 dark:bg-green-400/10 dark:text-white dark:hover:bg-green-300/10 dark:active:bg-green-200/10"
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ProductDetailModal;
