import { useState } from "react";
import type { MenuItem } from "../../../types";
import { formatNumber } from "../../../utils";

interface Props {
  menuItem: MenuItem;
}

export default function MenuItemComponent({ menuItem }: Props) {
  const price = formatNumber(menuItem.price);

  return (
    <div className="space-y-4 snap-center snap-item">
      <article className="flex flex-col items-center space-x-2 h-[85dvh] ">
        <figure className="relative flex flex-col items-center justify-center flex-[1_1_60%] md:flex-[1_1_50%] scale-[110%] lg:scale-[116%]">
          <img
            src={menuItem.image}
            alt={menuItem.name}
            className="w-full h-auto object-cover"
          />
        </figure>

        <div className="self-center flex flex-col items-center flex-[1_1_40%] md:flex-[1_1_50%]">
          <h2 className="font-semibold text-[16px] md:text-[28px]">
            {menuItem.name}
          </h2>
          <p className="text-muted text-[14px] md:text-[20px] text-center lg:px-20">
            {menuItem.description}
          </p>

          <div className="bg-category rounded-lg h-[1px] my-2 min-w-[200px] max-w-[206px]"></div>
          <p className="text-[14px] md:text-[25px] font-semibold">{price}</p>
        </div>
      </article>

      {menuItem.additions.length > 0 && (
        <div className="space-y-2">
          <h2 className="font-semibold text-[16px] md:text-[25px]">
            Дополнение
          </h2>
          <div className="space-y-1">
            {menuItem.additions.map((addition) => (
              <div
                key={addition.name}
                className="flex items-center justify-between"
              >
                <p className="text-[16px] md:text-[25px]">{addition.name}</p>

                <div className="flex items-center space-x-2">
                  {addition.weight && (
                    <>
                      <span className="text-[16px] md:text-[25px]">
                        {addition.weight}
                      </span>
                      <span className="block bg-category w-2 h-2 rounded-full" />
                    </>
                  )}
                  <p className="text-[16px] md:text-[25px]">
                    {formatNumber(addition.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
