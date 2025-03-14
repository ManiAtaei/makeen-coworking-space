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
    { id: 1, title: " خانه " },
    { id: 2, title: " تماس با ما " },
    { id: 3, title: " سیاست و قوانین " },
    { id: 4, title: " رزرو فضا " },
    { id: 5, title: " حساب کاربری " },
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
    <nav className="w-screen bg-white fixed z-20 top-0 left-0 right-0">
      <div className="max-w-[1440px] mx-auto mt-6 px-5 lg:py-4 lg:px-20 2xl:px-0  flex items-center justify-between">
        <div className="lg:hidden">
          <button onClick={hamberger}>
            {isOpen ? (
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
            ) : (
              <img
                src="/iconLanding/Hamburger-Menu.svg"
                alt="img"
                className="w-6 h-6"
              />
            )}
          </button>
        </div>
        <div className="flex items-center gap-16">
          <img
            className="hidden lg:block"
            src="/imageLanding/logo-makeen.svg"
            alt="img"
          />
          <img
            className="block lg:hidden"
            src="/imageLanding/logo-makeenSmall.svg"
            alt="img"
          />
          <ul className="hidden lg:flex text-[#404040] text-[16px] font-xmedium gap-8">
            <Link href="/">
              <li> صفحه اصلی </li>
            </Link>
            <Link href="contactUs">
              <li> تماس باما </li>
            </Link>
            <li> سیاست ها و قوانین </li>
          </ul>
        </div>

        <div className="flex items-center gap-3 mobileNum:gap-11">
          <div className="flex items-center gap-2 text-[#404040]">
            <button>
              <img src="/iconLanding/Support.svg" alt="img" />
            </button>
            <button className="lg:hidden">
              <img
                src="/iconLanding/Mobile-Register-State-Button.svg"
                alt="img"
              />
            </button>
            <span className="text-[16px] font-xmedium hidden titleNav:block">
              ۰۲۱-۷۷۱۸۸۱۸۵-۶
            </span>
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
                    const modal = document.getElementById(
                      "my_modal_3"
                    ) as HTMLDialogElement;
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
        </div>
        {isOpen && (
          <div onClick={closeHamber} className="fixed inset-0 bg-black opacity-20">
          </div>
        )}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } xl:hidden z-50 fixed top-0 right-0 bottom-0 bg-white w-[248px] rounded-l-[16px]`}
        >
          <div className="flex items-start justify-between px-8">
            <div className="flex flex-col mt-[52px] gap-6 ">
              {titleHamberger.map((item) => (
                <div className="text-[#868686] text-[14px] font-xregular" key={item.id}>{item.title}</div>
              ))}
            </div>
            <img onClick={closeHamber} src="/iconLanding/Close.svg" alt="img" className="mt-8" />
          </div>
        </div>
      </div>
    </nav>
  );
}
