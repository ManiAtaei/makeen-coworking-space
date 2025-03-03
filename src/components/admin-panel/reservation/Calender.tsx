import React, { useState } from "react";
import { FaCaretLeft } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export default function Calender() {
  const item = [
    { id: 1, text: " صندلی اشتراکی " },
    { id: 2, text: " اتاق جلسات " },
  ];
  const [select, setSelect] = useState(1);
  const months = [
    { name: "فروردین", days: "۰ رزرو" },
    { name: "اردیبهشت", days: "۱ رزرو" },
    { name: "خرداد", days: "۵ رزرو" },
    { name: "تیر", days: "۱۱ رزرو" },
    { name: "مرداد", days: "۰ رزرو" },
    { name: "شهریور", days: "۱ رزرو" },
    { name: "مهر", days: "۲۰ رزرو" },
    { name: "آبان", days: "۸ رزرو" },
    { name: "آذر", days: "۱۴ رزرو" },
    { name: "دی", days: "۱۰ رزرو" },
    { name: "بهمن", days: "۰ رزرو" },
    { name: "اسفند", days: "۰ رزرو" },
  ];

  const weekDays = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
  ];
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const [selectedDays, setSelectedDays] = useState([]);

  const handleDaySelect = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else if (selectedDays.length < 5) {
      setSelectedDays([...selectedDays, day].sort((a, b) => a - b));
    }
  };
  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-6 lg:bg-white h-full rounded-lg">
      <div className="flex items-center gap-6 ">
        <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:mt-6 lg:pt-4 lg:text-right lg:flex lg:items-center">
          <FaCaretLeft className="w-6 h-6 hidden lg:block" />
          سوابق رزرو کاربر
        </h1>
        <ul className="[&>li>a]:flex [&>li>a]:items-center [&>li>a]:gap-2 mt-6 text-[#CBCBCB] text-[12px] md:text-[14px] font-xbold flex items-center gap-[52px]  ">
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
      </div>
      <hr className=" text-[#DFDFDF] w-full max-w-[217px] mr-40 " />
      <div className="flex flex-col mx-auto mt-4 border-[#CBCBCB] border rounded-2xl w-full max-w-[797px]">
        <div className=" flex items-start ">
          <div className="w-full max-w-[272px] mt-4 mx-4">
            <h2 className="text-[16px] font-xbold text-center bg-[#ECF9FD] py-[12px] rounded-lg text-[#253359]">
              سال ۱۴۰۳
            </h2>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
              {months.map((month) => (
                <div
                  key={month.name}
                  className={`flex justify-between items-center rounded py-[6px] px-2 border border-[#ADADAD] font-xregular text-[#202020] max-w-[128px] w-full `}
                >
                  <span className="text-[14px] ">{month.name}</span>
                  <span className={`px-2 py-1 rounded text-[12px]`}>
                    {month.days}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full max-w-[457px] border-r border-e-red-600 pr-4 mx-auto pt-4 px-4 pb-5">
            {/* Week days */}
            <div className="grid grid-cols-7 px-[13px] gap-[7px] bg-[#ECF9FD] py-[15px] rounded-lg">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center text-[12px] font-xregular"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2 px-[13px] w-full mt-6">
              {daysInMonth.map((day) => (
                <div
                  key={day}
                  onClick={() => handleDaySelect(day)}
                  className={` h-[56px] w-[56px] text-center place-content-center text-[#404040] text-[14px] font-xbold cursor-pointer rounded-[4px] transition-colors hover:border hover:border-[#474747]
                          ${
                            selectedDays.includes(day)
                              ? "bg-[#B4E6F8] text-[#404040]"
                              : ""
                          }
                          ${
                            day === 5 || day === 12 || day === 19 || day === 26
                              ? "bg-[#F4F5FC] text-[#CBCBCB]"
                              : ""
                          }`}
                >
                  {day}
                  {day === 19 && (
                    <div className="text-[10px] font-xbold text-[#404040]">
                      تعطیل
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="text-[#CBCBCB] " />
        <div className="flex gap-4 my-4 text-[#202020] text-[10px] font-xregular pr-5">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#69CDF1] rounded"></div>
              <span> روز رزرو شده کاربر </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#F4F5FC] border border-[#DFDFDF] rounded"></div>
              <span>  تعطیل </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-[18px] bg-[#FFD7C6] rounded border border-[#FF9568]"></div>
              <span> تعداد ساعات رزرو شده در ماه </span>
            </div>
          </div>
      </div>
    </div>
  );
}
