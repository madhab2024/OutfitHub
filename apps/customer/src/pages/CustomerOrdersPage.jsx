const orders = [
  { id: 'CO-2001', status: 'Processing', eta: 'Tomorrow' },
  { id: 'CO-2002', status: 'Out for delivery', eta: 'Today' },
  { id: 'CO-2003', status: 'Delivered', eta: 'Completed' },
]

export const CustomerOrdersPage = () => (
  <section className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg">
    <h2 className="text-2xl font-black text-teal-950">Order Tracking</h2>
    <p className="mt-1 text-sm text-teal-800/80">See delivery status and estimated arrival for your purchases.</p>
    <div className="mt-5 space-y-3">
      {orders.map((order) => (
        <article key={order.id} className="flex flex-col gap-2 rounded-2xl border border-teal-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-teal-950">{order.id}</p>
            <p className="text-sm text-teal-700">ETA: {order.eta}</p>
          </div>
          <div className="inline-flex rounded-full bg-teal-950 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {order.status}
          </div>
        </article>
      ))}
    </div>
  </section>
)