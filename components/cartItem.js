// components/CartItem.js
import useCartStore from '../store/cart'

const CartItem = ({ item }) => {
  const { removeItem } = useCartStore()

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center">
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-500">{`$${item.price}`}</p>
        </div>
      </div>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={() => removeItem(item.id)} className="text-red-500">Remove</button>
    </div>
  )
}

export default CartItem
