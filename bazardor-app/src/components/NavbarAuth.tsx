
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function NavbarAuth() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error("লগআউট করা যায়নি। আবার চেষ্টা করো।");
        return;
      }

      toast.success("সফলভাবে লগআউট হয়েছে!");
      router.refresh();
      router.push("/");
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    }
  }

  if (isPending) {
    return (
      <div className="auth-actions" aria-label="অ্যাকাউন্ট লোড হচ্ছে">
        <span className="text-sm text-gray-400">লোড হচ্ছে...</span>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="auth-actions">
        <Link href="/profile" className="btn btn-outline">
          {session.user.name || "আমার প্রোফাইল"}
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          className="btn btn-primary"
        >
          সাইন আউট
        </button>
      </div>
    );
  }

  return (
    <div className="auth-actions">
      <Link href="/signin" className="btn btn-outline">
        সাইন ইন
      </Link>

      <Link href="/signup" className="btn btn-primary">
        সাইন আপ
      </Link>
    </div>
  );
}
