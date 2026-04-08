export const AuthVisual = ({ title, subtitle, bullets = [] }) => {
  return (
    <div className="relative hidden min-h-[680px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="absolute -right-28 top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-cyan-300/20 blur-2xl" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-100">OutfitHub</p>
        <h1 className="mt-4 max-w-md text-5xl font-black leading-tight">{title}</h1>
        <p className="mt-4 max-w-md text-base text-blue-100">{subtitle}</p>
      </div>

      <div className="relative grid gap-4">
        {bullets.map((bullet) => (
          <div key={bullet.title} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-sm font-bold">{bullet.title}</p>
            <p className="mt-1 text-sm text-blue-100">{bullet.description}</p>
          </div>
        ))}
      </div>

      <div className="relative flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-100">Secure login powered by Supabase</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-blue-100/70">Fashion marketplace experience</p>
        </div>
        <div className="grid h-20 w-20 place-items-center rounded-3xl bg-white/15 text-2xl font-black backdrop-blur-sm">
          OH
        </div>
      </div>
    </div>
  )
}
