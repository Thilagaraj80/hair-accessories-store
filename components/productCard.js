// components/ProductCard.js
import Link from 'next/link'

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
      <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
      <p className="text-lg font-bold text-gray-700">{`$${product.price}`}</p>
      <Link href={`/product/${product.id}`}>
        {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
        <a className="text-blue-500 hover:underline">View Details</a>
      </Link>
    </div>
  )
}

export default ProductCard
