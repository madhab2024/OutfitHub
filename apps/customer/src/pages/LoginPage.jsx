import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'

import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { supabase } from '../lib/supabase'

export const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const { error: signinError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signinError) {
      setError(signinError.message)
      setLoading(false)
      return
    }

    navigate('/')
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    setError('')

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    })

    if (oauthError) {
      setError(oauthError.message)
      setGoogleLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5] p-4 font-sans">
      <div className="relative flex min-h-[600px] w-full max-w-[1000px] overflow-hidden rounded-[30px] bg-white shadow-2xl">
        {/* Left Side - Login Form (Blue) */}
        <div className="relative flex w-full flex-col justify-center bg-[#0066FF] px-8 py-12 text-white md:w-1/2 md:px-16">
          {/* Decorative Blobs */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl font-bold tracking-tight">Welcome Back</h1>
            <p className="mt-4 text-sm font-light leading-relaxed text-blue-100">
              Enter your credentials to access your account and continue your shopping journey with OutfitHub.
            </p>

            <form className="mt-10 flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <User size={20} />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="h-14 w-full rounded-2xl border-none bg-white/95 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="h-14 w-full rounded-2xl border-none bg-white/95 pl-12 pr-16 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {error && (
                <div className="rounded-xl bg-red-500/10 px-4 py-2 text-sm text-red-100 backdrop-blur-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-4 flex h-14 w-full items-center justify-center rounded-2xl bg-[#FF9900] text-lg font-bold text-white transition-all hover:bg-[#e68a00] hover:shadow-lg active:scale-[0.98] disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Login'}
              </button>

              <button type="button" className="mx-auto text-sm font-medium text-blue-100 hover:text-white hover:underline">
                Forgot Password?
              </button>
            </form>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-4 text-blue-200">
                <div className="h-px flex-1 bg-white/20"></div>
                <span className="text-xs font-bold uppercase tracking-widest">Or Continue With</span>
                <div className="h-px flex-1 bg-white/20"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl bg-white text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 disabled:opacity-70"
              >
                {googleLoading ? (
                  <Loader2 className="animate-spin text-blue-600" />
                ) : (
                  <>
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google Account
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Info (White) */}
        <div className="hidden w-1/2 flex-col items-center justify-center bg-white p-16 text-center md:flex">
          {/* Decorative Shape */}
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-50"></div>
          
          <div className="relative z-10 max-w-xs">
            <h2 className="text-3xl font-black text-slate-900">New Here?</h2>
            <p className="mt-6 text-base leading-relaxed text-slate-500">
              Get exclusive access to cool features and unlimited benefits. Sign up now and start exploring our new world.
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="mt-10 flex h-14 w-full items-center justify-center rounded-2xl border-2 border-[#0066FF] bg-white text-lg font-bold text-[#0066FF] transition-all hover:bg-[#0066FF] hover:text-white active:scale-[0.98]"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Toggle Link (visible only on mobile) */}
        <div className="flex items-center justify-center bg-[#0066FF] pb-10 md:hidden">
           <p className="text-sm text-blue-100">
              Don't have an account? <Link to="/signup" className="font-bold text-white underline">Sign up here</Link>
           </p>
        </div>
      </div>
    </div>
  )
}
