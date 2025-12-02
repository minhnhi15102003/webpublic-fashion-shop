import React from "react";
import getCategories from "../_actions/getCategories";

export const ListProductCategory = async () => {
  const listCategory = await getCategories();
  const api = process.env.NEXT_PUBLIC_API_END_POINT || "https://e-commerce-rd5w.onrender.com";
  return (
    <section className="py-6  bg-gray-100">
      {
        listCategory.slice(0, 4).map(({ image, name, id }, index) => (
          <div key={id} className="container mb-6">
            <div className="lg:flex items-center justify-between gap-5">
              {index % 2 === 0 ? (
                <>
                  <div className="lg:w-1/2 flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-bold mb-4 uppercase">{name}</h2>
                    {/* <h2 className="text-3xl font-semibold py-4 lg:py-6 leading-[1.4] whitespace-pre-line">
                      {description}
                    </h2> */}
                    <a
                      href="#none"
                      className="h-9 border border-black px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-black hover:text-white transition-all duration-300"
                    >
                      Khám phá
                    </a>
                  </div>
                  <div className="lg:w-1/2 rounded-2xl overflow-hidden mt-6 lg:mt-0 flex justify-center">
                    <img className="image" src={`${api}/${image}`} alt={name} />
                  </div>
                </>
              ) : (
                <>
                  <div className="lg:w-1/2 rounded-2xl overflow-hidden mt-6 lg:mt-0 flex justify-center">
                    <img className="image" src={`${api}/${image}`} alt={name} />
                  </div>
                  <div className="lg:w-1/2 flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-bold mb-4 uppercase">{name}</h2>
                    {/* <h2 className="text-3xl font-semibold py-5 lg:py-5 leading-[1.4] whitespace-pre-line">
                      {description}
                    </h2> */}
                    <a
                      href="#none"
                      className="h-9 border border-black px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-black hover:text-white transition-all duration-300"
                    >
                      Khám phá
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
    </section>
  );
};
