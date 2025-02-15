import React, { useState } from "react";
import { FaCaretLeft } from "react-icons/fa";
import { PiChecks } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";

export default function Notifications() {
  const item = [
    { id: 1, text: " همه " },
    { id: 2, text: " کیف پول " },
    { id: 3, text: " اطلاعیه " },
  ];
  const [select, setSelect] = useState(1);

  const notif = [
    {
      id: 1,
      title: " تعطیلی مکین در  تاریخ  ۱۴۰۳/۱۱/۹ ",
      date: " ۱۴۰۳/۱۰/۲۲ ",
      time: " ۱۸:۱۹ ",
      text: " مکین در این تاریخ تعطیل می باشد ",
    },
    {
      id: 2,
      title: " تعطیلی مکین در  تاریخ  ۱۴۰۳/۱۱/۹ ",
      date: " ۱۴۰۳/۱۰/۲۲ ",
      time: " ۱۸:۱۹ ",
      text: " مکین در این تاریخ تعطیل می باشد ",
    },
    {
      id: 3,
      title: " تعطیلی مکین در  تاریخ  ۱۴۰۳/۱۱/۹ ",
      date: " ۱۴۰۳/۱۰/۲۲ ",
      time: " ۱۸:۱۹ ",
      text: " مکین در این تاریخ تعطیل می باشد ",
    },
    {
      id: 4,
      title: " تعطیلی مکین در  تاریخ  ۱۴۰۳/۱۱/۹ ",
      date: " ۱۴۰۳/۱۰/۲۲ ",
      time: " ۱۸:۱۹ ",
      text: " مکین در این تاریخ تعطیل می باشد ",
    },
    {
      id: 5,
      title: " تعطیلی مکین در  تاریخ  ۱۴۰۳/۱۱/۹ ",
      date: " ۱۴۰۳/۱۰/۲۲ ",
      time: " ۱۸:۱۹ ",
      text: " مکین در این تاریخ تعطیل می باشد ",
    },
    {
      id: 6,
      title: " تعطیلی مکین در  تاریخ  ۱۴۰۳/۱۱/۹ ",
      date: " ۱۴۰۳/۱۰/۲۲ ",
      time: " ۱۸:۱۹ ",
      text: " مکین در این تاریخ تعطیل می باشد ",
    },
  ];

  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-8 lg:bg-white h-screen rounded-lg">
      <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:mt-6 lg:pt-4 lg:text-right lg:flex lg:items-center">
        <FaCaretLeft className="w-6 h-6 hidden lg:block" />
        اعلان ها
      </h1>
      <div className="flex items-start mt-4 lg:mt-6 justify-between md:px-10">
        <ul className="[&>li>a]:flex [&>li>a]:items-center  text-[#CBCBCB] text-[14px]  font-xbold flex items-center gap-[12.5px] md:gap-10 ">
          {item.map((item) => (
            <li key={item.id}>
              <a
                href="#"
                className={`${
                  select === item.id
                    ? "text-[#44C0ED] underline underline-offset-[15px] decoration-2"
                    : "text-[#CBCBCB]"
                }`}
                onClick={() => setSelect(item.id)}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
        <button className="flex items-center border border-[#253359] rounded-md py-1 px-2 gap-2 text-[12px] font-xmedium">
          <PiChecks className="w-6 h-6" />
          خواندن همه
        </button>
      </div>

      <div className="mt-4 border border-[#DFDFDF] rounded-lg md:mx-10">
        {notif.map((item) => (
          <div className="border-b border-[#CBCBCB] odd:bg-[#F9F9F9] even:bg-white py-4 pr-4 gap-4 pl-6 flex items-center">
            <div className="w-[10px] h-[10px] bg-[#E9594C] rounded-full"></div>
            <div className="w-full">
              <div className="md:flex md:items-center justify-between">
                <h1 className="text-[#253359] text-[16px] font-xbold md:pb-2">
                  {item.title}
                </h1>
                <div className="flex items-center text-[#ADADAD] text-[12px] font-xbold gap-2 pt-2 md:pt-0">
                  <span>{item.time}</span>
                  <span>{item.date}</span>
                </div>
              </div>
              <span className="text-[#404040] font-xregular text-[14px]">
                {item.text}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <span className="flex items-center justify-center text-[#253359] text-[14px] font-xbold mt-4"> <IoIosArrowDown className="w-5 h-5" />مشاهده بیشتر  </span>
      </div>
    </div>
  );
}
