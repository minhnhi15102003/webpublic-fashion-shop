// components/RegisterForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

type FormData = {
  email: string;
  userName: string;
  password: string;
  name: string;
  phone: string;
};

export function RegisterForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormData>({ mode: "onBlur" });
  const router = useRouter();
  const { signup } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    console.log(data, "data");

    setError(null);
    setSubmitting(true);
    try {
      await signup(
        data.email,
        data.password,
        data.userName,
        data.phone,
        data.name
      );
      // có thể redirect hoặc hiển thị thành công ở đây
      toast.success("Đăng ký thành công");
      router.push("/login");
    } catch (e: any) {
      setError(e?.message || "Đăng ký thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="max-w-md mx-auto">
      <div className="pt-16">
        <h2 className="text-3xl font-semibold text-center mb-4">
          Tạo tài khoản
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 bg-white border border-gray-200 rounded-lg p-8 shadow"
        >
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email*"
              aria-label="Email"
              {...register("email", {
                required: "Email là bắt buộc",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email không hợp lệ",
                },
              })}
              className={clsx(
                "w-full px-4 py-4 border rounded-lg text-sm transition outline-none",
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-black"
              )}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div className="relative">
            <input
              type="text"
              placeholder="Username*"
              aria-label="Username"
              {...register("userName", {
                required: "Username là bắt buộc",
                minLength: { value: 3, message: "Tối thiểu 3 ký tự" },
              })}
              className={clsx(
                "w-full px-4 py-4 border rounded-lg text-sm transition outline-none",
                errors.userName
                  ? "border-red-500"
                  : "border-gray-300 focus:border-black"
              )}
            />
            {errors.userName && (
              <p className="mt-1 text-xs text-red-600">
                {errors.userName.message}
              </p>
            )}
          </div>

          {/* Name */}
          <div className="relative">
            <input
              type="text"
              placeholder="Họ và tên*"
              aria-label="Name"
              {...register("name", {
                required: "Tên là bắt buộc",
              })}
              className={clsx(
                "w-full px-4 py-4 border rounded-lg text-sm transition outline-none",
                errors.name
                  ? "border-red-500"
                  : "border-gray-300 focus:border-black"
              )}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="relative">
            <input
              type="tel"
              placeholder="Số điện thoại*"
              aria-label="Phone"
              {...register("phone", {
                required: "Số điện thoại là bắt buộc",
                pattern: {
                  value: /^[0-9()+\- ]{6,20}$/,
                  message: "Số điện thoại không hợp lệ",
                },
              })}
              className={clsx(
                "w-full px-4 py-4 border rounded-lg text-sm transition outline-none",
                errors.phone
                  ? "border-red-500"
                  : "border-gray-300 focus:border-black"
              )}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu*"
                aria-label="Password"
                {...register("password", {
                  required: "Mật khẩu là bắt buộc",
                  minLength: { value: 6, message: "Ít nhất 6 ký tự" },
                })}
                className={clsx(
                  "w-full px-4 py-4 border rounded-lg text-sm transition outline-none",
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 focus:border-black"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="ml-2 text-xs font-medium text-blue-600 hover:underline"
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex justify-center items-center gap-2 p-3 bg-black text-white font-semibold rounded-lg uppercase text-sm shadow hover:opacity-90 transition disabled:opacity-50"
          >
            {submitting && (
              <svg
                className="w-5 h-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            <span>{submitting ? "Đang đăng ký..." : "Đăng ký"}</span>
          </button>

          <div className="text-center text-sm text-gray-500">
            Đã có tài khoản?{" "}
            <a href="/login" className="text-black font-medium hover:underline">
              Đăng nhập
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
