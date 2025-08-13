'use client'
import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/admin' })}
      className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
    >
      Logout
    </button>
  )
}