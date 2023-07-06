import ProductCard from "components/card/ProductCard";
import products from "./variables/product.json";
import CartModal from "components/modal/CartModal";
import ProductDetailModal from "components/modal/ProductDetailModal";
import { useState } from "react";
import { MdShoppingCart} from "react-icons/md";

const Marketplace = () => {
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [isProductDetailModalOpen, setIsProductDetailModalOpen] = useState(false);
    const [selectProductId, setSelectProductId] = useState(1);
    const [cartProductIds, setCartProductIds] = useState([]);

    const handleCartClick = () => {
        setIsCartModalOpen(true);
    };

    const handleCartClose = () => {
        setIsCartModalOpen(false);
        setIsProductDetailModalOpen(false);
    };

    const handleAddToCart = (productId) => {
        setCartProductIds([...cartProductIds, productId]);
        console.log("已加入購物車的商品 ID:", cartProductIds);
    };

    const handleCardClick = (productId) => {
        setSelectProductId(productId);
        setIsProductDetailModalOpen(true);
        console.log("選擇商品 ID:", productId);
    };

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-4 h-fit w-full xl:col-span-4 2xl:col-span-4">
        {/* NFt Banner */}
        {/* <Banner /> */}

        {/* NFt Header */}
        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            商城
          </h4>
          <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-4">
            <li>
              <button
                onClick={handleCartClick}
                className="inline-flex items-center space-x-1 text-base font-medium text-white dark:text-white bg-brand-500 hover:bg-brand-400 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200 rounded-xl py-[12px] px-4 transition duration-200"
              >
                <MdShoppingCart className="w-5 h-5 mr-1" /> 我的購物車
              </button>
            </li>
          </ul>
        </div>
        {/* <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
        </div> */}

        {/* NFTs trending card */}
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
                id={product.id}
                key={index}
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
                onAddToCart = {handleAddToCart}
                handleCardClick = {handleCardClick}
            />
          ))}
        </div>
      </div>
          {isCartModalOpen && <CartModal isOpen={true} onClose={handleCartClose} cartProductIds={cartProductIds} />}
          {isProductDetailModalOpen && <ProductDetailModal isOpen={true} onClose={handleCartClose} id={ selectProductId } />}
    </div>
  );
};

export default Marketplace;
