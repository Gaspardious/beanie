import Image from 'next/image';
import { useProduct } from "../../src/app/context/ProductContext";
/* import { useRouter } from "next/navigation"; */

interface CartProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Cart: React.FC<CartProps> = ({ open, setOpen }) => {
/*   const router = useRouter(); */
  const { multipleProducts, removeProduct } = useProduct(); 

  return (
    <div className="p-2 bg-black/85 rounded-lg w-10 mr-5 hover:bg-black/90 pointer-cursor z-10">
      <Image
        src="/cart_white.svg"
        alt="cart"
        width={40}
        height={50}
        className=" cursor-pointer w-auto h-auto"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="bg-black/92 fixed top-0 right-0 w-1/2 h-screen">
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4 text-white">Cart</h2>

            {multipleProducts.length === 0 ? (
              <p className="text-lg text-white">Your cart is empty</p>
            ) : (
              <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
                {multipleProducts.map((product, index) => (
                  <li
                    key={`${product.id}-${index}`}
                    className="p-4 border border-gray-300 rounded shadow bg-white flex flex-col items-center cursor-pointer"
                  >
                    <Image
                      src={product.thumbnail_url}
                      alt={product.name}
                      width={500}
                      height={500}
                      className="w-auto h-auto object-cover rounded mb-2"
                    />
                    <h2 className="text-lg font-bold text-center text-black">{product.name}</h2>
                    <button
                      className="text-red-500 mt-2"
                      onClick={() => removeProduct(product.id)} // ✅ Remove product
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button>
            <p className="absolute top-5 left-5 cursor-pointer text-white" onClick={() => setOpen(!open)}>
              X
            </p>
          </button>
          
        </div>
      )}
    </div>
  );
};

export default Cart;