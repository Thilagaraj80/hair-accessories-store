import Image from "next/image";
import Link from "next/link";

async function getProducts() {
  try {
    // In a real app, this would fetch from your API
    // For now, we'll return mock data
    return [
      {
        _id: '1',
        name: 'Elegant Floral Hair Clip',
        image: '/images/floral-clip.jpg',
        description: 'Beautiful floral hair clip made with high-quality materials.',
        price: 19.99,
        rating: 4.5,
        numReviews: 12,
      },
      {
        _id: '2',
        name: 'Silk Scrunchie Set',
        image: '/images/silk-scrunchie.jpg',
        description: 'Set of 3 silk scrunchies in different colors.',
        price: 14.99,
        rating: 4.0,
        numReviews: 8,
      },
      {
        _id: '3',
        name: 'Pearl Headband',
        image: '/images/pearl-headband.jpg',
        description: 'Elegant pearl headband that adds a touch of sophistication.',
        price: 29.99,
        rating: 4.8,
        numReviews: 15,
      },
    ];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Hair Accessories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg overflow-hidden shadow-md">
            <Link href={`/product/${product._id}`}>
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                ) : (
                  <div className="text-gray-400">No image available</div>
                )}
              </div>
            </Link>

            <div className="p-4">
              <Link href={`/product/${product._id}`}>
                <h2 className="text-lg font-semibold mb-2 product-title">{product.name}</h2>
              </Link>

              <div className="flex items-center mb-2">
                <div className="text-yellow-500 mr-1">★</div>
                <span>{product.rating} ({product.numReviews} reviews)</span>
              </div>

              <div className="text-xl font-bold">${product.price}</div>

              <Link href={`/product/${product._id}`}>
                <button type="button" className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
