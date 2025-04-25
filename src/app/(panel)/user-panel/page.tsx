"use client";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { LuCalendarFold } from "react-icons/lu";
import { TbUserSquareRounded } from "react-icons/tb";
import { CiCreditCard1 } from "react-icons/ci";
import { IoTicketOutline } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { TbCalendarCheck } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { LuGift } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Image from "next/image";

const UserProfile = React.lazy(() => import("@/components/user-panel/UserProfile"));
const Wallet = React.lazy(() => import("@/components/user-panel/Wallet"));
const ReservationManagement = React.lazy(() => import("@/components/user-panel/reservation/ReservationManagement"));
const History = React.lazy(() => import("@/components/user-panel/history/History"));
const Ticket = React.lazy(() => import("@/components/user-panel/ticket/Ticket"));
const Notifications = React.lazy(() => import("@/components/user-panel/Notifications"));

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<keyof typeof componentMap>("UserProfile");
  const [activeMenu, setActiveMenu] = useState("مشخصات کاربری");
  const [userData, setUserData] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get("https://109.230.200.230:7890/api/v1/Users/Me", {
          withCredentials: true,
        });
        setUserData(userResponse.data);

        const photoResponse = await axios.get("https://109.230.200.230:7890/api/v1/Users/Profile-Photo", {
          withCredentials: true,
          responseType: "blob",
        });
        const photoUrl = URL.createObjectURL(photoResponse.data);
        setProfilePhoto(photoUrl);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    return () => {
      if (profilePhoto) {
        URL.revokeObjectURL(profilePhoto);
      }
    };
  }, [profilePhoto]);

  const hamberger = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await axios({
        method: "OPTIONS",
        url: "https://109.230.200.230:7890/api/v1/Auth/Logout",
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setUserData(null);
      setProfilePhoto(null);
      router.push("/");
    }
  };

  const itemLayout = [
    { id: 1, icon: <TbUserSquareRounded size={24} />, title: "مشخصات کاربری", component: "UserProfile" },
    { id: 2, icon: <LuCalendarFold size={24} />, title: "مدیریت رزروها", component: "ReservationManagement" },
    { id: 3, icon: <CiCreditCard1 size={24} />, title: "تاریخچه تراکنش‌ها", component: "History" },
    { id: 4, icon: <IoTicketOutline size={24} />, title: "تیکت‌ها", component: "Ticket" },
    { id: 5, icon: <TbCalendarCheck size={24} />, title: "اعلان‌ها", component: "Notifications" },
    { id: 6, icon: <CiCreditCard1 size={24} />, title: "کیف پول", component: "Wallet" },
  ];

  const componentMap = {
    UserProfile: <UserProfile userData={userData} profilePhoto={profilePhoto} />,
    Wallet: <Wallet userData={userData} />,
    ReservationManagement: <ReservationManagement />,
    History: <History />,
    Ticket: <Ticket />,
    Notifications: <Notifications />,
  };

  const handleMenuClick = (title: string, component: keyof typeof componentMap) => {
    setSelectedComponent(component);
    setActiveMenu(title);
    if (isOpen) setIsOpen(false);
  };

  return (
    <div className="mx-auto max-w-[1440px] lg:px-20 lg:bg-[#F4F5FC] lg:h-full">
      <div className="px-5 lg:px-0 pt-6 lg:pt-0 lg:flex lg:items-start lg:bg-[#F4F5FC]">
        <div className="flex items-center justify-between lg:hidden">
          <RxHamburgerMenu
            onClick={hamberger}
            className="w-6 h-6 text-[#202020]"
            aria-label="Open menu"
          />
          <Image
            src="/user-panel/logo-makeen.svg"
            alt="Makeen Logo"
            width={100}
            height={40}
            priority
          />
          <RiLogoutCircleLine
            className="w-5 h-5 text-[#404040] cursor-pointer"
            onClick={handleLogout}
            aria-label="Logout"
          />
        </div>
        <div className="bg-white w-[248px] hidden lg:block lg:fixed lg:bottom-0 lg:top-0 lg:overflow-y-auto">
          <Image
            className="pt-6 pr-6"
            src="/user-panel/logo-makeen big.svg"
            alt="Makeen Logo Large"
            width={150}
            height={60}
            priority
          />
          {userData && profilePhoto && (
            <div className="bg-[#ECF9FD] flex items-center mx-6 py-2 rounded-lg mt-10">
              <Image
                className="mr-4 w-[64px] h-[64px] rounded-full"
                src={profilePhoto}
                alt="Profile Picture"
                width={64}
                height={64}
              />
              <FaPencil
                className="relative text-white bg-[#FF9568] p-[5px] w-6 h-6 rounded-full top-4 right-[-22px]"
                aria-label="Edit Profile"
              />
              <div className="flex flex-col gap-2 ml-[26px]">
                <span className="text-[#404040] font-xbold text-[12px]">{`${userData.firstName} ${userData.lastName}`}</span>
                <span className="text-[#4073D0] text-[12px] font-xregular">دانشجو مکین</span>
              </div>
            </div>
          )}
          <hr className="text-[#DFDFDF] mx-6 mt-6" />
          <div className="mx-6 pt-[28px] lg:pt-0 lg:mt-4 relative">
            {itemLayout.map((item) => (
              <div
                key={item.id}
                onClick={() => handleMenuClick(item.title, item.component)}
                className={`cursor-pointer flex items-center gap-4 px-4 py-[11.5px] text-[14px] font-xregular hover:bg-[#F4F5FC] hover:rounded-lg lg:mt-2 relative ${
                  activeMenu === item.title ? "bg-[#F4F5FC] rounded-lg text-[#7557E1]" : "text-[#868686]"
                }`}
                role="button"
                aria-label={`Navigate to ${item.title}`}
              >
                <span className={activeMenu === item.title ? "text-[#7557E1]" : ""}>{item.icon}</span>
                {item.title}
                {activeMenu === item.title && <div className="absolute right-0 w-1 h-10 bg-[#4073D0] rounded-l-md"></div>}
              </div>
            ))}
            <div
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-4 px-4 py-[11.5px] text-[14px] font-xregular hover:bg-[#F4F5FC] hover:rounded-lg lg:mt-2 relative text-[#868686]"
              role="button"
              aria-label="Logout"
            >
              <RiLogoutCircleLine size={24} />
              خروج
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:bg-white lg:mr-[260px] lg:w-full py-[27.5px] px-8 rounded-b-lg">
          <span className="font-xregular text-[14px]">آخرین بازدید شما: 1403/۱۰/۱۸ 12:55</span>
          <RiLogoutCircleLine
            className="w-6 h-6 cursor-pointer"
            onClick={handleLogout}
            aria-label="Logout"
          />
        </div>
      </div>
      <hr className="mt-2 border-[#CBCBCB] lg:hidden" />
      <Suspense fallback={<div className="text-center py-10">در حال بارگذاری...</div>}>
        <div>{componentMap[selectedComponent]}</div>
      </Suspense>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu overlay"
        />
      )}
      <div className={`${isOpen ? "block" : "hidden"} fixed top-0 right-0 bottom-0 bg-white z-50 rounded-l-[16px]`}>
        <div className="flex justify-end pt-6 pl-6">
          <IoClose
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 text-[#606060]"
            aria-label="Close menu"
          />
        </div>
        {userData && profilePhoto && (
          <div className="bg-[#ECF9FD] flex items-center ml-10 py-2 mr-[22px] rounded-lg">
            <Image
              className="mr-4 w-[64px] h-[64px] rounded-full"
              src={profilePhoto}
              alt="Profile Picture"
              width={64}
              height={64}
            />
            <FaPencil
              className="relative text-white bg-[#FF9568] p-[5px] w-6 h-6 rounded-full top-4 right-[-22px]"
              aria-label="Edit Profile"
            />
            <div className="flex flex-col gap-2 ml-[26px]">
              <span className="text-[#404040] font-xbold text-[12px]">{`${userData.firstName} ${userData.lastName}`}</span>
              <span className="text-[#4073D0] text-[12px] font-xregular">دانشجو مکین</span>
            </div>
          </div>
        )}
        <div className="pr-8 pt-[28px] relative">
          {itemLayout.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMenuClick(item.title, item.component)}
              className={`flex items-center gap-4 pt-6 text-[14px] font-xregular cursor-pointer relative ${
                activeMenu === item.title ? "text-[#7557E1]" : "text-[#868686]"
              }`}
              role="button"
              aria-label={`Navigate to ${item.title}`}
            >
              <span className={activeMenu === item.title ? "text-[#7557E1]" : ""}>{item.icon}</span>
              {item.title}
              {activeMenu === item.title && <div className="absolute right-0 w-1 h-6 bg-[#4073D0] rounded-l-md"></div>}
            </div>
          ))}
          <div
            onClick={handleLogout}
            className="flex items-center gap-4 pt-6 text-[14px] font-xregular cursor-pointer relative text-[#868686]"
            role="button"
            aria-label="Logout"
          >
            <RiLogoutCircleLine size={24} />
            خروج
          </div>
        </div>
      </div>
    </div>
  );
}