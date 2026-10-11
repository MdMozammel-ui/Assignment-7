
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [callbackURL, setCallbackURL] = useState("/");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reason = params.get("reason");
    const requestedURL = params.get("callbackURL");

    if (
      requestedURL &&
      requestedURL.startsWith("/") &&
      !requestedURL.startsWith("//")
    ) {
      setCallbackURL(requestedURL);
    }

    if (reason === "auth-required") {
      // URL থেকে reason সরিয়ে দেওয়ার পর Toast দেখাও।
      params.delete("reason");

      const query = params.toString();
      const newURL =
        window.location.pathname +
        (query ? `?${query}` : "") +
        window.location.hash;

      window.history.replaceState(window.history.state, "", newURL);

      toast("এই পেজটি দেখতে আগে লগইন করো।", {
        icon: "🔐",
        id: "auth-required",
      });
    }
  }, []);

  async function handleSignin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL,
      });

      if (result.error) {
        setMessage(
          result.error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
        );
        return;
      }

      // আগের সতর্কবার্তা সরিয়ে Success Toast দেখাও।
      toast.dismiss("auth-required");

      toast.success("সফলভাবে লগইন হয়েছে!", {
        id: "signin-success",
      });

      router.replace(callbackURL);
      router.refresh();
    } catch {
      setMessage("লগইন করা যায়নি। আবার চেষ্টা করো।");
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
            আবার <span className="text-[#ccff00]">ফিরে এসো</span>
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            তোমার অ্যাকাউন্টে লগইন করো
          </p>
        </div>

        <form onSubmit={handleSignin} className="space-y-4">
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
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="তোমার পাসওয়ার্ড"
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
            {loading ? "লগইন হচ্ছে..." : "লগইন করো"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#ccff00] hover:underline"
          >
            রেজিস্ট্রেশন করো
          </Link>
        </p>
      </div>
    </main>
  );
}
