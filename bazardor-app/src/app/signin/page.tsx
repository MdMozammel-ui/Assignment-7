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
  const [googleLoading, setGoogleLoading] = useState(false);
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

  async function handleGoogleSignin() {
    setMessage("");
    setGoogleLoading(true);

    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL,
      });

      if (result.error) {
        setMessage(
          result.error.message || "Google দিয়ে লগইন করা যায়নি।"
        );
        setGoogleLoading(false);
      }
    } catch {
      setMessage("Google দিয়ে লগইন করা যায়নি। আবার চেষ্টা করো।");
      setGoogleLoading(false);
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
            disabled={loading || googleLoading}
            className="w-full rounded-lg bg-[#ccff00] px-4 py-3 font-bold text-black transition hover:bg-[#b8e600] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "লগইন হচ্ছে..." : "লগইন করো"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignin}
          disabled={loading || googleLoading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/15 bg-[#0b0d0c] px-4 py-3 font-medium text-white transition hover:border-[#ccff00] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {googleLoading ? (
            "Google-এ সংযোগ হচ্ছে..."
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 38.05 46.98 31.93 46.98 24.55Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                />
              </svg>
              Google দিয়ে লগইন করো
            </>
          )}
        </button>

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