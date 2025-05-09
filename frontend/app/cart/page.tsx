'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Mock cart data
  useEffect(() => {
    setCartItems([
      {
        _id: '1',
        name: 'Elegant Floral Hair Clip',
        image: '/images/floral-clip.jpg',
        price: 19.99,
        countInStock: 10,
        qty: 2,
      },
      {
        _id: '3',
        name: 'Pearl Headband',
        image: '/images/pearl-headband.jpg',
        price: 29.99,
        countInStock: 5,
        qty: 1,
      },
    ]);
  }, []);

  const removeFromCartHandler = (id: string) => {
    setCartItems(cartItems.filter(item => item._id !== id));
  };

  const updateQtyHandler = (id: string, qty: number) => {
    setCartItems(
      cartItems.map(item => 
        item._id === id ? { ...item, qty } : item
      )
    );
  };

  const getCartSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
  };

  const getCartCount = () => {
    return cartItems.reduce((acc, item) => acc + item.qty, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded mb-4">
          Your cart is empty.{' '}
          <Link href="/" className="text-blue-600 hover:underline">
            Go Back
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="border rounded-lg overflow-hidden">
              {cartItems.map(item => (
                <div key={item._id} className="flex flex-col md:flex-row border-b last:border-b-0 p-4">
                  <div className="md:w-24 h-24 bg-gray-200 rounded flex items-center justify-center mb-4 md:mb-0 md:mr-4">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    ) : (
                      <div className="text-gray-400">No image</div>
                    )}
                  </div>

                  <div className="flex-grow">
                    <Link href={`/product/${item._id}`} className="text-lg font-semibold hover:text-blue-600">
                      {item.name}
                    </Link>

                    <div className="mt-2 text-gray-700">${item.price}</div>

                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <div className="flex items-center">
                        <label htmlFor={`qty-${item._id}`} className="mr-2">
                          Qty:
                        </label>
                        <select
                          id={`qty-${item._id}`}
                          value={item.qty}
                          onChange={(e) => updateQtyHandler(item._id, Number(e.target.value))}
                          className="border rounded p-1"
                        >
                          {[...Array(Math.min(item.countInStock, 10)).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCartHandler(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-bold mb-4">
                Subtotal ({getCartCount()}) items
              </h2>
              
              <div className="text-2xl font-bold mb-4">${getCartSubtotal()}</div>
              
              <button
                type="button"
                className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
                disabled={cartItems.length === 0}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
