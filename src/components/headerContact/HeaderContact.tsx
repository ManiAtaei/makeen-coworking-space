import React from "react";

export default function HeaderContact() {
  return (
    <div className="relative">
      <div className="flex flex-col sm:flex sm:flex-row sm:justify-center gap-2 xl:gap-8 lg:gap-4 relative top-[-60px] lg:top-[-100px] px-5 top-4 w-full lg:px-[70px]">
        <div className="sm:order-1 flex items-center sm:flex sm:flex-col sm:rounded-r-lg sm:rounded-tl-none sm:pr-0 sm:pl-2 sm:w-1/3 xl:w-3/12 shadow-[0_8px_15px_#63666714,0_0px_4px_#63666714] shadow-lg pr-4 py-[18px] bg-white rounded-t-2xl ">
          <img
            className="md:w-[50px] md:h-[50px] "
            src="/iconLanding/Location-Outline.svg"
            alt="img"
          />
          <span className="text-[#202020] text-[12px] header:text-[14px] lg:text-[18px] font-xbold pr-2 sm:py-2 xl:py-4">
            آدرس :
          </span>
          <p className="pr-2 text-[#404040] text-[12px] header:text-[14px] font-xregular lg:text-[16px] lg:font-xmedium w-4/6 sm:w-full sm:text-center md:w-10/12 leading-[18px]">
            تهران، مترو علم صنعت، خیابان سلیمانی، مدائن پلاک 520
          </p>
        </div>

        <div className="flex sm:order-3 items-center sm:flex sm:flex-col sm:pr-0 sm:rounded-l-lg sm:w-1/3 xl:w-3/12 shadow-[0_8px_15px_#63666714,0_8px_15px_#63666714] shadow-lg pr-4 py-[18px]  bg-white">
          <img
            className="md:w-[50px] md:h-[50px]"
            src="/iconLanding/call-calling.svg"
            alt="img"
          />
          <span className="text-[#202020] text-[12px] header:text-[14px] lg:text-[18px] font-xbold pr-2 sm:py-2 xl:py-4">
            تلفن :
          </span>
          <p className="pr-2 text-[#404040] sm:hidden text-[12px] header:text-[14px] font-xregular">
            021-77188185-۶٬۰۹۱۲۱۲۳۴۵۶۷
          </p>
          <p className="pr-2 text-[#404040] hidden sm:block text-[12px] header:text-[14px] font-xregular lg:text-[16px] lg:font-xmedium">
            021-77188185-۶
          </p>
          <p className="pr-2 text-[#404040] hidden sm:block text-[12px] header:text-[14px] font-xregular lg:text-[16px] lg:font-xmedium">
            ۰۹۱۲۱۲۳۴۵۶۷
          </p>
        </div>

        <div className="flex sm:order-2 items-center sm:flex sm:flex-col sm:pr-0 sm:rounded-b-none sm:w-1/3 xl:w-3/12 shadow-[0_8px_15px_#63666714,0_8px_15px_#63666714] shadow-lg pr-4 py-[18px]  bg-white rounded-b-2xl">
          <img
            className="md:w-[50px] md:h-[50px]"
            src="/iconLanding/Email-Outline.svg"
            alt="img"
          />
          <span className="text-[#202020] text-[12px] header:text-[14px] lg:text-[18px]  font-xbold pr-2 sm:py-2 xl:py-4">
            ایمیل :
          </span>
          <p className="pr-2 text-[#404040] text-[12px] header:text-[14px] lg:text-[16px] lg:font-xmedium font-xregular">
            Makeen@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
