import React from "react";
import { GoSearch } from "react-icons/go";
import { HiOutlineChevronDown } from "react-icons/hi2";

export default function Header() {
  return (
    <header className="mt-20 ">
      <div className=" flex flex-col-reverse header:flex header:flex-row containerPage:h-[728px]">
        <div className="px-3 bg-[#F4F5FC] header:rounded-br-[8px] header:w-[55%] containerPage:w-[51.3%] lg:px-10 relative">
          <div className="pt-2 mobileNum:pt-6 md:pt-16 containerPage:pt-[168px]">
            <span className="text-[20px] font-xbold text-[#253359] ">
              آماده ای کار کنی!
            </span>
            <h1 className="mt-4 text-[20px] mobileNum:text-[26px] lg:text-[32px] font-xbold header:text-[20px] md:mt-10 text-[#404040]">
              با مکین فضای کار ایده‌آل خود را پیدا کنید
            </h1>
            <p className="mt-5 text-[15px] hidden mobileNum:block text-[#404040] md:mt-10 font-xmedium mobileNum:text-[18px] sm:text-[16px] header:text-[12px] containerPage:w-[105%]">
              فضای کار اشتراکی حرفه‌ای، آرامش‌بخش و دوستانه‌ای را آماده
              ساخته‌ایم تا فراتر از یک محیط کار، در کنار هم رشد کنیم.
            </p>
          </div>
          <div className="flex items-center mx-auto w-11/12 mb-5 mt-4 containerPage:mb-0 md:mt-10 mobileNum:gap-[40px] header:gap-0 header:w-auto sm:flex sm:justify-between sm:items-center md:flex md:items-center shadow-lg lg:pr-1 bg-white rounded-[8px] z-10">
            <details className="dropdown ">
              <summary className="btn text-[10px] lg:mr-1 bg-white border-l-[2px] hover:bg-white shadow-none border-none mobileNum:text-[12.5px] sm:text-[13.5px] header:text-[11px] font-xregular text-[#404040]">
                <div className="flex items-center gap-2 mobileNum:gap-3 leading-5">
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
            <details className="dropdown">
              <summary className="btn text-[10px] lg:mr-1 flex items-center hover:bg-white  bg-white shadow-none border-none mobileNum:text-[12.5px] sm:text-[13.5px] header:text-[11px] font-xregular text-[#404040]">
                <div className="flex items-center gap-2 mobileNum:gap-3 leading-5">
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
            <button className="hidden bg-[#253359] w-[56px] h-[56px] rounded-l-[8px] sm:hidden md:flex md:justify-center md:items-center">
              <GoSearch className="text-white w-6 h-6" />
            </button>
          </div>
        
          <img className="hidden xl:block absolute right-2 bottom-2" src="/imageLanding/bigDot.svg" alt="img" />
          <img className="hidden xl:block absolute left-0 bottom-1" src="/imageLanding/Dot.svg" alt="img" />
        </div>

        <div className="bg-[#253359] mobileNum:bg-white containerPage:bg-[#253359] header:w-[45%] containerPage:w-[48.7%]">
          <img className="" src="/imageLanding/Left.svg" alt="img" />
        </div>
      </div>
    </header>
  );
}
