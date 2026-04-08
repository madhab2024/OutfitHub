const sampleOrders = [
  { id: 'O-9001', customer: 'Amelia J.', amount: '$124.00', status: 'Packed' },
  { id: 'O-9002', customer: 'Ravi N.', amount: '$79.00', status: 'Shipped' },
  { id: 'O-9003', customer: 'Lina K.', amount: '$202.00', status: 'Pending' },
]

export const OrdersPage = () => (
  <section className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg">
    <h2 className="text-2xl font-black text-slate-900">Order Flow</h2>
    <p className="mt-1 text-sm text-slate-600">Use this page to connect moderation and fulfillment workflows.</p>
    <ul className="mt-5 space-y-3">
      {sampleOrders.map((order) => (
        <li key={order.id} className="flex flex-col rounded-2xl border border-slate-200/70 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-slate-900">{order.id}</p>
            <p className="text-sm text-slate-600">{order.customer}</p>
          </div>
          <div className="text-sm font-semibold text-slate-700">{order.amount}</div>
          <div className="mt-2 inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white sm:mt-0">
            {order.status}
          </div>
        </li>
      ))}
    </ul>
  </section>
)
