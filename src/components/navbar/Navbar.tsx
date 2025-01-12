"use client";
import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const hamberger = () => {
    setIsOpen(!isOpen);
  };

  const closeHamber = () => {
    setIsOpen(false);
  };
  return (
    <nav className="w-screen fixed z-50">
      <div className="max-w-[1440px] mx-auto py-2 px-4 flex items-center justify-between ">
        <img src="/imageLanding/logo-makeen.svg" alt="img" />

        <div className="xl:hidden">
          <button
            onClick={hamberger}
            className="block h-[38px] w-[38px] border-[1px] rounded-[8px] bg-white hover:bg-gray-100 border-solid border-[#D1D5D8] p-2"
          >
            {isOpen ? (
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
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
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            )}
          </button>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } xl:hidden fixed top-0 right-0 bottom-0 bg-white w-[320px] space-y-[18px] `}
        >
          <div className="flex justify-between items-center px-4 pt-[8px]  ">
            <img src="/imageLanding/logo-makeen.svg" alt="img" />

            <div>
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
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            
          </div>
          <hr className="" />

          <div className="flex justify-center">
            <div className="flex items-center">
              <button className="text-[16px] flex items-center justify-center gap-[2px] w-[180px] h-[42px] font-medium bg-[#44C0ED] rounded-lg border border-gray-300 px-4 lg:px-5 lg:py-1.5 mr-2 xl:block">
                <img className="w-6 h-6" src="/iconLanding/profile.svg" alt="img" />
                ورود / عضویت
              </button>
            </div>
          </div>

          <hr className="border-dotted " />
          <div className=" text-[18px] font-[500] flex flex-col space-y-6 px-4 pt-[-20px] cursor-pointer">
            <div className="flex justify-between items-center mt-[-8px]">
              <div>
                <span> خرید ارز دیجیتال </span>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  stroke-width="1"
                  width="20"
                  height="20"
                  className="mr-1  w-[24px] h-[24px] lg:w-4 lg:h-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div>
              <div>
                <span> قیمت ارزهای دیجیتال </span>
              </div>
            </div>
            <div>
              <div>
                <span> اپلیکیشن صرافی </span>
              </div>
            </div>
            <div>
              <div>
                <span> ماشین حساب ارز دیجیتال </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span> مجله صرافی </span>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  viewBox="0 0 20 20"
                  stroke-width="1"
                  width="20"
                  height="20"
                  className=" mr-1 w-[24px] h-[24px] lg:w-4 lg:h-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div>
              <div>
                <span> تماس باما </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
