"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ShieldCheck, Mail, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    if (res?.ok) router.push("/admin/dashboard");
    else setError("Email atau kata sandi salah");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl p-8 space-y-6">
          {/* Icon Header */}
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500">
              <ShieldCheck className="h-12 w-12 text-white" />
            </div>
          </div>

          <h1 className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-center text-3xl font-bold text-transparent">
            Admin Login
          </h1>

          {error && (
            <p className="text-center text-sm font-medium text-red-300">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg bg-white/10 pl-10 pr-4 py-3 text-white placeholder-white/60 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
              <input
                type={show ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg bg-white/10 pl-10 pr-12 py-3 text-white placeholder-white/60 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-indigo-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white mx-auto" />
              ) : (
                "Masuk"
              )}
            </button>
          </form>

          <p className="text-center text-xs text-white/60">
            Masukkan kredensial admin untuk melanjutkan.
          </p>
        </div>
      </div>
    </main>
  );
}