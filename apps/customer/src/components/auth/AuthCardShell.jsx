export const AuthCardShell = ({ eyebrow, title, description, children }) => {
  return (
    <div className="w-full rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-2xl shadow-slate-200/60 backdrop-blur sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      {children}
    </div>
  )
}
