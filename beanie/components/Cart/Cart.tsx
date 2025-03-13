import Image from 'next/image';
import { useProduct } from "../../src/app/context/ProductContext";
import { useRouter } from "next/navigation";

interface CartProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Cart: React.FC<CartProps> = ({ open, setOpen }) => {
  const router = useRouter();
  const { selectedProducts, removeProduct } = useProduct(); // ✅ Use `selectedProducts` instead of `selectedProduct`

  return (
    <div className="container mx-auto p-10">
      <Image
        src="/cart_black.svg"
        alt="cart"
        width={40}
        height={50}
        className="ml-2 sm:ml-10 cursor-pointer"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="bg-black/92 fixed top-0 right-0 w-1/2 h-screen">
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4 text-white">Cart</h2>

            {selectedProducts.length === 0 ? (
              <p className="text-lg text-white">Your cart is empty</p>
            ) : (
              <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
                {selectedProducts.map((product) => (
                  <li
                    key={product.id}
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