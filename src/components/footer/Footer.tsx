import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { TbBrandInstagramFilled } from "react-icons/tb";
import { FaLinkedin } from "react-icons/fa";



export default function Footer() {
  return (
    <div className="bg-[#F4F5FC] py-8 mt-[-24px]  ">
      <div className="flex ">
        <div className="flex flex-col pr-12 mt-[-10px]">
          <img
            className="w-[157px]"
            src="/imageLanding/logo-makeen.svg"
            alt="img"
          />
          <p className="text-[12px] font-xregular w-[240px] text-[#404040] pr-2 leading-[28.8px]">
            مکین یک پلتفرم اینترنتی برای پیدا کردن و رزرو فضاهای مناسب برای کار
            کردن و مطالعه است.
          </p>
        </div>
        <div className="flex flex-col pr-[135px] gap-4">
          <div className="flex items-center">
            <FiPhoneCall className="w-6 h-6 text-[#253359]" />
            <span className="text-[12px] font-xregular pr-3 text-[#404040]">
              021-77188185-6
            </span>
          </div>
          <div className="flex items-center">
            <img
              className="w-6 h-6 "
              src="/iconLanding/location.svg"
              alt="img"
            />
            <span className="w-[184px] pr-2 text-[12px] font-xregular text-[#404040] leading-[21.6px]">
              تهران، مترو علم صنعت، خیابان سلیمانی مدائن پلاک 520
            </span>
          </div>
          <div className="flex items-center">
            <MdOutlineMail className="w-6 h-6" />
            <span className="text-[12px] pr-3 font-xregular text-[#404040] ">
              Makeen@gmail.com
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 pr-[130px]">
          <h1 className="text-[#404040] text-[14px] font-xbold">
            دسترسی آسان
          </h1>
          <div className="text-[12px] font-xregular flex flex-col gap-[14px]">
            <span > صفحه اصلی </span>
            <span > رزرو آنلاین فضا </span>
            <span > قوانین و سیاست‌ها </span>
          </div>
        </div>
        <div className="pr-[133.33px] text-[14px] font-xbold">
          <h1> عضویت خبرنامه </h1>
          <div className="flex gap-4 mt-[68px]">
          <TbBrandInstagramFilled className="h-8 w-8" />
          <img src="/iconLanding/send-2.svg" alt="img" />
          <FaLinkedin className="w-8 h-8 rounded-lg" />
          <img src="/iconLanding/youtube.svg" alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
}
