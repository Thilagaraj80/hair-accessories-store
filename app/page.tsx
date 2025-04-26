'use client';

import { useEffect } from 'react';
import { useStore } from '../store/cart';
import { useRouter } from 'next/navigation';

// Sample products
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const sampleProducts: any = [
  {
    id: '1',
    name: 'Elegant Hair Pin',
    price: 15,
    image: 'https://images.unsplash.com/photo-1601938219471-fb3393955f15?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpciUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww',
    description: 'A beautiful hair pin to add elegance to your style.',
    inStock: true,
  },
  {
    id: '2',
    name: 'Floral Headband',
    price: 20,
    image: 'https://images.unsplash.com/photo-1554196222-3464352db975?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhhaXIlMjBhY2Nlc3Nvcmllc3xlbnwwfHwwfHx8MA%3D%3D',
    description: 'A floral headband perfect for casual wear.',
    inStock: true,
  },
  {
    id: '3',
    name: 'Gold Hair Clips',
    price: 12,
    image: 'https://plus.unsplash.com/premium_photo-1674625942772-b41c3aabb094?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhhaXIlMjBhY2Nlc3Nvcmllc3xlbnwwfHwwfHx8MA%3D%3D',
    description: 'Set of 3 elegant gold hair clips.',
    inStock: true,
  },
  {
    id: '4',
    name: 'Velvet Scrunchie',
    price: 7,
    image: 'https://images.unsplash.com/photo-1672699323645-75ace776093e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VmVsdmV0JTIwU2NydW5jaGllfGVufDB8fDB8fHww',
    description: 'A soft velvet scrunchie to keep your hair in place.',
    inStock: true,
  },
];

export default function HomePage() {
  const products = useStore((state) => state.products);
  const setProducts = useStore((state) => state.setProducts);
  const addToCart = useStore((state) => state.addToCart);
  const router = useRouter();

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleAddToCart = (product: any) => {
    addToCart(product);
    router.push('/cart');
  };

  useEffect(() => {
    setProducts(sampleProducts);
  }, [setProducts]);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1641934823422-af027a1a3376?w=1600&auto=format&fit=crop&q=80')",
      }}
    >
      <h1 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">
        Hair Accessories Collection ✨
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col items-center transition hover:scale-105 hover:shadow-2xl duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-36 h-36 object-cover rounded-full mb-4 border-4 border-pink-200"
            />
            <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-pink-600 font-semibold mt-2">₹{product.price}</p>
            <p className="text-gray-600 text-sm text-center mt-1">{product.description}</p>

            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition duration-300"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
