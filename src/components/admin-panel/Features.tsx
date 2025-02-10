import React from "react";
import { CiWifiOn } from "react-icons/ci";
import { PiCoffeeLight } from "react-icons/pi";
import { PiOfficeChair } from "react-icons/pi";
import { GrCafeteria } from "react-icons/gr";
import { LuProjector } from "react-icons/lu";
import { PiLockers } from "react-icons/pi";
import { TiArrowDownOutline } from "react-icons/ti";
import { AiOutlineSafety } from "react-icons/ai";
import { TbArmchair } from "react-icons/tb";
import { LuTreePine } from "react-icons/lu";
import { FaCaretLeft } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { LuTrash2 } from "react-icons/lu";
import { GoPlusCircle } from "react-icons/go";

const Features = () => {
  const features = [
    { icon: <CiWifiOn size={24} />, label: " اینترنت وافای", enabled: true },
    { icon: <PiCoffeeLight size={24} />, label: "چای قهوه", enabled: true },
    {
      icon: <PiOfficeChair size={24} />,
      label: " مبلمان اداری ",
      enabled: true,
    },
    { icon: <GrCafeteria size={24} />, label: " کافتریا ", enabled: true },
    {
      icon: <LuProjector size={24} />,
      label: " ویدیو پروژکتور ",
      enabled: false,
    },
    { icon: <PiLockers size={24} />, label: "  کمد شخصی ", enabled: false },
    {
      icon: <TiArrowDownOutline size={24} />,
      label: " قیمت اقتصادی ",
      enabled: true,
    },
    { icon: <AiOutlineSafety size={24} />, label: " امنیت ", enabled: false },
    { icon: <TbArmchair size={24} />, label: "صندلی اختصاصی ", enabled: true },
    { icon: <LuTreePine size={24} />, label: " فضای سبز ", enabled: true },
  ];

  return (
    <div className="px-5 max-w-[500px] mx-auto md:max-w-[900px] lg:max-w-[1440px] lg:mr-[260px] lg:px-6 lg:bg-white h-screen lg:rounded-lg">
      <h1 className="text-[#404040] text-center text-[16px] font-xbold mt-4 lg:pt-4 lg:text-right lg:flex lg:items-center">
        <FaCaretLeft className="w-6 h-6 hidden lg:block" />
        امکانات
      </h1>
      <div className="flex justify-end">
        <button className="bg-[#253359] text-[16px] font-xmedium flex items-center justify-center gap-2 text-white w-[300px] py-3 rounded-lg mt-6">
          <GoPlusCircle className="w-6 h-6" />
          افزودن امکان جدید
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-[19px] pr-8 pl-4 bg-[#F4F5FC] rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4 text-[#253359]">
              {item.icon}
              <span className="text-right text-[#202020] font-xregular text-[14px]">
                {item.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="toggle border-none bg-white [--tglbg:#CBCBCB] hover:[--tglbg:#44C0ED] hover:bg-white"
                defaultChecked
              />
              <button className="text-gray-400">
                <LuTrash2 className="w-[22px] h-[22px] text-[#ADADAD]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
