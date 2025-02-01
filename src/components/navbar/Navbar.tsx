"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FiPhoneCall } from "react-icons/fi";

export default function Navbar() {
  const titleHamberger = [
    {
      id: 1,
      title: "صفحه اصلی",
    },
    {
      id: 2,
      title: " تماس باما ",
    },
    {
      id: 3,
      title: " سیاست ها و قوانین ",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const hamberger = () => {
    setIsOpen(!isOpen);
  };

  const closeHamber = () => {
    setIsOpen(false);
  };
  return (
    <nav className="w-screen bg-white fixed z-50 top-0 left-0 right-0">
      <div className="max-w-[1440px] h-[80px] mx-auto py-2 px-4 lg:py-4 lg:px-20 2xl:px-0  flex items-center justify-between ">
        
        <div className="flex items-center gap-16">
          <img className="hidden" src="/imageLanding/logo-makeen.svg" alt="img" />
          <img className="block" src="/imageLanding/logo-makeenSmall.svg" alt="img" />
          <ul className="hidden titleNav:flex text-[#404040] text-[16px] titleNav:block font-xmedium gap-8">
            <Link href="/"><li> صفحه اصلی </li></Link>
            <Link href="contactUs"><li> تماس باما </li></Link>
            <li> سیاست ها و قوانین </li>
          </ul>
        </div>

        <div className="flex items-center gap-3 mobileNum:gap-11">
          <div className="mobile:flex mobile:items-center gap-3 hidden mobile:block text-[#404040]">
            <FiPhoneCall className="w-6 h-6" />
            <span className="text-[16px] font-xmedium"> ۰۲۱-۷۷۱۸۸۱۸۵-۶ </span>
          </div>

          <button className="hidden lg:block text-[#44C0ED] text-[16px] font-xmedium lg:flex lg:items-center gap-1">
            <img src="/iconLanding/profileBlue.svg" alt="" />
            <span> ورود / عضویت </span>
          </button>

          <div className="pl-5 lg:hidden">
            <button
              onClick={hamberger}
              className=" h-[38px] w-[38px] border-[1px] rounded-[8px] bg-white hover:bg-gray-100 border-solid border-[#D1D5D8] p-2"
            >
              {isOpen ? (
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-5 sm:h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } xl:hidden fixed top-0 right-0 bottom-0 bg-white w-[320px] space-y-[18px] `}
        >
          <div className="flex justify-between items-center px-4 pt-[8px]  ">
            <img src="/imageLanding/logo-makeen.svg" alt="img" />

            <div className="lg:hidden">
              <button
                onClick={closeHamber}
                className=" block h-[38px] w-[38px] border-[1px] rounded-[8px] bg-white hover:bg-gray-100 border-solid border-[#D1D5D8] p-2 "
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <hr />

          <div className="flex justify-center">
            <div className="flex items-center">
              <button className="text-[16px] flex items-center justify-center gap-1 w-[180px] h-[42px] font-medium text-white bg-[#44C0ED] rounded-lg border border-gray-300 px-4 lg:px-5 lg:py-1.5 mr-2 xl:block">
                <img src="/iconLanding/profile.svg" alt="img" />
                ورود / عضویت
              </button>
            </div>
          </div>

          <div className=" text-[18px] font-[500] flex flex-col space-y-6 px-4 pt-[20px] cursor-pointer">
            {titleHamberger.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mt-[-8px]"
              >
                <div>
                  <h2>{item.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
