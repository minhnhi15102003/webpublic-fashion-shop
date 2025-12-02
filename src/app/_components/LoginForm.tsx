// components/LoginForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

type FormData = {
  email: string;
  password: string;
  role?: string;
};

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
   const { refreshCart } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onBlur" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    setError(null);
    setSubmitting(true);
    try {
      await login(data.email, data.password, data.role || "USER");
      // redirect về trang chủ khi thành công
      await refreshCart();
      toast.success("Đăng nhập thành công.")
      router.push("/");
    } catch (e: any) {
      setError(e?.message || "Đăng nhập thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <div className="pt-20">
        <h2 className="text-3xl font-semibold text-center">Account</h2>
        <div className="container">
          <div className="max-w-xl mx-auto">
            <h2 className="font-semibold text-2xl">Sign in</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
              <div className="mb-4">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  placeholder="Email*"
                  type="email"
                  id="email"
                  aria-label="Email"
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email", {
                    required: "Email là bắt buộc",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Email không hợp lệ",
                    },
                  })}
                  className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-red-600" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-4 relative">
                <label htmlFor="password" className="sr-only">
                  Mật khẩu
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  aria-label="Mật khẩu"
                  aria-invalid={errors.password ? "true" : "false"}
                  {...register("password", {
                    required: "Mật khẩu là bắt buộc",
                    minLength: { value: 6, message: "Ít nhất 6 ký tự" },
                  })}
                  className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                  placeholder="Password*"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                  tabIndex={0}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                {errors.password && (
                  <p className="mt-2 text-xs text-red-600" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {error && (
                <div className="mb-4">
                  <p className="text-xs text-red-600" role="alert">
                    {error}
                  </p>
                </div>
              )}

              <div className="flex justify-end mb-5 gap-6">
                  <Link
                  href="/signup"
                  className="text-xs hover:underline"
                >
                  Đăng ký
                </Link>
                <a
                  href="#none"
                  className="text-xs hover:underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full uppercase h-[50px] bg-black text-white font-semibold text-sm px-4 flex-1 rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50"
              >
                <span>{submitting ? "Đang đăng nhập..." : "Đăng nhập"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
