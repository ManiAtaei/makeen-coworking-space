import { FaCaretLeft } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { LuUserRoundX } from "react-icons/lu";
import { PiMoneyWavyLight } from "react-icons/pi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import Calender from "./Calender";

export default function UserInfo() {
  const info = [
    { id: 1, tite: " نام و نام خانوادگی : ", name: " مریم علی‌پور " },
    { id: 2, tite: " تاریخ تولد : ", name: " ۱۳۷۰/۰۴/۱۴ " },
    { id: 3, tite: " ایمیل : ", name: " M.Alipour@gmail.com " },
    { id: 4, tite: " شماره تماس : ", name: " ۰۹۱۲۱۲۳۱۱۶۷ " },
  ];

  return (
    <>
      <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-6 lg:bg-white h-full rounded-lg">
        <div className="flex items-center gap-6 py-2 h-full ">
          <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:text-right lg:flex lg:items-center">
            <FaCaretLeft className="w-6 h-6 hidden lg:block" />
            مشخصات کاربر
          </h1>
          <img src="/admin-panel/Profile-pic1.svg" alt="img" />
          <div className="flex flex-col items-center gap-[13px]">
            <div className="flex items-center gap-4 text-[#ADADAD]">
              <LuUserRoundX className="w-6 h-6" />
              <AiOutlineMessage className="w-6 h-6" />
            </div>
            <button className="flex items-center gap-2 bg-[#253359] text-white px-4 py-[5px] text-[12px] font-xmedium rounded-md">
              <PiMoneyWavyLight className="w-6 h-6" /> شارژ کیف
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-[29px]">
            {info.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 text-[12px] "
              >
                <span className="font-xbold text-[#000000]">{item.tite}</span>
                <span className="font-xregular text-[#202020]">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start justify-between gap-[23px] text-[12px] font-xbold text-black">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-2">
                آپلود مدارک :
                <IoCheckmarkCircleOutline className="text-[#3BC377] bg-transparent w-6 h-6 rounded-full" />
              </span>
              <button className="text-[#44C0ED] font-xregular text-[12px] underline underline-offset-2 ">
                مشاهده
              </button>
            </div>
            <span className="flex items-center gap-2">
              دانشجو مکین :
              <IoCheckmarkCircleOutline className="text-[#3BC377] bg-transparent w-6 h-6 rounded-full" />
            </span>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Calender />
      </div>
    </>
  );
}
