import React from "react";
import { GoSearch } from "react-icons/go";
import { HiOutlineChevronDown } from "react-icons/hi2";

export default function Header() {
  return (
    <header className="mt-20 ">
      <div className="flex h-[728px]">
        <div className="bg-[#F4F5FC] w-[51.3%] px-10 relative">
          <div className="pt-[168px]">
            <span className="text-[20px] font-xbold text-[#253359] ">
              آماده ای کار کنی!
            </span>
            <h1 className="text-[32px] font-xbold mt-10 text-[#404040]">
              با مکین فضای کار ایده‌آل خود را پیدا کنید
            </h1>
            <p className="text-[#404040] mt-10 font-xmedium text-[16px] w-[105%]">
              فضای کار اشتراکی حرفه‌ای، آرامش‌بخش و دوستانه‌ای را آماده
              ساخته‌ایم تا فراتر از یک محیط کار، در کنار هم رشد کنیم.
            </p>
          </div>
          <div className="flex items-center mt-10 gap-[40px] shadow-lg pr-1 bg-white rounded-[8px] z-10">
            <details className="dropdown ">
              <summary className="btn mr-1 bg-white border-l-[2px] hover:bg-white shadow-none border-none text-[14px] font-xregular text-[#404040]">
                <div className="flex items-center gap-4">
                  نوع اشتراک را انتخاب نمایید
                  <HiOutlineChevronDown className="w-6 h-6" />
                </div>
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-[8px] mt-[6px] z-[1] w-52 p-2 shadow">
                <li>
                  <a> صندلی روزانه </a>
                </li>
                <li>
                  <a> اتاق جلسات </a>
                </li>
              </ul>
            </details>
            <details className="dropdown ">
              <summary className="btn mr-1 flex items-center hover:bg-white  bg-white shadow-none border-none text-[14px] font-xregular text-[#404040]">
                <div className="flex items-center gap-4">
                  تاریخ را انتخاب نمایید
                  <HiOutlineChevronDown className="w-6 h-6" />
                </div>
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-[8px] mt-[6px] z-[1] w-52 p-2 shadow">
                <li>
                  <a> صندلی روزانه </a>
                </li>
                <li>
                  <a> اتاق جلسات </a>
                </li>
              </ul>
            </details>
            <button className="bg-[#253359] w-[56px] h-[56px] rounded-l-[8px] flex items-center justify-center">
              <GoSearch className="text-white w-6 h-6" />
            </button>
          </div>
        
          <img className="absolute right-2 bottom-2" src="/imageLanding/bigDot.svg" alt="img" />
          <img className="absolute left-0 bottom-1" src="/imageLanding/Dot.svg" alt="img" />
        </div>

        <div className="bg-[#253359] w-[48.7%]">
          <img src="/imageLanding/Left.svg" alt="img" />
        </div>
      </div>
    </header>
  );
}
