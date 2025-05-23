"use client";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuCalendarFold } from "react-icons/lu";
import { TbUserSquareRounded } from "react-icons/tb";
import { TbArmchair } from "react-icons/tb";
import { LuSquarePlus } from "react-icons/lu";
import { CiCreditCard1 } from "react-icons/ci";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineMoveToInbox } from "react-icons/md";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import Image from "next/image"; // Import Image from next/image
import Dashboard from "@/components/admin-panel/Dashboard";
import Reservation from "@/components/admin-panel/reservation/Reservation";
import Users from "@/components/admin-panel/users/Users";
import Spaces from "@/components/admin-panel/spaces/Spaces";
import Features from "@/components/admin-panel/Features";
import Payments from "@/components/admin-panel/payment/Payments";
import Comments from "@/components/admin-panel/review/Comments";
import Reporting from "@/components/admin-panel/reporting/Reporting";
import Banner from "@/components/admin-panel/Banner";
import Tickets from "@/components/admin-panel/ticket/Tickets";

export default function Page() { // Renamed to uppercase Page
  const [isOpen, setIsOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode>(<Dashboard />);

  const hamberger = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (component: React.ReactNode) => {
    setSelectedComponent(component);
    setIsOpen(false); // Close sidebar on item click (mobile)
  };

  const itemLayout = [
    {
      id: 1,
      icon: <LuLayoutDashboard size={24} />,
      title: "داشبورد",
      component: <Dashboard />,
    },
    {
      id: 2,
      icon: <LuCalendarFold size={24} />,
      title: "رزروها",
      component: <Reservation />,
    },
    {
      id: 3,
      icon: <TbUserSquareRounded size={24} />,
      title: "کاربرها",
      component: <Users />,
    },
    {
      id: 4,
      icon: <TbArmchair size={24} />,
      title: "فضاها",
      component: <Spaces />,
    },
    {
      id: 5,
      icon: <LuSquarePlus size={24} />,
      title: "امکانات",
      component: <Features />,
    },
    {
      id: 6,
      icon: <CiCreditCard1 size={24} />,
      title: "پرداخت‌ها",
      component: <Payments />,
    },
    {
      id: 7,
      icon: <IoChatbubbleEllipsesOutline size={24} />,
      title: "نظرها",
      component: <Comments />,
    },
    {
      id: 8,
      icon: <IoTicketOutline size={24} />,
      title: "تیکت‌ها",
      component: <Tickets />,
    },
    {
      id: 9,
      icon: <MdOutlineMoveToInbox size={24} />,
      title: "گزارش‌گیری",
      component: <Reporting />,
    },
    {
      id: 10,
      icon: <MdOutlineAddPhotoAlternate size={24} />,
      title: "افزودن بنر",
      component: <Banner />,
    },
  ];

  return (
    <div className="mx-auto max-w-[1440px] lg:px-20 lg:bg-[#F4F5FC] lg:h-full">
      <div className="px-5 lg:px-0 pt-6 lg:pt-0 lg:flex h-full lg:items-start lg:bg-[#F4F5FC]">
        <div className="flex items-center justify-between lg:hidden">
          <RxHamburgerMenu
            onClick={hamberger}
            className="w-6 h-6 text-[#202020]"
            aria-label="Open menu"
          />
          <Image
            src="/admin-panel/logo-makeen.svg"
            alt="Makeen Logo"
            width={100} // Adjust based on actual size
            height={40} // Adjust based on actual size
            priority
          />
          <RiLogoutCircleLine
            className="w-5 h-5 text-[#404040]"
            aria-label="Logout"
          />
        </div>
        <div className="bg-white w-[248px] hidden lg:block lg:fixed lg:bottom-0 lg:top-0 lg:overflow-y-auto">
          <Image
            className="pt-6 pr-6"
            src="/admin-panel/logo-makeen big.svg"
            alt="Makeen Logo Large"
            width={150} // Adjust based on actual size
            height={60} // Adjust based on actual size
            priority
          />
          <div className="bg-[#ECF9FD] flex items-center mx-6 py-2 rounded-lg mt-10">
            <Image
              className="mr-4"
              src="/admin-panel/Profile-Pic.svg"
              alt="Profile Picture"
              width={40} // Adjust based on actual size
              height={40} // Adjust based on actual size
            />
            <FaPencil
              className="relative text-white bg-[#FF9568] p-[5px] w-6 h-6 rounded-full top-4 right-[-22px]"
              aria-label="Edit Profile"
            />
            <div className="flex flex-col gap-2 ml-[26px]">
              <span className="text-[#404040] font-xbold text-[12px]">
                علی مریم پور
              </span>
              <span className="text-[#4073D0] text-[12px] font-xregular">
                ادمین
              </span>
            </div>
          </div>

          <div className="mx-6 pt-[28px] lg:pt-0 lg:mt-4">
            {itemLayout.map((item) => (
              <div
                key={item.id}
                onClick={() => handleMenuItemClick(item.component)}
                className="cursor-pointer flex items-center gap-4 text-[#868686] px-4 py-[11.5px] text-[14px] font-xregular hover:bg-[#F4F5FC] hover:rounded-lg lg:mt-2"
                role="button"
                aria-label={`Navigate to ${item.title}`}
              >
                {item.icon}
                {item.title}
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:bg-white lg:mr-[260px] lg:w-full py-[27.5px] px-8 rounded-b-lg">
          <span className="font-xregular text-[14px]">
            آخرین بازدید شما: 1403/۱۰/۱۸ 12:55
          </span>
          <RiLogoutCircleLine
            className="w-6 h-6"
            aria-label="Logout"
          />
        </div>
      </div>
      <hr className="mt-2 border-[#CBCBCB] lg:hidden" />

      <div>{selectedComponent}</div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu overlay"
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
            aria-label="Close menu"
          />
        </div>

        <div className="bg-[#ECF9FD] flex items-center ml-10 py-2 mr-[22px] rounded-lg">
          <Image
            className="mr-4"
            src="/admin-panel/Profile-Pic.svg"
            alt="Profile Picture"
            width={40} // Adjust based on actual size
            height={40} // Adjust based on actual size
          />
          <FaPencil
            className="relative text-white bg-[#FF9568] p-[5px] w-6 h-6 rounded-full top-4 right-[-22px]"
            aria-label="Edit Profile"
          />
          <div className="flex flex-col gap-2 ml-[26px]">
            <span className="text-[#404040] font-xbold text-[12px]">
              علی مریم پور
            </span>
            <span className="text-[#4073D0] text-[12px] font-xregular">
              ادمین
            </span>
          </div>
        </div>

        <div className="pr-8 pt-[28px]">
          {itemLayout.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMenuItemClick(item.component)}
              className="flex items-center gap-4 text-[#868686] pt-6 text-[14px] font-xregular cursor-pointer"
              role="button"
              aria-label={`Navigate to ${item.title}`}
            >
              {item.icon}
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}