import Image from "next/image";
import React from "react";
import img_banner from "../../assets/images/banner-1_sysmlz.webp";
const Banner = () => {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={img_banner}
        alt="Banner"
        className="w-full h-auto object-cover"
        priority
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl lg:text-4xl font-bold text-white lg:leading-10 animate-slideInLeft">
          Harmony in Design: <br />
          Blending Form and Function
        </h2>

        <a
          href="#none"
          className="animate-slideInLeft mt-4 lg:mt-8 h-9 border border-white px-7 inline-flex items-center font-semibold text-white rounded-full text-[15px] hover:bg-white hover:text-black transition-all duration-300"
          style={{ animationDelay: "0.3s" }}
        >
          Shop now
        </a>
      </div>
    </section>
  );
};

export default Banner;
