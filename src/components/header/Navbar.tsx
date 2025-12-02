"use client";
import Image from "next/image";
import React from "react";
import logo from "../../assets/images/logo.webp";
import ico_search from "../../assets/images/ico_search.png";
import ico_user from "../../assets/images/ico_user.png";
import ico_heart from "../../assets/images/ico_heart.png";
import ico_bag from "../../assets/images/ico_bag.png";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AccountMenu from "./Accout";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { menuItems } from "@/constants/MenuItem";
import { MenuItem } from "@/types/MenuItem";

const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated} = useAuth();
  const { cartCount, loading } = useCart();
  const visibleMenuItems = menuItems.filter(item => {
    return !item.requiresAuth || isAuthenticated;
  });
  return (
    <header className="py-5 lg:py-8 sticky top-0 z-10 bg-white shadow-lg">
      <div className="container flex items-center">
        <h1 className="flex-shrink-0 mr-5">
          <a className="block max-w-[130px]" href="/">
            <Image src={logo} alt="Logo joyme" />
          </a>
        </h1>

        <div className="relative ml-auto lg:mr-20 max-w-[500px] w-full hidden xl:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span>
              <Image className="size-5" src={ico_search} alt="" />
            </span>
          </div>
        </div>

        <nav className="mr-28 hidden lg:block ml-auto">
          <ul className="flex items-center gap-10">
            {visibleMenuItems.map((item: MenuItem) => (
              <li
                key={item.label}
                className={`relative after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[-2px] after:transition-all after:duration-300 after:w-full after:scale-x-0 hover:after:-scale-x-100 ${
                  pathname === item.href ? "font-semibold" : ""
                }`}
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-6 ml-auto lg:ml-0 shrink-0">
          <a href="#none" className="lg:hidden">
            <Image className="size-5" src={ico_search} alt="" />
          </a>
          {isAuthenticated ? (
            <AccountMenu />
          ) : (
            <a href="/login">
              <Image className="size-5" src={ico_user} alt="" />
            </a>
          )}

          <a href="#none" className="relative">
            {/* <span className="absolute -top-[8px] -right-[10px] size-[18px] bg-black text-white rounded-full text-xs grid place-items-center">
              10
            </span> */}

            <Image className="size-5" src={ico_heart} alt="" />
          </a>
          <Link href={isAuthenticated ? "/shopping-cart" : "/login"} className="relative">
            {!loading && cartCount > 0 && (
              <span className="absolute -top-[8px] -right-[10px] size-[18px] bg-black text-white rounded-full text-xs grid place-items-center">
                {cartCount}
              </span>
            )}
            <Image className="size-5" src={ico_bag} alt="" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
