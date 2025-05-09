import Image from 'next/image';
import Link from 'next/link';

async function getProductById(id: string) {
  try {
    // In a real app, this would fetch from your API
    // For now, we'll return mock data based on the ID
    const products = [
      {
        _id: '1',
        name: 'Elegant Floral Hair Clip',
        image: '/images/floral-clip.jpg',
        description: 'Beautiful floral hair clip made with high-quality materials. Perfect for special occasions or everyday wear.',
        price: 19.99,
        rating: 4.5,
        numReviews: 12,
        countInStock: 10,
        brand: 'ElegantAccessories',
        category: 'Hair Clips',
      },
      {
        _id: '2',
        name: 'Silk Scrunchie Set',
        image: '/images/silk-scrunchie.jpg',
        description: 'Set of 3 silk scrunchies in different colors. Gentle on hair and prevents breakage.',
        price: 14.99,
        rating: 4.0,
        numReviews: 8,
        countInStock: 7,
        brand: 'SilkLuxe',
        category: 'Scrunchies',
      },
      {
        _id: '3',
        name: 'Pearl Headband',
        image: '/images/pearl-headband.jpg',
        description: 'Elegant pearl headband that adds a touch of sophistication to any outfit.',
        price: 29.99,
        rating: 4.8,
        numReviews: 15,
        countInStock: 5,
        brand: 'PearlGlam',
        category: 'Headbands',
      },
    ];

    return products.find(p => p._id === id) || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Product not found
        </div>
        <Link href="/" className="inline-block mt-4 text-blue-500 hover:underline">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-block mb-6 text-blue-500 hover:underline">
        Go Back
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Product Image */}
        <div className="bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-4">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="object-cover"
            />
          ) : (
            <div className="text-gray-400">No image available</div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-4 border-b pb-4">
            <div className="text-yellow-500 mr-1">★</div>
            <span>{product.rating} ({product.numReviews} reviews)</span>
          </div>
          
          <div className="text-xl font-bold mb-4">Price: ${product.price}</div>
          
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Description:</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Brand:</h3>
            <p>{product.brand}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Category:</h3>
            <p>{product.category}</p>
          </div>
        </div>

        {/* Add to Cart */}
        <div className="border rounded-lg p-4">
          <div className="mb-4 border-b pb-4">
            <div className="flex justify-between mb-2">
              <span>Price:</span>
              <span className="font-bold">${product.price}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Status:</span>
              <span>
                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
              </span>
            </div>
          </div>
          
          {product.countInStock > 0 && (
            <div className="mb-4">
              <label htmlFor="quantity" className="block mb-2">Quantity:</label>
              <select
                id="quantity"
                className="w-full border rounded p-2"
                defaultValue={1}
              >
                {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <button
            type="button"
            className={`w-full py-2 px-4 rounded ${
              product.countInStock > 0
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition`}
            disabled={product.countInStock === 0}
          >
            {product.countInStock > 0 ? 'Add To Cart' : 'Out Of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}
