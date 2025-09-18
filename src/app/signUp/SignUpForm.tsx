"use client";

import { useSession } from "next-auth/react";

export default function SignUpForm() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not signed in.</p>;
  }

  return (
    <div>
      <p>Welcome, {session.user?.name}</p>
      <p>Email: {session.user?.email}</p>
    </div>
  );
}
