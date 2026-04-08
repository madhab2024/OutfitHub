import { useEffect } from 'react'

function App() {
  useEffect(() => {
    document.title = 'OutfitHub Logistics'
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-100 p-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">OutfitHub Logistics</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Delivery Operations Dashboard
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Track parcels, manage handoffs, and monitor last-mile delivery performance in one place.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Active Routes</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">128</h2>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.15em] text-slate-500">In Transit</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">46</h2>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Delivered Today</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">314</h2>
          </article>
        </div>
      </div>
    </div>
  )
}

export default App
