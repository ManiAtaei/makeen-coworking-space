import React from "react";
import { GoSearch } from "react-icons/go";


export default function Header() {
  return (
    <header className="mt-[74px] w-full">
      <div className=" flex flex-col-reverse lg:flex lg:flex-row containerPage:max-h-[728px] w-full ">
        <div className='bg-[url("/iconLanding/homepagescreen.svg")] h-[392px] bg-no-repeat bg-cover lg:bg-none'>
          <div className="px-8 header:rounded-br-[8px] lg:pl-[26px] lg:pr-20 max-w-[560px] mx-auto lg:bg-[#F4F5FC] lg:max-w-[720px] relative lg:h-[728px] lg:w-full">
            <div className="pt-2 lg:pt-[168px]">
              <span className="text-[20px] font-xbold text-[#253359] hidden lg:block">
                آماده ای کار کنی!
              </span>
              <h1 className="mt-10 text-white text-center text-[20px] mobileNum:text-[26px] lg:text-[32px] font-xbold lg:text-[#404040] lg:text-right">
                با مکین فضای کار ایده‌آل خود را پیدا کنید
              </h1>
              <p className="mt-5 text-[16px] hidden lg:block text-[#404040] md:mt-8 font-xmedium lg:w-[102%]">
                فضای کار اشتراکی حرفه‌ای، آرامش‌بخش و دوستانه‌ای را آماده
                ساخته‌ایم تا فراتر از یک محیط کار، در کنار هم رشد کنیم.
              </p>
            </div>
            <div className="flex-col lg:flex lg:flex-row lg:justify-between text-center items-center h-[208px] lg:h-auto mb-5 mt-9 lg:mt-10 lg:mb-0 shadow-lg bg-white rounded-[12px] relative z-10 p-4">
              <details className="dropdown w-[99%] lg:max-w-[220px]">
                <summary className="py-[12.5px] text-[14px] lg:mr-1 bg-white hover:bg-white shadow-none flex items-center font-xregular text-[#404040] px-4 w-full border border-[#ADADAD] rounded-lg">
                  <div className="flex items-center justify-between w-full">
                    نوع اشتراک را انتخاب نمایید
                    <img src="/iconLanding/chevron-down.svg" alt="img" />
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
              <details className="dropdown w-[99%] lg:max-w-[220px]">
                <summary className="py-[12.5px] border border-[#ADADAD] rounded-lg text-[14px] lg:mr-1 flex items-center hover:bg-white  bg-white shadow-none font-xregular text-[#404040] px-4 w-full">
                  <div className="flex items-center justify-between w-full">
                    تاریخ را انتخاب نمایید
                    <img src="/iconLanding/chevron-down.svg" alt="img" />
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
              <button className="bg-[#253359] text-[14px] font-xmedium text-white w-[99%] lg:max-w-[110px] rounded-lg py-[13.5px] "> جستجو </button>
            </div>

            <img
              className="hidden xl:block absolute right-2 bottom-2"
              src="/imageLanding/bigDot.svg"
              alt="img"
            />
            <img
              className="hidden xl:block absolute left-0 bottom-1"
              src="/imageLanding/Dot.svg"
              alt="img"
            />
          </div>
        </div>

        <div className="h-[728px] max-w-[720px] lg:bg-[#253359] lg:w-full hidden lg:block">
          <img
            className="max-w-[640px] max-h-[640px] hidden lg:block"
            src="/imageLanding/Left.svg"
            alt="img"
          />
        </div>
      </div>
    </header>
  );
}
