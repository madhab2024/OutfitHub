const cartItems = [
  { name: 'Relaxed Linen Shirt', qty: 1, price: '$48.00' },
  { name: 'Soft Cotton Tee', qty: 2, price: '$24.00' },
]

export const CartPage = () => (
  <section className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg">
    <h2 className="text-2xl font-black text-teal-950">Your Cart</h2>
    <p className="mt-1 text-sm text-teal-800/80">Review selected items before placing an order.</p>
    <ul className="mt-5 space-y-3">
      {cartItems.map((item) => (
        <li key={item.name} className="flex items-center justify-between rounded-2xl border border-teal-100 bg-white p-4">
          <div>
            <p className="font-bold text-teal-950">{item.name}</p>
            <p className="text-sm text-teal-700">Quantity: {item.qty}</p>
          </div>
          <div className="font-semibold text-teal-950">{item.price}</div>
        </li>
      ))}
    </ul>
  </section>
)