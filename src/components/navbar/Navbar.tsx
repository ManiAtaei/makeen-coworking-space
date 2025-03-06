"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { IoCloseOutline } from "react-icons/io5";
import Captcha from "../Auth/Captcha";
import Otp from "../Auth/Otp";
import ResetPasswod from "../Auth/ResetPassword";

type AuthStep = 1 | 2 | 3 | 4 | 5;

interface AuthComponentProps {
  setStep: React.Dispatch<React.SetStateAction<AuthStep>>;
}

export default function Navbar() {
  const titleHamberger = [
    { id: 1, title: "صفحه اصلی" },
    { id: 2, title: " تماس باما " },
    { id: 3, title: " سیاست ها و قوانین " },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [authStep, setAuthStep] = useState<AuthStep>(1);

  const hamberger = () => {
    setIsOpen(!isOpen);
  };

  const closeHamber = () => {
    setIsOpen(false);
  };

  const handleModalOpen = () => {
    setAuthStep(1);
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <nav className="w-screen bg-white fixed z-50 top-0 left-0 right-0">
      <div className="max-w-[1440px] h-[80px] mx-auto py-2 px-4 lg:py-4 lg:px-20 2xl:px-0  flex items-center justify-between">
        <div className="flex items-center gap-16">
          <img className="hidden" src="/imageLanding/logo-makeen.svg" alt="img" />
          <img className="block" src="/imageLanding/logo-makeenSmall.svg" alt="img" />
          <ul className="hidden titleNav:flex text-[#404040] text-[16px] font-xmedium gap-8">
            <Link href="/"><li> صفحه اصلی </li></Link>
            <Link href="contactUs"><li> تماس باما </li></Link>
            <li> سیاست ها و قوانین </li>
          </ul>
        </div>

        <div className="flex items-center gap-3 mobileNum:gap-11">
          <div className="mobile:flex mobile:items-center gap-3 hidden text-[#404040]">
            <FiPhoneCall className="w-6 h-6" />
            <span className="text-[16px] font-xmedium"> ۰۲۱-۷۷۱۸۸۱۸۵-۶ </span>
          </div>

          <button
            onClick={handleModalOpen}
            className="hidden text-[#44C0ED] text-[16px] font-xmedium lg:flex lg:items-center gap-1"
          >
            <img src="/iconLanding/profileBlue.svg" alt="" />
            <span> ورود / عضویت </span>
          </button>

          <dialog id="my_modal_3" className="modal">
            <div className="modal-box w-full min-w-fit px-0 pt-8">
              <form method="dialog">
                <button 
                  className="btn btn-sm btn-circle btn-ghost absolute left-3 top-3"
                  onClick={() => {
                    setAuthStep(1);
                    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
                    if (modal) modal.close();
                  }}
                >
                  <IoCloseOutline className="w-7 h-7" />
                </button>
              </form>
              <div>
                {authStep === 1 && <Login setStep={setAuthStep} />}
                {authStep === 2 && <Register setStep={setAuthStep} />}
                {authStep === 3 && <Captcha setStep={setAuthStep} />}
                {authStep === 4 && <Otp setStep={setAuthStep} />}
                {authStep === 5 && <ResetPasswod setStep={setAuthStep} />}
              </div>
            </div>
          </dialog>

          <div className="pl-5 lg:hidden">
            <button onClick={hamberger} className="h-[38px] w-[38px] border-[1px] rounded-[8px] bg-white hover:bg-gray-100 border-solid border-[#D1D5D8] p-2">
              {isOpen ? (
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              ) : (
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-5 sm:h-5">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} xl:hidden fixed top-0 right-0 bottom-0 bg-white w-[320px] space-y-[18px]`}>
          {/* محتوای منوی همبرگر */}
        </div>
      </div>
    </nav>
  );
}