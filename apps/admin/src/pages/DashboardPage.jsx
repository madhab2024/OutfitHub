const metrics = [
  { label: 'Active Vendors', value: '42' },
  { label: 'Live Products', value: '1,284' },
  { label: 'Orders Today', value: '316' },
  { label: 'Pending Deliveries', value: '58' },
]

export const DashboardPage = () => (
  <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
    {metrics.map((item) => (
      <article key={item.label} className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-lg">
        <p className="text-xs uppercase tracking-[0.15em] text-slate-500">{item.label}</p>
        <h2 className="mt-3 text-3xl font-black text-slate-900">{item.value}</h2>
      </article>
    ))}
  </section>
)
