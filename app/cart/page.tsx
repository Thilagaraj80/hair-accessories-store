"use client";

import { useStore } from "../../store/cart";
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);
  const router = useRouter()
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const updateQuantity = useStore((state: any) => state.updateQuantity);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (
    id: string,
    operation: "increase" | "decrease",
  ) => {
    updateQuantity(id, operation);
  };

  return (
    <div
      className="bg-cover bg-center bg-gray-100 min-h-screen flex flex-col"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1585832641917-c40a6d4cec77?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGhhcmklMjBhY2Nlc3Nvcmllc3xlbnwwfHwwfHx8MA%3D%3D)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-4xl mx-auto p-4 flex-1">
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div onClick={() => router.push('/')}>
          <p className="text-[18px] text-gray-600 cursor-pointer">go back</p>
        </div>
        <h1 className="text-3xl font-serif font-semibold text-center text-gray-700 mb-6">
          Your Cart
        </h1>

        {/* Empty Cart State */}
        {cart.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-lg">Your cart is empty. Add some products!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Product List */}
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white rounded-lg shadow-lg p-4"
              >
                {/* Product Image */}
                <img
                  src={item.image || "/default-image.jpg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />

                <div className="ml-2 flex-1">
                  <p className="text-[14px] font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">₹{item.price} each</p>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center space-x-2 ml-1">
                  {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                  <button
                    onClick={() => handleQuantityChange(item.id, "decrease")}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-transform duration-200 transform hover:scale-105 disabled:opacity-50"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                  <button
                    onClick={() => handleQuantityChange(item.id, "increase")}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-transform duration-200 transform hover:scale-105"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 font-medium ml-4 hover:underline transition duration-150"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Checkout Summary and Button */}
      <div className="bg-white p-4 shadow-md flex justify-between items-center sticky bottom-0 left-0 right-0">
        <div>
          <p className="font-semibold text-xl text-gray-800">Total</p>
          <p className="text-2xl font-bold text-pink-600">₹{total}</p>
        </div>
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          onClick={() => alert("Proceeding to checkout")}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full text-lg transition duration-300"
        >
          Checkout
        </button>
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      </div>
    </div>
  );
}
