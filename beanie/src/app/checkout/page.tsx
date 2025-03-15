"use client";
import { useProduct } from "../../app/context/ProductContext";
import { DEFAULT_PRODUCT_DETAILS } from "../../../components/ProductDetails/ProductDetails";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const { checkoutProducts, setCheckoutProducts, removeProductFromCheckout } = useProduct();
  const router = useRouter();

  const handlePlaceOrder = () => {
    if (checkoutProducts.length === 0) {
      alert("No products in checkout!");
      return;
    }
    setCheckoutProducts([]); // ✅ Clear checkout after placing order
    alert("Order placed successfully! 🚀");
    router.push("/shop"); // ✅ Redirect to shop
  };

  if (checkoutProducts.length === 0) {
    return <p className="text-center text-xl">No products for checkout.</p>;
  }

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold text-black">Checkout</h1>

      <ul className="mt-6 bg-amber-100 w-fit p-4" >

        {checkoutProducts.map((product, index) => (
       <li key={`${product.id}-${index}`}className="flex items-center gap-4 border-b border-black pb-4">
            <Image src={product.thumbnail_url} alt={product.name} width={100} height={100} />
            <div>
              <h2 className="text-xl font-bold text-black">{product.name}</h2>
              <p>${DEFAULT_PRODUCT_DETAILS.price}</p>
            </div>   
            <p className="text-2xl text-black cursor-pointer" onClick={() => removeProductFromCheckout(product.cartItemId)}>x</p>
          </li>
        ))}
        
      </ul>

      <button className="mt-6 px-6 py-3 bg-black text-white font-bold rounded" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;