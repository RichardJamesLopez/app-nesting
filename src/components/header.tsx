"use client";

import { useSession, signIn, signOut } from "next-auth/react";

import { Button } from "~/components/ui/button";

export function Header() {
  const { data: session } = useSession();

  const username = session?.user.name;

  return (
    <header className="absolute top-0 h-10 w-full border-b">
      {username && <span>Hi, {username}</span>}
      {session ? (
        <Button onClick={() => signOut()}>sign out</Button>
      ) : (
        <Button onClick={() => signIn()}>sign in</Button>
      )}
    </header>
  );
}
