// app/login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoginForm } from "../_components/LoginForm";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);



  return (
    <div className="p-8">
      <LoginForm />
    </div>
  );
}
