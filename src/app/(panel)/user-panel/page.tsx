"use client";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { LuCalendarFold } from "react-icons/lu";
import { TbUserSquareRounded } from "react-icons/tb";
import { CiCreditCard1 } from "react-icons/ci";
import { IoTicketOutline } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { TbCalendarCheck } from "react-icons/tb";
import UserProfile from "@/components/user-panel/UserProfile";
import Wallet from "@/components/user-panel/Wallet";
import ReservationManagement from "@/components/user-panel/reservation/ReservationManagement";
import History from "@/components/user-panel/history/History";
import Ticket from "@/components/user-panel/ticket/Ticket";
import Notifications from "@/components/user-panel/Notifications";
import { IoIosArrowBack } from "react-icons/io";
import { LuGift } from "react-icons/lu";

export default function page() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(<UserProfile />);
  const [activeMenu, setActiveMenu] = useState("مشخصات کاربری");

  const hamberger = () => {
    setIsOpen(!isOpen);
  };
  const Inventory = [
    { id: 1, total: "250,000", shopping: "150,000", gift: "100,000" },
  ];

  const itemLayout = [
    {
      id: 1,
      icon: <TbUserSquareRounded size={24} />,
      title: " مشخصات کاربری ",
      component: <UserProfile />,
    },
    {
      id: 2,
      icon: <LuCalendarFold size={24} />,
      title: " مدیریت رزروها ",
      component: <ReservationManagement />,
    },
    {
      id: 3,
      icon: <CiCreditCard1 size={24} />,
      title: " تاریخچه تراکنش ها ",
      component: <History />,
    },
    {
      id: 4,
      icon: <IoTicketOutline size={24} />,
      title: " تیکت‌ها ",
      component: <Ticket />,
    },
    {
      id: 5,
      icon: <TbCalendarCheck size={24} />,
      title: " اعلان ها ",
      component: <Notifications />,
    },
  ];

  const handleMenuClick = (title, component) => {
    setSelectedComponent(component);
    setActiveMenu(title);
    if (isOpen) setIsOpen(false);
  };

  return (
    <>
      <div className="px-5 lg:px-0 pt-6 lg:pt-0 lg:flex lg:items-start  lg:bg-[#F4F5FC]">
        <div className="flex items-center justify-between lg:hidden">
          <RxHamburgerMenu
            onClick={hamberger}
            className="w-6 h-6 text-[#202020]"
          />
          <img src="/user-panel/logo-makeen.svg" alt="img" />
          <RiLogoutCircleLine className="w-5 h-5 text-[#404040]" />
        </div>
        <div className="bg-white w-[248px] hidden lg:block lg:fixed lg:bottom-0 lg:top-0 lg:overflow-y-auto ">
          <img
            className="pt-6 pr-6"
            src="/user-panel/logo-makeen big.svg"
            alt="img"
          />
          <div className="bg-[#ECF9FD] flex items-center mx-6 py-2 rounded-lg mt-10 ">
            <img
              className="mr-4"
              src="/user-panel/Profile-Pic.svg"
              alt="img"
            />
            <FaPencil className="relative text-white bg-[#FF9568] p-[5px] w-6 h-6 rounded-full top-4 right-[-22px]" />
            <div className="flex flex-col gap-2 ml-[26px]">
              <span className="text-[#404040] font-xbold text-[12px]">
                علی مریم پور
              </span>
              <span className="text-[#4073D0] text-[12px] font-xregular">
                دانشجو مکین
              </span>
            </div>
          </div>
          <div className="px-6 mt-5">
            {Inventory.map((item) => (
              <div key={item.id}>
                <span 
                  onClick={() => handleMenuClick("کیف پول", <Wallet/>)} 
                  className={`flex items-center text-[#253359] text-[12px] font-xbold mb-[10px] cursor-pointer ${activeMenu === "کیف پول" ? "text-[#7557E1]" : ""}`}
                >
                  مدیریت کیف پول شما
                  <IoIosArrowBack className={`w-4 h-4 ${activeMenu === "کیف پول" ? "text-[#7557E1]" : "text-black"}`} />
                  {activeMenu === "کیف پول" && <div className="absolute right-0 w-1 h-6 bg-[#4073D0] rounded-l-md"></div>}
                </span>
                <span className="text-[12px] font-xregular text-[#606060]">
                  موجودی <span className="text-[#202020]">
                    {item.total}
                  </span>
                   تومان 
                </span>
                <div className="flex items-center gap-1 mt-[10px]">
                  <span className="text-[12px] font-xregular text-[#606060]">
                    {item.shopping} تومان
                  </span>
                  <span className="font-xregular text-[#606060] ">+</span>
                  <span className="flex items-center text-[12px] font-xregular text-[#227346] bg-[#F4FFF9] border border-[#3BC377] rounded-[4px] gap-2 px-3 py-1">
                    <LuGift className="w-[16px] h-[16px]"/>
                    {item.gift} تومان
                  </span>
                </div>
              </div>
            ))}
          </div>
          <hr className="text-[#DFDFDF] mx-6 mt-6" />

          <div className="mx-6 pt-[28px] lg:pt-0 lg:mt-4 relative">
            {itemLayout.map((item) => (
              <div
                key={item.id}
                onClick={() => handleMenuClick(item.title, item.component)}
                className={`cursor-pointer flex items-center gap-4 px-4 py-[11.5px] text-[14px] font-xregular hover:bg-[#F4F5FC] hover:rounded-lg lg:mt-2 relative ${
                  activeMenu === item.title ? "bg-[#F4F5FC] rounded-lg text-[#7557E1]" : "text-[#868686]"
                }`}
              >
                <span className={activeMenu === item.title ? "text-[#7557E1]" : ""}>{item.icon}</span>
                {item.title}
                {activeMenu === item.title && (
                  <div className="absolute right-0 w-1 h-10 bg-[#4073D0] rounded-l-md"></div>
                )}
              </div>
            ))}
            <div
              onClick={() => handleMenuClick("مدیریت رزروها اضافی", <ReservationManagement />)}
              className={`cursor-pointer flex items-center gap-4 px-4 py-[11.5px] text-[14px] font-xregular hover:bg-[#F4F5FC] hover:rounded-lg lg:mt-2 relative ${
                activeMenu === "مدیریت رزروها اضافی" ? "bg-[#F4F5FC] rounded-lg text-[#7557E1]" : "text-[#868686]"
              }`}
            >
              <span className={activeMenu === "مدیریت رزروها اضافی" ? "text-[#7557E1]" : ""}>
                <LuCalendarFold size={24} />
              </span>
              {" مدیریت رزروها "}
              {activeMenu === "مدیریت رزروها اضافی" && (
                <div className="absolute right-0 w-1 h-10 bg-[#4073D0] rounded-l-md"></div>
              )}
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:bg-white lg:mr-[260px] lg:w-full py-[27.5px] px-8 rounded-b-lg  ">
          <span className="font-xregular text-[14px]">
            اخرین بازدید شما : 1403/۱۰/۱۸ 12:55
          </span>
          <RiLogoutCircleLine className="w-6 h-6" />
        </div>
      </div>
      <hr className="mt-2 border-[#CBCBCB] lg:hidden" />

      <div>{selectedComponent}</div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } fixed top-0 right-0 bottom-0 bg-white z-50 rounded-l-[16px]`}
      >
        <div className="flex justify-end pt-6 pl-6">
          <IoClose
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 text-[#606060]"
          />
        </div>

        <div className="bg-[#ECF9FD] flex items-center ml-10 py-2 mr-[22px] rounded-lg ">
          <img className="mr-4" src="/admin-panel/Profile-Pic.svg" alt="img" />
          <FaPencil className="relative text-white bg-[#FF9568] p-[5px] w-6 h-6 rounded-full top-4 right-[-22px]" />
          <div className="flex flex-col gap-2 ml-[26px]">
            <span className="text-[#404040] font-xbold text-[12px]">
              علی مریم پور
            </span>
            <span className="text-[#4073D0] text-[12px] font-xregular">
              ادمین
            </span>
          </div>
        </div>

        <div className="pr-8 pt-[28px] relative">
          {itemLayout.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMenuClick(item.title, item.component)}
              className={`flex items-center gap-4 pt-6 text-[14px] font-xregular cursor-pointer relative ${
                activeMenu === item.title ? "text-[#7557E1]" : "text-[#868686]"
              }`}
            >
              <span className={activeMenu === item.title ? "text-[#7557E1]" : ""}>{item.icon}</span>
              {item.title}
              {activeMenu === item.title && (
                <div className="absolute right-0 w-1 h-6 bg-[#4073D0] rounded-l-md"></div>
              )}
            </div>
          ))}
          <div
            onClick={() => handleMenuClick("مدیریت رزروها اضافی", <ReservationManagement />)}
            className={`flex items-center gap-4 pt-6 text-[14px] font-xregular cursor-pointer relative ${
              activeMenu === "مدیریت رزروها اضافی" ? "text-[#7557E1]" : "text-[#868686]"
            }`}
          >
            <span className={activeMenu === "مدیریت رزروها اضافی" ? "text-[#7557E1]" : ""}>
              <LuCalendarFold size={24} />
            </span>
            {" مدیریت رزروها "}
            {activeMenu === "مدیریت رزروها اضافی" && (
              <div className="absolute right-0 w-1 h-6 bg-[#4073D0] rounded-l-md"></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}