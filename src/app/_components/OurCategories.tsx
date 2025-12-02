import React from "react";
import getCategories from "../_actions/getCategories";

export const OurCategories = async () => {
  const listCategory = await getCategories();

  return (
    <section className="mt-9 lg:mt-14">
      <div className="container">
        <h2 className="text-3xl font-bold text-center">Our Categories</h2>

        <ul className="md:grid grid-cols-2 gap-10 mt-11">
          {listCategory.map((i) => (
            <li key={i.id} className="mt-6 md:mt-0">
              <a href="#none">
                <div className="rounded-lg overflow-hidden">
                  <img className="image" src={i.image} alt={i.image} />
                </div>
                <h3 className="text-2xl uppercase text-center mt-4 font-semibold">{i.name}</h3>
              </a>
            </li>
          ))}
          {/* */}
        </ul>
      </div>
    </section>
  );
};
