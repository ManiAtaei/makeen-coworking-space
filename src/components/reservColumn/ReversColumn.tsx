import React from "react";

export default function ReversColumn() {
  return (
    <div className="bg-white pt-5">
      <div className="bg-gradient-to-b from-[#B6E7F8] to-[#E8F8FD] flex flex-col items-center py-4 gap-4">
        <h1 className="text-[#404040] text-[16px] font-xbold pt-4 lg:text-[18px]">
          نظرات کاربران
        </h1>
        <div className="flex flex-col items-center gap-4 md:flex md:flex-row-reverse md:items-center lg:pt-2 xl:gap-8">
          <img src="/iconLanding/Rate-NumberBig.svg" alt="img" />
          <button className=" bg-[#253359] rounded-lg py-3 px-4 text-white text-[14px] font-xmedium lg:text-[16px] ">
            برای ثبت دیدگاه خود کلیک نمایید
          </button>
        </div>
      </div>
    </div>
  );
}
