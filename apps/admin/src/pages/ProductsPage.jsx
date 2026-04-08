const sampleProducts = [
  { id: 'P-1021', name: 'Oversized Linen Shirt', vendor: 'Urban Loom', stock: 112 },
  { id: 'P-1022', name: 'Classic Straight Jeans', vendor: 'Denim Bay', stock: 83 },
  { id: 'P-1023', name: 'Minimal Cotton Hoodie', vendor: 'North Knit', stock: 65 },
]

export const ProductsPage = () => (
  <section className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg">
    <h2 className="text-2xl font-black text-slate-900">Catalog Snapshot</h2>
    <p className="mt-1 text-sm text-slate-600">Starter UI connected point for products APIs.</p>
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="text-slate-500">
          <tr>
            <th className="py-2">Product ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Vendor</th>
            <th className="py-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {sampleProducts.map((product) => (
            <tr key={product.id} className="border-t border-slate-200/70">
              <td className="py-3 font-semibold text-slate-900">{product.id}</td>
              <td className="py-3 text-slate-700">{product.name}</td>
              <td className="py-3 text-slate-700">{product.vendor}</td>
              <td className="py-3 text-slate-700">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
)
