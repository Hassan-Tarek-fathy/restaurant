"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const {data, status} = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return null;
  }
  return (
    <section className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-9rem)] bg-zinc-950 flex items-center justify-center py-10 px-6">
      <div className="max-w-6xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">

        {/* IMAGE */}
        <div className="relative hidden md:block">
          <Image
            src="/temporary/p9.png"
            alt="Boss Burger"
            fill
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/55 flex flex-col justify-end p-10">
            <span className="uppercase tracking-[5px] text-yellow-500 text-sm">
              Boss Burger
            </span>

            <h1 className="text-5xl font-black text-white mt-3">
              Welcome Back!
            </h1>

            <p className="text-zinc-300 mt-4 leading-8">
              Order your favorite burgers, track your deliveries,
              and enjoy exclusive offers made just for you.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="flex flex-col justify-center p-10 lg:p-14">

          <h2 className="text-4xl font-black text-white">
            Sign In
          </h2>

          <p className="text-zinc-400 mt-3 leading-7">
            Continue with your favorite social account.
          </p>

          <div className="mt-10 space-y-5">

            {/* Google */}
            <button onClick={() => signIn("google")} className="w-full flex items-center justify-center gap-4 rounded-2xl border border-zinc-700 bg-zinc-800 py-4 text-white transition hover:border-yellow-500 hover:bg-zinc-700">
              <Image
                src="/google.png"
                alt="Google"
                width={24}
                height={24}
              />

              <span className="font-semibold">
                Continue with Google
              </span>
            </button>

            {/* Facebook */}
            <button className="w-full flex items-center justify-center gap-4 rounded-2xl border border-zinc-700 bg-zinc-800 py-4 text-white transition hover:border-yellow-500 hover:bg-zinc-700">
              <Image
                src="/facebook.png"
                alt="Facebook"
                width={24}
                height={24}
              />

              <span className="font-semibold">
                Continue with Facebook
              </span>
            </button>
          </div>

          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-zinc-700"></div>
            <span className="px-4 text-zinc-500 text-sm">
              OR
            </span>
            <div className="flex-1 border-t border-zinc-700"></div>
          </div>

          <button className="w-full rounded-2xl bg-yellow-500 py-4 text-lg font-bold text-black transition-all duration-300 hover:bg-yellow-400 hover:scale-[1.02] shadow-lg shadow-yellow-500/20">
            Continue as Guest
          </button>

          <p className="mt-8 text-center text-zinc-400">
            Need help?{" "}
            <Link
              href="/contact"
              className="text-yellow-500 hover:text-yellow-400 font-semibold"
            >
              Contact Us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;