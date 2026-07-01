"use client";
import  Link  from 'next/link';
import { signOut, useSession } from 'next-auth/react';
const UserLinks = () => {
    const { status} = useSession();
  return (
    <div>
      {status === "authenticated" ? (
        <>
          <Link href="/orders" className="text-zinc-300 hover:text-yellow-500 transition font-medium">
            Orders
          </Link>
          <span className= "text-zinc-300 hover:text-yellow-500 transition font-medium ml-4 cursor-pointer " onClick={() => signOut()}>
            logout
          </span>
        </>
      ) : (
        <Link href="/login" className="text-zinc-300 hover:text-yellow-500 transition font-medium">
          Login
        </Link>
      )}
    </div>
  )
}

export default UserLinks