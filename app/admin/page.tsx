'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })
    setLoading(false)
    if (res?.error) {
      setError('Invalid credentials')
    } else {
      router.push('/admin/dashboard')
    }
  }

  return (
   <main className='flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'>
    <div className="w-full max-w-sm">
      <div className='rounded-2xl bg-white/20 backdrop-blur-lg shadow-2xl'>
        <form onSubmit={handleSubmit} className='space-y-6 p-8'>
          <h1 className='bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-center text-3xl font-bold text-transparent'>
            Admin Login
          </h1>
          {error && (
            <p className='text-center text-sm font-medium text-red-200'>
              {error}
            </p>
          )}
          <input
          type="email"
          placeholder="name email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='w-full rounded-lg border border-transparent bg-white/10 px-4 py-2.5 text-white placeholder-white/70 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400'
          />
          <input
          type='password'
          placeholder='********'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='w-full rounded-lg border border-transparent bg-white/10 px-4 py-2.5 text-white placeholder-white/70 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400'
          />
              <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 px-4 py-2.5 font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <svg className="h-5 w-5 animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
        </form>
      </div>
    </div>
   </main>
  )
}