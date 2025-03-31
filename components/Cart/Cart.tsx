import Image from 'next/image';
import { useProduct } from "../../src/app/context/ProductContext";
import { useRouter } from "next/navigation";
import { DEFAULT_PRODUCT_DETAILS } from "../../components/ProductDetails/ProductDetails";
import { motion } from "framer-motion";

interface CartProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Cart: React.FC<CartProps> = ({ open, setOpen }) => {
  const router = useRouter(); 
  const { multipleProducts, removeProduct, setCheckoutProducts, addProduct } = useProduct(); 

  const cartVariants = {
    open: {
      x: "0%",
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.1,
        when: "beforeChildren",
        staggerChildren: 0.10
      }
    },
    closed: {
      x: "100%",
      opacity: 0,
    }
  };

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.2
      }
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.2
      }
    }
  };

  const handleCheckout = () => {
    if (multipleProducts.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setCheckoutProducts(multipleProducts);
    router.push("/checkout");
  };

  return (
    <div className="p-2 bg-black/85 rounded-lg w-10 mr-5 border border-white hover:bg-black/90 pointer-cursor z-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.8 }}
        className="cursor-pointer"
      >
        <Image
          src="/cart_white.svg"
          alt="cart"
          width={40}
          height={50}
          className="w-auto h-auto"
          onClick={() => setOpen(!open)}
        />
      </motion.div>

      {open && (
        <motion.div 
          className="bg-white fixed top-0 right-0 w-2/3 lg:w-1/3 h-screen"
          initial="closed"
          animate={open ? "open" : "closed"}
          variants={cartVariants}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-6xl font-bold mt-10 text-black">Cart</h2>

            {multipleProducts.length === 0 ? (
              <p className="text-lg text-black">Your cart is empty</p>
            ) : (
              <motion.ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-3 overflow-y-scroll h-1/2 mt-10 bg-gray-200 rounded">
                {multipleProducts.map((product) => (
                  <motion.li 
                    key={product.cartItemId} 
                    className="p-2 border border-gray-300 rounded h-[280px] bg-red-50 flex flex-col items-center cursor-pointer relative"
                    variants={itemVariants}
                  >
                    <h2 className="text-sm uppercase text-center font-nunito text-black m-1">{product.name}</h2>
                    <Image src={product.thumbnail_url} alt={product.name} width={500} height={500} className="w-auto h-auto object-cover rounded mb-2" />
                    <p className="text-md text-center font-nunito text-black">${DEFAULT_PRODUCT_DETAILS.price}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="text-black font-bold px-2 py-1 bg-gray-300 rounded"
                        onClick={() => removeProduct(product.cartItemId)}
                      >
                        -
                      </button>
                      <span className="text-black font-bold">{product.quantity}</span>
                      <button
                        className="text-black font-bold px-2 py-1 bg-gray-300 rounded"
                        onClick={() => addProduct(product)}
                      >
                        +
                      </button>
                    </div>

                    <p className="text-md text-center font-nunito py-2 font-bold text-black">
                      Total: ${(product.quantity * DEFAULT_PRODUCT_DETAILS.price).toFixed(2)}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            )}

            <motion.p 
              variants={itemVariants}
              className='bg-black border-t border-white w-full py-2 text-md text-center font-nunito text-white'
            >
              Total: ${multipleProducts.reduce((total, product) => total + (product.quantity * DEFAULT_PRODUCT_DETAILS.price), 0).toFixed(2)}
            </motion.p>

            {multipleProducts.length > 0 && (
              <motion.button 
                variants={itemVariants}
                className="px-6 py-3 w-full cursor-pointer bg-green-600 text-white font-bold rounded" 
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </motion.button>
            )}

            <motion.div 
              variants={itemVariants}
              className='flex flex-col items-center justify-center h-1/2 w-full bg-white'
            >
              <h2 className='text-4xl text-black'>Upsale Items here!</h2>
            </motion.div>
          </div>
          
          <motion.button variants={itemVariants}>
            <p className="absolute top-5 left-5 cursor-pointer text-xl text-black" onClick={() => setOpen(!open)}>
              ✖
            </p>
          </motion.button>      
        </motion.div>
      )}
    </div>
  );
};

export default Cart;