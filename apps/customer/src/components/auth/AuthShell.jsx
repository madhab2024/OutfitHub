import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faShieldHeart, faTruckFast } from '@fortawesome/free-solid-svg-icons'

const featureItems = [
  { icon: faBagShopping, title: 'Curated fashion', text: 'Discover outfits picked for daily wear and premium occasions.' },
  { icon: faTruckFast, title: 'Fast delivery', text: 'Shop quickly and get dependable fulfillment updates.' },
  { icon: faShieldHeart, title: 'Secure shopping', text: 'Supabase-powered login with a secure customer experience.' },
]

export const AuthShell = ({
  eyebrow,
  title,
  subtitle,
  accentTitle,
  accentSubtitle,
  footerText,
  footerLink,
  footerLinkLabel,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.12),_transparent_26%),linear-gradient(180deg,_#f8fafc_0%,_#eef4ff_100%)] p-4 sm:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <aside className="relative hidden w-[44%] overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-8 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-10 right-0 h-80 w-80 rounded-full bg-orange-300/25 blur-3xl" />
          </div>

          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-100">{eyebrow}</p>
            <h1 className="mt-4 max-w-md text-5xl font-black leading-tight tracking-tight">{title}</h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-blue-100">{subtitle}</p>

            <div className="mt-8 space-y-4">
              {featureItems.map((item) => (
                <article key={item.title} className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-lg">
                    <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold">{item.title}</h2>
                    <p className="mt-1 text-xs leading-5 text-blue-100">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="relative z-10 rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-blue-100">OutfitHub</p>
            <div className="mt-3 grid grid-cols-[1.1fr_0.9fr] gap-4">
              <div>
                <p className="text-sm font-semibold text-white/90">Fashion-first shopping</p>
                <p className="mt-2 text-xs leading-5 text-blue-100">
                  A clean marketplace experience for men, women, kids and accessories.
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="h-24 rounded-xl bg-[url('https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center shadow-inner" />
              </div>
            </div>
          </div>
        </aside>

        <main className="flex flex-1 items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-lg">
            <div className="mb-6 lg:hidden">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{eyebrow}</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{title}</h1>
              <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
            </div>

            {children}

            <div className="mt-6 text-center text-sm text-slate-600">
              {footerText}{' '}
              <a href={footerLink} className="font-semibold text-blue-700 hover:underline">
                {footerLinkLabel}
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}