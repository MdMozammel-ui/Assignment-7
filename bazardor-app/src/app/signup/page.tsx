
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        setMessage(
          result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।"
        );
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setMessage("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#0b0d0c] px-4 py-12 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#121513] p-6 sm:p-8">
        <Link href="/" className="text-sm text-gray-400 hover:text-[#ccff00]">
          ← বাজার দর-এ ফিরে যাও
        </Link>

        <div className="mb-7 mt-6 text-center">
          <div className="mb-3 text-4xl">🛒</div>
          <h1 className="text-3xl font-bold">
            অ্যাকাউন্ট <span className="text-[#ccff00]">খোলো</span>
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            বাজারদরের আপডেট পেতে যোগ দাও
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm">
              তোমার নাম
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="পুরো নাম লেখো"
              className="w-full rounded-lg border border-white/10 bg-[#0b0d0c] px-4 py-3 outline-none focus:border-[#ccff00]"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm">
              ইমেইল
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-white/10 bg-[#0b0d0c] px-4 py-3 outline-none focus:border-[#ccff00]"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full rounded-lg border border-white/10 bg-[#0b0d0c] px-4 py-3 outline-none focus:border-[#ccff00]"
            />
          </div>

          {message && (
            <p role="alert" className="text-sm text-red-400">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#ccff00] px-4 py-3 font-bold text-black transition hover:bg-[#b8e600] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করো"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-[#ccff00] hover:underline"
          >
            লগইন করো
          </Link>
        </p>
      </div>
    </main>
  );
}
