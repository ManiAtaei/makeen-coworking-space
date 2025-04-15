import React, { useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { TbCircleDashedCheck } from "react-icons/tb";
import { TbCircleDashedX } from "react-icons/tb";
import { FaCaretLeft } from "react-icons/fa";
import Table from "./Table";

export default function ReservationManagement() {
  const item = [
    { id: 1, text: " جاری ", icon: <TbCircleDashed size={24} /> },
    { id: 2, text: " پایان یافته  ", icon: <TbCircleDashedCheck size={24} /> },
    { id: 3, text: " لغو شده  ", icon: <TbCircleDashedX size={24} /> },
  ];
  const [select, setSelect] = useState(1);

  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-8 lg:bg-white h-screen rounded-lg">
      <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:mt-6 lg:pt-4 lg:text-right lg:flex lg:items-center">
        <FaCaretLeft className="w-6 h-6 hidden lg:block" />
        اعلان ها
      </h1>
      <div className="flex items-start mt-4 lg:mt-6 justify-between ">
        <ul className="[&>li>a]:flex [&>li>a]:items-center [&>li>a]:gap-2  text-[#CBCBCB] text-[14px]  font-xbold flex items-center gap-[12.5px] md:gap-10 ">
          {item.map((item) => (
            <li key={item.id}>
              <a
                href="#"
                className={`${
                  select === item.id
                    ? "text-[#44C0ED] underline underline-offset-[10px] decoration-2"
                    : "text-[#CBCBCB]"
                }`}
                onClick={() => setSelect(item.id)}
              >
                {item.icon}
                <div className="md:flex md:items-center ">
                  <span className="hidden md:block">
                    رزروهای
                  </span>
                  <span>{item.text}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <hr className="hidden text-[#DFDFDF] md:block md:mt-1" />
      <div className="mt-4 md:mt-6">
        <Table />
      </div>
    </div>
  );
}

