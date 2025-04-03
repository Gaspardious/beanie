import Image from 'next/image';
import { useProduct } from "../../src/app/context/ProductContext";
import { useRouter } from "next/navigation";
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
        duration: 0.1
      }
    },
    closed: {
      x: "100%",
      opacity: 0,
    }
  };

  const handleCheckout = () => {
    if (multipleProducts.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setCheckoutProducts(multipleProducts);
    setOpen(false);
    router.push("/checkout");
  };

  const calculateTotal = () => {
    return multipleProducts.reduce((total, product) => total + (product.quantity * product.price), 0).toFixed(2);
  };

  return (
    <div className="p-2 bg-black/85 rounded-lg w-10 mr-5 border border-white hover:bg-black/90 pointer-cursor z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
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
          className="bg-white fixed top-0 right-0 w-full md:w-[500px] h-screen"
          initial="closed"
          animate={open ? "open" : "closed"}
          variants={cartVariants}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold uppercase tracking-wider text-black">Shopping Bag</h2>
              <button onClick={() => setOpen(false)} className="text-2xl text-black">×</button>
            </div>

            <div className="flex-1 overflow-auto">
              {multipleProducts.map((product) => (
                <div key={product.cartItemId} className="border-b border-gray-200 py-6">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 bg-gray-50">
                      <Image 
                        src={product.thumbnail_url} 
                        alt={product.name} 
                        width={96} 
                        height={96} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base uppercase tracking-wider text-black">{product.name}</h3>
                      <p className="text-sm mt-1 text-black">Beige/Beige</p>
                      
                      <div className="flex items-center mt-4">
                        <div className="flex items-center">
                          <button
                            className="text-lg w-8 h-8 hover:bg-gray-100 text-black"
                            onClick={() => removeProduct(product.cartItemId)}
                          >−</button>
                          <span className="w-8 text-center text-black">{product.quantity}</span>
                          <button
                            className="text-lg w-8 h-8 hover:bg-gray-100 text-black"
                            onClick={() => addProduct(product)}
                          >+</button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-black">{product.price} SEK</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6">
              <div className="flex justify-between py-4 border-t border-gray-200">
                <span className="text-sm uppercase tracking-wider text-black">TOTAL incl. VAT & Duties</span>
                <span className="font-medium text-black">{calculateTotal()} SEK</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white py-4 mb-6 uppercase tracking-wider font-medium hover:bg-black/90 transition-colors"
              >
                Checkout
              </button>

              <div className="flex justify-center gap-4 mb-8">
                <Image src="/images/visa.svg" alt="Visa" width={32} height={20} className="opacity-50 hover:opacity-100 transition-opacity" />
                <Image src="/images/mastercard.svg" alt="Mastercard" width={32} height={20} className="opacity-50 hover:opacity-100 transition-opacity" />
                <Image src="/images/klarna.svg" alt="Klarna" width={32} height={20} className="opacity-50 hover:opacity-100 transition-opacity" />
              </div>

              {multipleProducts.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-base uppercase tracking-wider mb-4 text-black">Last minute additions</h3>
                  {/* Add last minute suggestions here */}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;