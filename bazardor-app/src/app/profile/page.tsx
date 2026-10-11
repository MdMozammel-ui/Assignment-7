"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session?.user?.name]);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin?callbackURL=%2Fprofile");
    }
  }, [isPending, session, router]);

  async function handleUpdateName(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("তোমার নাম লিখো।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        toast.error(result.error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      toast.success("তোমার নাম আপডেট হয়েছে!");
      router.refresh();
    } catch {
      toast.error("নাম আপডেট করা যায়নি। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  if (isPending || !session) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#0b0d0c] text-white">
        <p className="text-gray-400">প্রোফাইল লোড হচ্ছে...</p>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] bg-[#0b0d0c] px-4 py-12 text-white">
      <div className="mx-auto w-full max-w-xl">
        <Link
          href="/"
          className="text-sm text-gray-400 transition hover:text-[#ccff00]"
        >
          ← বাজার দর-এ ফিরে যাও
        </Link>

        <section className="mt-6 rounded-2xl border border-white/10 bg-[#121513] p-6 sm:p-8">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 text-3xl">
              👤
            </div>

            <h1 className="text-3xl font-bold">
              My <span className="text-[#ccff00]">Profile</span>
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              তোমার অ্যাকাউন্টের তথ্য দেখো ও নাম পরিবর্তন করো।
            </p>
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm text-gray-300">
              ইমেইল
            </label>
            <div className="break-all rounded-lg border border-white/10 bg-[#0b0d0c] px-4 py-3 text-gray-400">
              {session.user.email}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              ইমেইল এখানে পরিবর্তন করা যাবে না।
            </p>
          </div>

          <form onSubmit={handleUpdateName} className="space-y-4">
            <div>
              <label htmlFor="profile-name" className="mb-2 block text-sm">
                তোমার নাম
              </label>

              <input
                id="profile-name"
                type="text"
                autoComplete="name"
                required
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="তোমার নাম লিখো"
                className="w-full rounded-lg border border-white/10 bg-[#0b0d0c] px-4 py-3 outline-none transition focus:border-[#ccff00]"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full rounded-lg bg-[#ccff00] px-4 py-3 font-bold text-black transition hover:bg-[#b8e600] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "আপডেট হচ্ছে..." : "নাম আপডেট করো"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}