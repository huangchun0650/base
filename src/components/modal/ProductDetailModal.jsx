import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody} from "@chakra-ui/react";
import Card from "components/card";
import Selector from "components/selector";
import TabSelector from "components/tabs";
import { MdClose } from "react-icons/md";
import products from "views/admin/product/variables/product.json";

function ProductDetailModal(props) {
  const { isOpen, onClose, id, onAddToCart, purchase} = props
    
  const product = products.find((item) => item.id === id);
    
  const handleChangeSpecification = () => {
    console.log(1)
  };

  const handleAddInCart = () => {
    onAddToCart(id)
    onClose()
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
      <ModalContent className={`!z-[1002] !m-auto !w-max min-w-[350px] !max-w-[85%] top-[3vh] sm-max:top-[8vh] overflow-auto`}>
        <ModalBody >
          <Card extra={"w-full h-full p-3"}>
            <button
              onClick={onClose}
              className="text-red-500 dark:text-white hover:text-red-600 dark:hover:text-red-300 transition duration-200 ml-auto" 
            >
              <MdClose className="h-8 w-8"/>
            </button>
            <div className="flex flex-col max-w-full max-h-[73vh] overflow-auto">
              <div className="flex flex-row sm-max:flex-col w-full">
                <div className="w-1/2 pr-4 sm-max:w-full">
                  <img src={product.image} alt={product.id} className="w-full" />
                </div>
                <div className="w-1/2 pr-4 sm-max:w-full overflow-auto">
                  <div className="h-[5vh] sm-max:h-[15vh]">
                    <h5 className="text-base font-bold text-navy-700 dark:text-white h-[5vh] sm-max:h-[12vh]">
                      {product.title}
                    </h5>
                  </div>
                  <div className="h-[25vh] overflow-auto">
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
                    <label className="text-3xl font-bold text-navy-700 mt-3 h-[5vh] dark:text-white ml-3 sm-max:text-xl">
                      月付 NT$ ：{product.totalPrice} * 
                    </label>
                  </div>
                  <div className="mb-3 mt-12 sm-max:mt-20 flex justify-end items-end sm-max:justify-center gap-2">
                    <button
                      className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
                        >
                      立即購買
                    </button>
                    <button
                      onClick={handleAddInCart}
                      className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-3 items-center justify-center">
                <TabSelector data={product.contents}/>
              </div>
            </div>
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ProductDetailModal;
